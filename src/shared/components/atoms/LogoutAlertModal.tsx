import PretendardText from "./text/PretendardText";
import RoundFillButton from "./button/RoundFillButton";
import { handleLogout } from "../../utils/logout";

const LogoutAlertModal = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen z-50 flex-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-[394px] min-h-[173px] p-10
          flex flex-col items-center gap-6
          rounded-[15px]
          bg-white shadow-[0px_4px_20px_0px_rgba(10,13,20,0.15)]`}
      >
        <div className="flex flex-col items-center">
          <PretendardText className="text-[22px] font-bold text-gray-700 text-center">
            접근 권한이 없습니다.
          </PretendardText>
          <PretendardText className="text-[16px] font-medium whitespace-nowrap text-gray-500 text-center mt-2 ">
            다시 로그인해주세요.
          </PretendardText>
        </div>
        <div className="w-full flex-center gap-4">
          <RoundFillButton
            className={`
              w-[76px] h-[35px]
              flex-center
              text-white font-semibold text-[15px]
              rounded-full
              bg-positive hover:bg-positive hover:bg-opacity-90`}
            title="확인"
            onClick={() => {
              handleLogout();
              // onClick();
              // closeModal();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutAlertModal;
