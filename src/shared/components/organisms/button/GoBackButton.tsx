import { useNavigate } from "react-router-dom";
import PretendardText from "../../atoms/text/PretendardText";

interface GoBackButtonProps {
  onClick?: () => void;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => (onClick ? onClick() : navigate(-1))}
    >
      <img
        src="/assets/admin/icons/ic_arrow_gray_left.png"
        alt="뒤로가기"
        className="w-[28px] h-[28px]"
      />
      <PretendardText className="text-gray-1200 text-[16px] font-bold">
        뒤로가기
      </PretendardText>
    </div>
  );
};

export default GoBackButton;
