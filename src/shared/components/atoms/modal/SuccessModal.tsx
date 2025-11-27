import BasicButton from "../button/BasicButton";
import { BUTTON_CONFIRM_VARIANT } from "@/shared/styles/button"; // Assuming styles exist

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  variant?: "delete" | "update";
}

const SuccessModal = ({
  isOpen,
  onClose,
  title,
  variant = "delete",
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60"
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="min-w-[394px] rounded-[15px] bg-white p-[57px] text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <span className="font-pretendard text-[22px] font-bold text-[#262C31]">
          {title}
        </span>
        <div className="mt-[25px] flex justify-center">
          <BasicButton
            className={
              variant === "delete"
                ? BUTTON_CONFIRM_VARIANT.delete
                : BUTTON_CONFIRM_VARIANT.update
            } // Use the red style as per Figma
            onClick={onClose} // Just close the modal
          >
            확인
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
