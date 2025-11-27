import { toast } from "react-toastify";
import { queryClient } from "@/shared/lib/queryClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import FaqApi from "@/api/faq/faq.api"; // Commented out, not needed for mock
import type { FaqData } from "@/api/faq/faq.types";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { route } from "@/routes/route";
import { FAQ_KEYS } from "@/shared/constants/queryKeys/faqKeys";

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useFaqDetail = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 폼 상태 관리
  const [formData, setFormData] = useState<FaqData>({
    id: numericId,
    createdAt: "",
    updatedAt: "",
    title: "",
    content: "",
    adminEmail: "",
  });

  // --- Mock States ---
  const [isLoading, setIsLoading] = useState(true); // Replaces useQuery's isLoading
  const [isPending, setIsPending] = useState(false); // Replaces useMutation's isPending
  // -------------------

  // --- Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: [...FAQ_KEYS.detail(numericId), formData],
  //   queryFn: () => FaqApi.getFaqDetail(numericId),
  //   enabled: !isNaN(numericId),
  // });
  // -----------------------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: deleteFaqMutation, isPending } = useMutation({
  //   mutationFn: () => FaqApi.deleteFaq({ ids: [numericId] }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: FAQ_KEYS.list() });
  //     toast.success("FAQ가 삭제되었습니다");
  //     navigate(-1);
  //   },
  //   onError: () => {
  //     toast.error("삭제 중 오류가 발생했습니다");
  //   },
  // });
  // -------------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof FaqData>(field: K, value: FaqData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 유효성 검증
  const isValid = {
    delete: formData.id > 0,
  };

  // --- New Mock Delete Handler ---
  const handleDelete = async () => {
    if (!isValid.delete) {
      toast.error("삭제할 수 없는 상태입니다");
      return;
    }

    setIsPending(true); // Start "mutation"

    try {
      await sleep(1000); // Simulate 1-second delay
      // To test error state, uncomment this line:
      // throw new Error("Mock delete failed!");

      // --- Mock onSuccess logic ---
      console.log("Mock deleting FAQ with ID:", numericId);
      queryClient.invalidateQueries({ queryKey: FAQ_KEYS.list() });
      toast.success("FAQ가 삭제되었습니다");
      navigate(-1);
      // ----------------------------
    } catch (error) {
      // --- Mock onError logic ---
      toast.error("삭제 중 오류가 발생했습니다" + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
      // ----------------------------
    }
  };
  // -----------------------------

  // --- Original useEffect (Commented Out) ---
  // useEffect(() => {
  //   setLoading(isLoading || isPending);
  //   if (data?.data) {
  //     setFormData(data.data.content);
  //   }
  // }, [data, isLoading, isPending]);
  // ------------------------------------------

  // --- New Mock useEffects ---
  // 1. For data fetching (simulates useQuery)
  useEffect(() => {
    if (!isNaN(numericId)) {
      setIsLoading(true); // Start "query"
      const timer = setTimeout(() => {
        // Create mock data using the ID from the URL
        const mockFaqData: FaqData = {
          id: numericId,
          createdAt: "2023-09-15T10:00:00Z",
          updatedAt: "2023-09-16T14:30:00Z",
          title: `Mock FAQ Title (${numericId})`,
          content: `This is the mock content for the FAQ detail page. The ID (${numericId}) is dynamically set from the URL. This allows you to test navigation between different FAQ items.`,
          adminEmail: "admin@mock.com",
        };
        setFormData(mockFaqData);
        setIsLoading(false); // Stop "query"
      }, 800); // 800ms delay
      return () => clearTimeout(timer);
    }
  }, [numericId]); // Re-run "query" if ID changes

  // 2. For handling global loading state
  useEffect(() => {
    // This combines both "query" loading and "mutation" pending states
    setLoading(isLoading || isPending);
  }, [isLoading, isPending, setLoading]);
  // ---------------------------

  // --- New basicDetail assignment ---
  // const faqDetail = data?.data.content; // Original
  const faqDetail = isLoading ? undefined : formData;
  // ----------------------------------

  const goBack = () => navigate(-1);
  const goToUpdate = () => navigate(`${route.faqUpdate}/${numericId}`);

  return {
    // 상태
    formData,
    updateForm,

    // 데이터
    faqDetail,

    // 액션
    handleDelete, // Use this in your component

    // 유효성
    isValid,

    // 유틸리티
    goBack,
    goToUpdate,

    // Export mock loading states for the UI
    isLoading,
    isPending,
  };
};
export default useFaqDetail;
