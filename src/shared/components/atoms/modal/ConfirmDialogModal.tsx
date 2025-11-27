import classNameMerge from "@/shared/classNameMerge";
import BasicButton from "../button/BasicButton";
import { BUTTON_CONFIRM_VARIANT } from "@/shared/styles/button";
import { useEffect } from "react";

interface ConfirmDialogModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  variant?: "delete" | "update";
}

const ConfirmDialogModal = ({
  title,
  description,
  className,
  isOpen,
  onClose,
  onConfirm,
  variant = "delete",
}: ConfirmDialogModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        (document.activeElement as HTMLElement)?.blur();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    (document.activeElement as HTMLElement)?.blur();
    onClose();
  };

  const handleConfirm = () => {
    (document.activeElement as HTMLElement)?.blur();
    onConfirm();
  };

  return (
    <div
      className={classNameMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60",
        className
      )}
      onClick={handleClose}
    >
      <div
        className="min-w-[394px] rounded-[15px] bg-white p-[57px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[10px]">
          <span className="font-pretendard text-[22px] font-bold text-[#262C31]">
            {title}
          </span>
          <span
            className={classNameMerge(
              "font-pretendard text-[16px] font-medium break-keep whitespace-pre-wrap text-[#808991]"
            )}
          >
            {description}
          </span>
        </div>
        <div className="mt-[25px] flex justify-center gap-[15px]">
          <BasicButton
            className={BUTTON_CONFIRM_VARIANT.cancel}
            onClick={handleClose}
          >
            취소
          </BasicButton>
          <BasicButton
            className={
              variant === "delete"
                ? BUTTON_CONFIRM_VARIANT.delete
                : BUTTON_CONFIRM_VARIANT.update
            }
            onClick={handleConfirm}
          >
            확인
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialogModal;
