import { useEffect, useState, ReactNode } from "react";
import RoundFillButton from "../../atoms/button/RoundFillButton";
import PretendardText from "../../atoms/text/PretendardText";

interface ModalProps {
  title?: string;
  content?: ReactNode;
  setModalOpen: (isOpen: boolean) => void;
  onClick: () => void;
  negative?: boolean;
  cancelHide?: boolean;
  noBackground?: boolean;
}

// 용도: 모달
// #tag: #모달 #팝업 #확인모달 #취소모달

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  setModalOpen,
  onClick,
  negative,
  cancelHide,
  noBackground,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 99%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setModalOpen(false), 100);
  };

  return (
    <div
      onClick={closeModal}
      className={`
        fixed top-0 right-0 w-full h-screen
        flex items-center justify-center z-50
        transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${noBackground ? "bg-transparent" : "bg-black/30"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-[394px] min-h-[173px] p-10
          flex flex-col items-center gap-6
          rounded-[15px]
          bg-white shadow-[0px_4px_20px_0px_rgba(10,13,20,0.15)]
          transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-95"
          }`}
      >
        <div className="flex flex-col items-center">
          <PretendardText className="text-[22px] font-bold text-gray-700 text-center">
            {title}
          </PretendardText>
          {content && (
            <PretendardText className="text-[16px] font-medium whitespace-pre-line text-gray-500 text-center mt-2 ">
              {content}
            </PretendardText>
          )}
        </div>
        <div className="w-full flex-center gap-4">
          {!cancelHide && (
            <RoundFillButton
              className={`
                w-[76px] h-[35px] 
                flex-center
                text-gray-1100 font-semibold text-[15px]
                rounded-full bg-gray-200 hover:bg-gray-300`}
              title="취소"
              onClick={closeModal}
            />
          )}
          <RoundFillButton
            className={`
              w-[76px] h-[35px]
              flex-center
              text-white font-semibold text-[15px]
              rounded-full
              ${
                negative
                  ? "bg-negative hover:bg-negative hover:bg-opacity-90"
                  : "bg-positive hover:bg-positive hover:bg-opacity-90"
              }`}
            title="확인"
            onClick={() => {
              onClick();
              closeModal();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
