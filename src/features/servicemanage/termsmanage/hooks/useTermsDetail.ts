import { toast } from "react-toastify";
import { queryClient } from "@/shared/lib/queryClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import TermsApi from "@/api/terms/terms.api"; // Commented out
import type { TermsData } from "@/api/terms/terms.types";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { route } from "@/routes/route";
import { TERMS_KEYS } from "@/shared/constants/queryKeys/termsKeys";

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useTermsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 폼 상태 관리
  const [formData, setFormData] = useState<TermsData>({
    id: numericId,
    createdAt: "",
    updatedAt: "",
    title: "",
    content: "",
    termsType: "BASIC",
  });

  // --- Mock States ---
  const [isLoading, setIsLoading] = useState(true); // Replaces useQuery's isLoading
  const [isPending, setIsPending] = useState(false); // Replaces useMutation's isPending
  // -------------------

  // --- Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: TERMS_KEYS.detail(numericId),
  //   queryFn: () => TermsApi.getTermsDetail(numericId),
  //   enabled: !isNaN(numericId),
  // });
  // -----------------------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: deleteTermsMutation, isPending } = useMutation({
  //   mutationFn: () => TermsApi.deleteTerms({ ids: [numericId] }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });
  //     toast.success("약관이 삭제되었습니다");
  //     navigate(-1);
  //   },
  //   onError: () => {
  //     toast.error("삭제 중 오류가 발생했습니다");
  //   },
  // });
  // -------------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof TermsData>(
    field: K,
    value: TermsData[K]
  ) => {
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
      console.log("Mock deleting terms with ID:", numericId);
      queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });
      toast.success("약관이 삭제되었습니다");
      navigate(-1);
      // ----------------------------
    } catch (error) {
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
        const mockTermsData: TermsData = {
          id: numericId,
          createdAt: "2023-01-01T10:00:00Z",
          updatedAt: "2023-05-15T14:30:00Z",
          title: `Mock Terms Title (${numericId}) - ${
            numericId % 3 === 0 ? "BASIC" : "PRIVACY"
          }`,
          content: `This is the mock content for the terms and conditions page. The ID (${numericId}) is dynamically set.`,
          termsType: numericId % 3 === 0 ? "BASIC" : "ADDITIONAL",
        };
        setFormData(mockTermsData);
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

  // --- New termsDetail assignment ---
  // const termsDetail = data?.data.content; // Original
  const termsDetail = isLoading ? undefined : formData;
  // ----------------------------------

  const goBack = () => navigate(-1);
  const goToUpdate = () => navigate(`${route.termsUpdate}/${numericId}`);

  return {
    // 상태
    formData,
    updateForm,

    // 데이터
    termsDetail,

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
export default useTermsDetail;
