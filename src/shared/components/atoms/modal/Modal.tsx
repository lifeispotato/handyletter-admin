import classNameMerge from "@/shared/classNameMerge";
import IconImg from "../IconImg";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ children, className, isOpen, onClose, title }: ModalProps) => {
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

  return (
    <div
      className={classNameMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60",
        className
      )}
      onClick={handleClose}
    >
      <div
        className="min-w-[600px] rounded-[8px] bg-white p-[50px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[20px] flex items-center justify-between">
          <h2 className="font-pretendard text-system-700 text-[32px] leading-[138%] font-semibold tracking-[-1%]">
            {title}
          </h2>
          <button onClick={handleClose}>
            <IconImg
              src="ic_x"
              alt="닫기"
              className="h-[30px] w-[30px] hover:cursor-pointer hover:opacity-80"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
