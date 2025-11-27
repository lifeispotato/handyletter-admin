import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// import TermsApi from "@/api/terms/terms.api"; // Commented out
import type {
  GetTermsListQueryParams,
  TermsData,
} from "@/api/terms/terms.types"; // Need TermsData
import { queryClient } from "@/shared/lib/queryClient";
import { route } from "@/routes/route";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { TERMS_KEYS } from "@/shared/constants/queryKeys/termsKeys";

// --- Mock Data Generation ---

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Create a master list of mock Terms
const MASTER_TERMS_LIST: TermsData[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i + 5)).toISOString(),
  updatedAt: new Date().toISOString(),
  title: `[${i % 2 === 0 ? "BASIC" : "ADDITIONAL"}] Mock Terms Title ${i + 1}`,
  content: `Mock content for terms ${i + 1}.`,
  termsType: i % 2 === 0 ? "BASIC" : "ADDITIONAL",
}));

// Function to simulate the backend's filtering and pagination
const createMockTermsListResponse = (params: GetTermsListQueryParams) => {
  const { keyword = "", page = 1, size = 10 } = params;
  console.log("Mock fetching terms with params:", params);

  // 1. Filter by keyword
  const filteredList = MASTER_TERMS_LIST.filter((terms) =>
    terms.title.toLowerCase().includes(keyword.toLowerCase())
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

const useTermsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 폼 상태 관리
  const [formData, setFormData] = useState<GetTermsListQueryParams>({
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
    data: { content: [] as TermsData[], totalCount: 0 },
  });
  // -------------------

  // --- Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: TERMS_KEYS.list(),
  //   queryFn: () => TermsApi.getTermsList(formData),
  // });
  // -----------------------------------------------

  // --- Mock Data Fetching (Replaces useQuery) ---
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const generatedData = createMockTermsListResponse(formData);
      setMockData(generatedData);
      setIsLoading(false);
    }, 600); // 600ms delay

    return () => clearTimeout(timer);
  }, [formData]); // Re-fetch whenever formData changes
  // ----------------------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: deleteTermsMutation, isPending } = useMutation({
  //   mutationFn: (ids: number[]) => TermsApi.deleteTerms({ ids }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });
  //     toast.success("삭제되었습니다");
  //     setSelectedIds([]);
  //   },
  //   onError: () => {
  //     toast.error("삭제에 실패했습니다");
  //   },
  // });
  // -------------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof GetTermsListQueryParams>(
    field: K,
    value: GetTermsListQueryParams[K]
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

  // 유효성 검증
  const isValid = {
    selection: selectedIds.length > 0,
    search: formData.keyword?.trim().length ?? false,
  };

  // --- New Mock Delete Handler (Replaces useMutation) ---
  const deleteTerms = async () => {
    if (!isValid.selection) {
      toast.error("선택된 항목이 없습니다");
      return;
    }

    setIsPending(true); // Start "mutation"

    try {
      await sleep(1000); // 1-second delay
      console.log("Mock deleting terms with IDs:", selectedIds);
      // To test error state, uncomment this line:
      // throw new Error("Mock delete failed!");

      // --- Mock onSuccess logic ---
      toast.success("삭제되었습니다");
      setSelectedIds([]);
      queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });

      // Simulate query invalidation by triggering a refetch to page 1
      setFormData((prev) => ({ ...prev, page: 1 }));
      // ----------------------------
    } catch {
      // --- Mock onError logic ---
      toast.error("삭제에 실패했습니다");
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
      // ----------------------------
    }
  };
  // ----------------------------------------------------

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
    setSearchValue(searchParams.get("search") || ""); // Also sync search input
  }, [searchParams]);

  // Use mockData instead of data
  const termsList = mockData?.data.content || [];
  const totalCount = mockData?.data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / (formData.size || 10));

  const goToCreate = () => navigate(route.termsCreate);
  const goToDetail = (id: number) => navigate(`${route.termsDetail}/${id}`);

  return {
    // 상태
    formData,
    updateForm,
    selectedIds,
    searchValue,
    setSearchValue,

    // 데이터
    termsList,
    totalCount,

    // 선택 관리
    handleSelectAll,
    handleSelectItem,
    handleSearch,

    // 액션
    deleteTerms, // Use this handler in your component

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

export default useTermsList;
