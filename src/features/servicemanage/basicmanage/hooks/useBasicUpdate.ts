import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { route } from "@/routes/route";
import { queryClient } from "@/shared/lib/queryClient";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import type { PatchBasicRequest } from "@/api/basic/basic.types";
// import BasicApi from "@/api/basic/basic.api"; // Commented out, not needed for mock

// --- Mock Data ---
// This represents the data you would fetch to pre-fill the form
const mockFetchedData: PatchBasicRequest = {
  companyName: "Mock Company Inc.",
  ceo: "Jane Doe",
  businessNumber: "123-45-67890",
  mailOrderSaleNumber: "2023-Mock-01234",
  address: "123 Mock Street, Seoul, South Korea",
  tel: "02-1234-5678",
  email: "contact@mockcompany.com",
};
// ---------------

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useBasicUpdate = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [formData, setFormData] = useState<PatchBasicRequest>({
    companyName: "",
    ceo: "",
    businessNumber: "",
    mailOrderSaleNumber: "",
    address: "",
    tel: "",
    email: "",
  });

  // --- Mock state for useQuery ---
  const [isLoading, setIsLoading] = useState(true);
  // --------------------------------

  // --- 1. Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: ["basicDetail"],
  //   queryFn: () => BasicApi.getBasicDetail(),
  // });
  // --------------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof PatchBasicRequest>(
    field: K,
    value: PatchBasicRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 유효성 검증
  const isValid = formData.companyName.trim() !== "";

  // --- Mock state for useMutation ---
  const [isPending, setIsPending] = useState(false);
  // ----------------------------------

  // --- 2. Original TanStack Mutation (Commented Out) ---
  // const { mutate: updateBasic, isPending } = useMutation({
  //   mutationFn: (request: PatchBasicRequest) => BasicApi.patchBasic(request),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["basicDetail"] });
  //
  //     toast.success("수정이 완료되었습니다");
  //     navigate(routes.basicDetail, {
  //       state: { isItemUpdated: true },
  //     });
  //   },
  //   onError: () => {
  //     toast.error("수정 중 오류가 발생했습니다");
  //   },
  // });
  // -----------------------------------------------------

  // --- New Mock updateBasic function ---
  const handleUpdate = async () => {
    if (!isValid) {
      toast.error("필수 항목을 입력해주세요");
      return;
    }

    setIsPending(true); // Start "mutation"
    setLoading(true);

    try {
      // Simulate the API call
      await sleep(1000); // 1-second delay
      console.log("Mock updating with data:", formData);

      // To test error state, uncomment this line:
      // throw new Error("Mock update failed!");

      // --- Mock onSuccess logic ---
      queryClient.invalidateQueries({ queryKey: ["basicDetail"] });
      toast.success("수정이 완료되었습니다");
      navigate(route.basicDetail, {
        state: { isItemUpdated: true },
      });
      // ----------------------------
    } catch (error) {
      toast.error("수정 중 오류가 발생했습니다" + error);
      // --------------------------
    } finally {
      // --- Mock onSettled logic ---
      setIsPending(false); // Stop "mutation"
      setLoading(false);
      // ----------------------------
    }
  };
  // -----------------------------------

  // 3. 데이터 설정
  useEffect(() => {
    // --- Original useEffect logic (Commented Out) ---
    // setLoading(isLoading || isPending);
    // if (data?.data) {
    //   setFormData(data.data.content);
    // }
    // ------------------------------------------------

    // --- New Mock Data Logic for pre-filling form ---
    // This part simulates the useQuery loading data
    setIsLoading(true);
    setLoading(true);

    const timer = setTimeout(() => {
      setFormData(mockFetchedData); // Pre-fill the form
      setIsLoading(false);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
    // ----------------------------------------------
  }, [setLoading]); // Removed dependencies on data, isLoading, isPending

  // This second useEffect handles the global loading state for the "mutation"
  useEffect(() => {
    // Only set loading based on isPending (mutation) state
    // The initial load is handled in the first useEffect
    setLoading(isPending);
  }, [isPending, setLoading]);

  const goBack = () => navigate(-1);

  return {
    formData,
    updateForm,
    handleUpdate, // This is the new function that replaces updateBasic(formData)
    isValid,
    goBack,
    isLoading, // from mock useQuery state
    isPending, // from mock useMutation state
  };
};

export default useBasicUpdate;
