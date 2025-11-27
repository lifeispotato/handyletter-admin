import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// import FaqApi from "@/api/faq/faq.api"; // Commented out
import type { GetFaqListQueryParams, FaqData } from "@/api/faq/faq.types"; // Need FaqData
import { route } from "@/routes/route";
import { useLoadingStore } from "@/shared/store/useLoadingStore";

// --- Mock Data Generation ---

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a master list of mock FAQs
const MASTER_FAQ_LIST: FaqData[] = Array.from({ length: 57 }, (_, i) => ({
  id: i + 1,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
  updatedAt: new Date().toISOString(),
  title: `This is mock FAQ title ${i + 1} (${
    i % 3 === 0 ? "General" : i % 3 === 1 ? "Account" : "Payment"
  } Issue)`,
  content: `Mock content for FAQ ${i + 1}.`,
  adminEmail: `admin${i % 5}@mock.com`,
}));

// Function to simulate the backend's filtering and pagination
const createMockFaqListResponse = (params: GetFaqListQueryParams) => {
  const { keyword = "", page = 1, size = 10 } = params;
  console.log("Mock fetching with params:", params);

  // 1. Filter by keyword
  const filteredList = MASTER_FAQ_LIST.filter((faq) =>
    faq.title.toLowerCase().includes(keyword.toLowerCase())
  );

  // 2. Paginate
  const totalCount = filteredList.length;
  const paginatedContent = filteredList.slice((page - 1) * size, page * size);

  // 3. Return API-like response
  return {
    data: {
      content: paginatedContent,
      totalCount: totalCount,
    },
  };
};
// ----------------------------

const useFaqList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 폼 상태 관리
  const [formData, setFormData] = useState<GetFaqListQueryParams>({
    keyword: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    size: 10,
    sort: "id",
    orderBy: "ASC",
  });

  // 선택 상태 관리
  const [searchValue, setSearchValue] = useState(formData.keyword);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // --- Mock States ---
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [mockData, setMockData] = useState({
    data: { content: [] as FaqData[], totalCount: 0 },
  });
  // -------------------

  // --- Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: [...FAQ_KEYS.list(), formData],
  //   queryFn: () => FaqApi.getFaqList(formData),
  // });
  // -----------------------------------------------

  // --- Mock Data Fetching (Replaces useQuery) ---
  useEffect(() => {
    setIsLoading(true);
    // Don't set global loading here, let the main useEffect handle it

    const timer = setTimeout(() => {
      const generatedData = createMockFaqListResponse(formData);
      setMockData(generatedData);
      setIsLoading(false);
    }, 600); // 600ms delay

    return () => clearTimeout(timer);
  }, [formData]); // Re-fetch whenever formData changes
  // ----------------------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: deleteFaqsMutation, isPending } = useMutation({
  //   mutationFn: (ids: number[]) => FaqApi.deleteFaq({ ids }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: FAQ_KEYS.list() });
  //     toast.success("삭제되었습니다");
  //     setSelectedIds([]);
  //   },
  //   onError: () => {
  //     toast.error("삭제에 실패했습니다");
  //   },
  // });
  // -------------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof GetFaqListQueryParams>(
    field: K,
    value: GetFaqListQueryParams[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 선택 핸들러
  const handleSelectAll = (checked: boolean) => {
    // Use mockData instead of data
    if (checked && mockData?.data.content) {
      setSelectedIds(mockData.data.content.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedSearch = searchValue?.trim();

    // URL 파라미터 업데이트
    // The useEffect watching searchParams will handle updating formData
    const newParams = new URLSearchParams(searchParams);
    if (trimmedSearch) {
      newParams.set("search", trimmedSearch);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // --- New Mock Delete Handler (Replaces useMutation) ---
  const deleteFaqs = async () => {
    if (!isValid.selection) {
      toast.error("선택된 항목이 없습니다");
      return;
    }

    setIsPending(true); // Start "mutation"

    try {
      await sleep(1000); // 1-second delay
      console.log("Mock deleting FAQs with IDs:", selectedIds);
      // To test error state, uncomment this line:
      // throw new Error("Mock delete failed!");

      // --- Mock onSuccess logic ---
      toast.success("삭제되었습니다");
      setSelectedIds([]);

      // Simulate query invalidation by triggering a refetch
      // This forces the mock "useQuery" useEffect to run again
      setFormData((prev) => ({ ...prev, page: 1 }));
      // ----------------------------
    } catch (error) {
      // --- Mock onError logic ---
      toast.error("삭제에 실패했습니다" + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
      // ----------------------------
    }
  };
  // ----------------------------------------------------

  // 유효성 검증
  const isValid = {
    selection: selectedIds.length > 0,
    search: formData.keyword?.trim().length ?? false,
  };

  // This useEffect now uses the mock loading states
  useEffect(() => {
    setLoading(isLoading || isPending);
  }, [isLoading, isPending, setLoading]);

  // This useEffect (syncing URL to state) is crucial and remains unchanged
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      keyword: searchParams.get("search") || "",
      page: Number(searchParams.get("page")) || 1,
    }));
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  // Use mockData instead of data
  const faqList = mockData?.data.content || [];
  const totalCount = mockData?.data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / (formData.size || 10));

  const goToCreate = () => navigate(route.faqCreate);
  const goToDetail = (id: number) => navigate(`${route.faqDetail}/${id}`);

  return {
    // 상태
    formData,
    updateForm,
    selectedIds,
    searchValue,
    setSearchValue,

    // 데이터
    faqList,
    totalCount,

    // 선택 관리
    handleSelectAll,
    handleSelectItem,
    handleSearch,

    // 액션
    deleteFaqs, // Use this handler in your component

    // 유효성
    isValid,

    // 유틸리티
    totalPages,
    goToCreate,
    goToDetail,

    // Export mock loading states
    isLoading,
    isPending,
  };
};

export default useFaqList;
