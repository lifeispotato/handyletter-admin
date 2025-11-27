import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type {
  GetDormListQueryParams,
  DormData,
} from "@/api/dorm/dorm.types";
import { route } from "@/routes/route";
import { useLoadingStore } from "@/shared/store/useLoadingStore";

// --- Mock Data Generation ---

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MASTER_DORM_LIST: DormData[] = Array.from(
  { length: 57 },
  (_, i) => ({
    id: i + 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
    updatedAt: new Date().toISOString(),
    name: `숙소명 ${i + 1}`,
    address: `서울시 강남구 테헤란로 ${i + 1}번지`,
    phoneNumber: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    status: i % 3 === 0 ? "ACTIVE" : i % 3 === 1 ? "INACTIVE" : "PENDING",
    roomCount: Math.floor(Math.random() * 50) + 10,
    price: Math.floor(Math.random() * 500000) + 100000,
  })
);

const createMockDormListResponse = (
  params: GetDormListQueryParams
) => {
  const {
    keyword = "",
    page = 1,
    size = 10,
  } = params;

  let filteredList = MASTER_DORM_LIST;

  if (keyword) {
    filteredList = filteredList.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.address.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const totalCount = filteredList.length;
  const paginatedContent = filteredList.slice((page - 1) * size, page * size);

  return {
    data: {
      content: paginatedContent,
      totalCount: totalCount,
    },
  };
};

const useDormList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [formData, setFormData] = useState<GetDormListQueryParams>({
    keyword: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    size: 10,
    sort: "id",
    orderBy: "DESC",
  });

  const [searchValue, setSearchValue] = useState(formData.keyword);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [mockData, setMockData] = useState({
    data: { content: [] as DormData[], totalCount: 0 },
  });

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const generatedData = createMockDormListResponse(formData);
      setMockData(generatedData);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [formData]);

  const updateForm = <K extends keyof GetDormListQueryParams>(
    field: K,
    value: GetDormListQueryParams[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (checked: boolean) => {
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

    const newParams = new URLSearchParams(searchParams);
    if (trimmedSearch) {
      newParams.set("search", trimmedSearch);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const deleteDorms = async () => {
    if (selectedIds.length === 0) {
      toast.error("선택된 항목이 없습니다");
      return;
    }

    setIsPending(true);

    try {
      await sleep(1000);
      toast.success("삭제되었습니다");
      setSelectedIds([]);
      setFormData((prev) => ({ ...prev, page: 1 }));
    } catch (error) {
      toast.error("삭제에 실패했습니다");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    setLoading(isLoading || isPending);
  }, [isLoading, isPending, setLoading]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      keyword: searchParams.get("search") || "",
      page: Number(searchParams.get("page")) || 1,
    }));
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const dormList = mockData?.data.content || [];
  const totalCount = mockData?.data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / (formData.size || 10));

  const goToCreate = () => navigate(route.dormCreate);
  const goToDetail = (id: number) =>
    navigate(`${route.dormDetail}/${id}`);

  return {
    formData,
    updateForm,
    selectedIds,
    searchValue,
    setSearchValue,
    dormList,
    totalCount,
    handleSelectAll,
    handleSelectItem,
    handleSearch,
    deleteDorms,
    totalPages,
    goToCreate,
    goToDetail,
    isLoading,
    isPending,
  };
};

export default useDormList;

