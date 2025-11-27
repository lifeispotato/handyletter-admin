import { queryClient } from "@/shared/lib/queryClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import type { PostFaqRequest } from "@/api/faq/faq.types";
// import FaqApi from "@/api/faq/faq.api"; // Commented out, not needed for mock
import { FAQ_KEYS } from "@/shared/constants/queryKeys/faqKeys";

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useFaqCreate = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [formData, setFormData] = useState<PostFaqRequest>({
    title: "",
    content: "",
  });

  // --- Mock state for useMutation ---
  const [isPending, setIsPending] = useState(false);
  // ----------------------------------

  // --- Original TanStack Mutation (Commented Out) ---
  // const { mutate: createFaq, isPending } = useMutation({
  //   mutationFn: (request: PostFaqRequest) => FaqApi.postFaq(request),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: FAQ_KEYS.list() });
  //     toast.success("FAQ 생성이 완료되었습니다.");
  //     navigate(-1);
  //   },
  //   onError: () => {
  //     toast.error("FAQ 생성에 실패했습니다.");
  //   },
  // });
  // -----------------------------------------------------

  const updateForm = (field: keyof PostFaqRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  // --- New Mock createFaq function ---
  const handleCreate = async () => {
    if (!isValid) {
      toast.error("필수 항목을 입력해주세요");
      return;
    }

    setIsPending(true); // Start "mutation"
    setLoading(true);

    try {
      // Simulate the API call
      await sleep(1000); // 1-second delay
      console.log("Mock creating FAQ with data:", formData);

      // To test error state, uncomment this line:
      // throw new Error("Mock creation failed!");

      // --- Mock onSuccess logic ---
      queryClient.invalidateQueries({ queryKey: FAQ_KEYS.list() });
      toast.success("FAQ 생성이 완료되었습니다.");
      navigate(-1);
      // ----------------------------
    } catch (error) {
      // --- Mock onError logic ---
      toast.error("FAQ 생성에 실패했습니다." + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
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
    isPending, // Return mock pending state
  };
};

export default useFaqCreate;
