import { useEffect, useState } from "react";
import PretendardText from "../../atoms/text/PretendardText";
import XButton from "../../atoms/button/XButton";
import DetailPageForm from "../../atoms/layout/detailPage/DetailPageForm";
import DetailInfoTitle from "../../atoms/text/DetailInfoTitle";
import DetailInfoText from "../../atoms/text/DetailInfoText";

// 용도: 상세 모달
// #tag: #모달 #상세페이지 #디테일모달

interface DetailItem {
  id: string;
  title: string;
  content: string;
}

interface DetailModalProps {
  setModalOpen: (isOpen: boolean) => void;
  list: DetailItem[];
  isScroll?: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({
  setModalOpen,
  list,
  isScroll,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setModalOpen(false), 100);
  };

  useEffect(() => {
    if (!isScroll) {
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
    }
  }, [isScroll]);

  return (
    <div
      className={`
        fixed top-0 right-0 w-full h-screen
        flex items-center justify-center 
        bg-black bg-opacity-60 z-50
        transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        className={`
          w-fit min-w-[1064px] h-fit p-[50px]
          flex flex-col
          rounded-[10px]
          bg-white shadow-lg
          transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-95"
          }`}
      >
        {/* 제목 영역 */}
        <div className="flex items-center justify-between mb-[30px]">
          <PretendardText className="font-semibold text-[32px] text-black">
            제목입니다
          </PretendardText>
          <XButton onClick={closeModal} />
        </div>

        {/* 상세 정보 영역 */}
        <div className="flex flex-col gap-[20px]">
          {list &&
            list.map((item) => (
              <DetailPageForm key={item.id}>
                <DetailInfoTitle>{item.title}</DetailInfoTitle>
                <DetailInfoText>{item.content}</DetailInfoText>
              </DetailPageForm>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
