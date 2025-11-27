import { useRecoilState } from "recoil";
import { loginInfoState, LoginInfo } from "../../store/loginInfoState";
import RoundOutlineButton from "../atoms/button/RoundOutlineButton";
import PretendardText from "../atoms/text/PretendardText";

const Header: React.FC = () => {
  const [loginInfo] = useRecoilState<LoginInfo>(loginInfoState);

  return (
    <div
      className={`
        w-full
        flex justify-center
        border-b border-gray-200 bg-white
        gap-[30px]
        px-[17.3%]
        `}
    >
      <div
        className={`
          w-full max-w-[1044px] h-[75px]
          flex items-center justify-end
        `}
      >
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[10px]">
            <img
              src="/assets/admin/icons/ic_profile_light.png"
              className="w-[38px] h-[38px]"
              alt="프로필 아이콘"
            />
            <PretendardText
              className={`
              text-[14px] font-semibold text-gray-1400
              leading-[32.5px] tracking-[-0.054px]
              `}
            >
              {loginInfo?.account}
            </PretendardText>
          </div>
          <RoundOutlineButton
            title="로그아웃"
            onClick={() => {
              window.open(`${import.meta.env.VITE_LANDAS_URL}`, "_blank");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
