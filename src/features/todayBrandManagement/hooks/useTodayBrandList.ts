import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type {
  GetTodayBrandListQueryParams,
  TodayBrandData,
} from "@/api/newsletter/todayBrand.types";
import { route } from "@/routes/route";
import { useLoadingStore } from "@/shared/store/useLoadingStore";

// --- Mock Data Generation ---

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MASTER_TODAY_BRAND_LIST: TodayBrandData[] = Array.from(
  { length: 57 },
  (_, i) => ({
    id: i + 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
    updatedAt: new Date().toISOString(),
    title: `콘텐츠 제목 콘텐츠 제목 콘텐츠 제목 ${i + 1}`,
    content: `Mock content for Today Brand ${i + 1}.`,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toISOString(),
    editorName: `에디터${String.fromCharCode(65 + (i % 26))}`,
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 50),
    isHidden: i % 3 === 0,
    newsletterType:
      i % 3 === 0 ? "TODAY_BRAND" : i % 3 === 1 ? "SHORT_FORM" : "STORY",
  })
);

const createMockTodayBrandListResponse = (
  params: GetTodayBrandListQueryParams
) => {
  const {
    keyword = "",
    page = 1,
    size = 10,
    newsletterType = "TODAY_BRAND",
  } = params;

  let filteredList = MASTER_TODAY_BRAND_LIST.filter(
    (item) => item.newsletterType === newsletterType
  );

  if (keyword) {
    filteredList = filteredList.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
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

const useTodayBrandList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const newsletterType =
    (searchParams.get("type") as "TODAY_BRAND" | "SHORT_FORM" | "STORY") ||
    "TODAY_BRAND";

  const [formData, setFormData] = useState<GetTodayBrandListQueryParams>({
    keyword: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    size: 10,
    sort: "id",
    orderBy: "DESC",
    newsletterType,
  });

  const [searchValue, setSearchValue] = useState(formData.keyword);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [mockData, setMockData] = useState({
    data: { content: [] as TodayBrandData[], totalCount: 0 },
  });

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const generatedData = createMockTodayBrandListResponse(formData);
      setMockData(generatedData);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [formData]);

  const updateForm = <K extends keyof GetTodayBrandListQueryParams>(
    field: K,
    value: GetTodayBrandListQueryParams[K]
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

  const deleteTodayBrands = async () => {
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

  const toggleHidden = async (id: number, isHidden: boolean) => {
    setIsPending(true);

    try {
      await sleep(500);
      // TODO: 실제 API 호출 시 id 사용
      console.log("Toggle hidden for id:", id, "isHidden:", isHidden);
      toast.success(isHidden ? "숨김 처리되었습니다" : "숨김 해제되었습니다");
      setFormData((prev) => ({ ...prev }));
    } catch (error) {
      toast.error("처리에 실패했습니다");
    } finally {
      setIsPending(false);
    }
  };

  const handleNewsletterTypeChange = (
    type: "TODAY_BRAND" | "SHORT_FORM" | "STORY"
  ) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  useEffect(() => {
    setLoading(isLoading || isPending);
  }, [isLoading, isPending, setLoading]);

  useEffect(() => {
    const type =
      (searchParams.get("type") as "TODAY_BRAND" | "SHORT_FORM" | "STORY") ||
      "TODAY_BRAND";

    setFormData((prev) => ({
      ...prev,
      keyword: searchParams.get("search") || "",
      page: Number(searchParams.get("page")) || 1,
      newsletterType: type,
    }));
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const todayBrandList = mockData?.data.content || [];
  const totalCount = mockData?.data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / (formData.size || 10));

  const goToCreate = () => {
    if (newsletterType === "SHORT_FORM") {
      navigate(route.shortFormCreate);
    } else if (newsletterType === "STORY") {
      navigate(route.storyCreate);
    } else {
      navigate(route.todayBrandCreate);
    }
  };
  
  const goToDetail = (id: number, type: "TODAY_BRAND" | "SHORT_FORM" | "STORY") => {
    if (type === "SHORT_FORM") {
      navigate(`${route.shortFormDetail}/${id}`);
    } else if (type === "STORY") {
      navigate(`${route.storyDetail}/${id}`);
    } else {
      navigate(`${route.todayBrandDetail}/${id}`);
    }
  };

  return {
    formData,
    updateForm,
    selectedIds,
    searchValue,
    setSearchValue,
    todayBrandList,
    totalCount,
    handleSelectAll,
    handleSelectItem,
    handleSearch,
    deleteTodayBrands,
    toggleHidden,
    totalPages,
    goToCreate,
    goToDetail,
    isLoading,
    isPending,
    newsletterType,
    handleNewsletterTypeChange,
  };
};

export default useTodayBrandList;
