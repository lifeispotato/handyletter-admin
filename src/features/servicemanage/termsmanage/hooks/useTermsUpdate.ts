import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { queryClient } from "@/shared/lib/queryClient";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import type { PatchTermsRequest } from "@/api/terms/terms.types";
// import TermsApi from "@/api/terms/terms.api"; // Commented out
import { TERMS_KEYS } from "@/shared/constants/queryKeys/termsKeys";

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useTermsUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [formData, setFormData] = useState<PatchTermsRequest>({
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

  // 필드 업데이트
  const updateForm = <K extends keyof PatchTermsRequest>(
    field: K,
    value: PatchTermsRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 유효성 검증
  const isValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: updateTerms, isPending } = useMutation({
  //   mutationFn: (request: PatchTermsRequest) =>
  //     TermsApi.patchTerms(numericId, request),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: TERMS_KEYS.detail(numericId) });
  //
  //     toast.success("수정이 완료되었습니다");
  //     navigate(-1);
  //   },
  //   onError: () => {
  //     toast.error("수정 중 오류가 발생했습니다");
  //   },
  // });
  // -------------------------------------------------

  // --- New Mock Update Handler (Replaces useMutation) ---
  const handleUpdate = async () => {
    if (!isValid) {
      toast.error("필수 항목을 입력해주세요");
      return;
    }

    setIsPending(true); // Start "mutation"

    try {
      await sleep(1000); // 1-second delay
      console.log(`Mock updating Terms (${numericId}) with:`, formData);
      // To test error state, uncomment this line:
      // throw new Error("Mock update failed!");

      // --- Mock onSuccess logic ---
      queryClient.invalidateQueries({ queryKey: TERMS_KEYS.detail(numericId) });
      toast.success("수정이 완료되었습니다");
      navigate(-1);
      // ----------------------------
    } catch (error) {
      // --- Mock onError logic ---
      toast.error("수정 중 오류가 발생했습니다" + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
      // ----------------------------
    }
  };
  // ----------------------------------------------------

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
        // Create mock data to pre-fill the form
        const mockTermsData: PatchTermsRequest = {
          title: `Mock Terms Title (${numericId})`,
          content: `This is the mock content for the terms update form. ID (${numericId}).`,
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

  const goBack = () => navigate(-1);

  return {
    formData,
    updateForm,
    handleUpdate, // Use this in your component's submit handler
    isValid,
    goBack,
    // Export mock loading states for the UI
    isLoading,
    isPending,
  };
};

export default useTermsUpdate;
