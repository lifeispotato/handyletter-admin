import type { PostTermsRequest } from "@/api/terms/terms.types";
import { queryClient } from "@/shared/lib/queryClient";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import TermsApi from "@/api/terms/terms.api"; // Commented out
import { TERMS_KEYS } from "@/shared/constants/queryKeys/termsKeys";

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useTermsCreate = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [formData, setFormData] = useState<PostTermsRequest>({
    title: "",
    content: "",
    termsType: "BASIC",
  });

  // --- Mock state for useMutation ---
  // ----------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: createTerms, isPending } = useMutation({
  //   mutationFn: (request: PostTermsRequest) => TermsApi.postTerms(request),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });
  //     toast.success("약관 생성이 완료되었습니다.");
  //     navigate(-1);
  //   },
  //   onError: () => {
  //     toast.error("약관 생성에 실패했습니다.");
  //   },
  // });
  // -----------------------------------------------------

  const updateForm = (field: keyof PostTermsRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  // --- New Mock createTerms function ---
  const handleCreate = async () => {
    if (!isValid) {
      toast.error("필수 항목을 입력해주세요");
      return;
    }

    setLoading(true);

    try {
      // Simulate the API call
      await sleep(1000); // 1-second delay
      console.log("Mock creating terms with data:", formData);

      // To test error state, uncomment this line:
      // throw new Error("Mock creation failed!");

      // --- Mock onSuccess logic ---
      queryClient.invalidateQueries({ queryKey: TERMS_KEYS.list() });
      toast.success("약관 생성이 완료되었습니다.");
      navigate(-1);
      // ----------------------------
    } catch (error) {
      // --- Mock onError logic ---
      toast.error("약관 생성에 실패했습니다." + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setLoading(false);
      // ----------------------------
    }
  };
  // -----------------------------------

  // --- Original useEffect (Commented Out) ---
  // useEffect(() => {
  //   setLoading(isPending);
  // }, [isPending]);
  // ------------------------------------------
  // This useEffect is no longer necessary as setLoading is
  // handled directly in the mock handleCreate function.

  const goBack = () => navigate(-1);

  return {
    formData,
    updateForm,
    handleCreate, // Use this function in your form's submit handler
    isValid,
    goBack,
    // You can also return isPending if your component needs it
    // isPending,
  };
};

export default useTermsCreate;
