import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import BasicApi from "@/api/basic/basic.api"; // Commented out, not needed for mock
import type { BasicData } from "@/api/basic/basic.types";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { route } from "@/routes/route";

// --- Mock Data ---
const mockBasicData: BasicData = {
  id: 1,
  createdAt: "2023-10-01T10:00:00Z",
  updatedAt: "2023-10-28T14:30:00Z",
  companyName: "Mock Company Inc.",
  ceo: "Jane Doe",
  businessNumber: "123-45-67890",
  mailOrderSaleNumber: "2023-Mock-01234",
  address: "123 Mock Street, Seoul, South Korea",
  tel: "02-1234-5678",
  email: "contact@mockcompany.com",
};
// -----------------

const useBasicDetail = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 폼 상태 관리 (Initialize with default structure)
  const [formData, setFormData] = useState<BasicData>({
    id: 0,
    createdAt: "",
    updatedAt: "",
    companyName: "",
    ceo: "",
    businessNumber: "",
    mailOrderSaleNumber: "",
    address: "",
    tel: "",
    email: "",
  });

  // --- Mock loading state (replaces useQuery's isLoading) ---
  const [isLoading, setIsLoading] = useState(true);
  // -----------------------------------------------------------

  // --- Original TanStack Query (Commented Out) ---
  // const { data, isLoading } = useQuery({
  //   queryKey: ["basicDetail"],
  //   queryFn: () => BasicApi.getBasicDetail(),
  // });
  // -----------------------------------------------

  // 필드 업데이트
  const updateForm = <K extends keyof BasicData>(
    field: K,
    value: BasicData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 유효성 검증
  const isValid = {
    update: formData.id > 0,
  };

  useEffect(() => {
    // --- Original useEffect logic (Commented Out) ---
    // setLoading(isLoading);
    // if (data?.data) {
    //   setFormData(data.data.content);
    // }
    // ------------------------------------------------

    // --- New Mock Data Logic ---
    setLoading(true); // Start global loading
    setIsLoading(true); // Start local loading

    // Simulate network delay
    const timer = setTimeout(() => {
      setFormData(mockBasicData); // Set form data to our mock data
      setLoading(false); // Stop global loading
      setIsLoading(false); // Stop local loading
    }, 800); // 800ms delay

    return () => clearTimeout(timer); // Cleanup on unmount
    // ---------------------------
  }, [setLoading]); // Removed data and isLoading dependencies, added setLoading

  // --- Original basicDetail assignment (Commented Out) ---
  // const basicDetail = data?.data.content;
  // -------------------------------------------------------

  // --- New basicDetail assignment ---
  // Use formData as the source of truth once loading is complete
  const basicDetail = isLoading ? undefined : formData;
  // ----------------------------------

  const goBack = () => navigate(-1);
  const goToUpdate = () => navigate(`${route.basicUpdate}`);

  return {
    // 상태
    formData,
    updateForm,

    // 데이터
    basicDetail,

    // 유효성
    isValid,

    // 유틸리티
    goBack,
    goToUpdate,

    // --- Also return isLoading so your component can react ---
    isLoading,
    // --------------------------------------------------------
  };
};
export default useBasicDetail;
