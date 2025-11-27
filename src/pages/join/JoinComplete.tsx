import { route } from "../../routes/route";
import PrimaryButton from "../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../shared/components/atoms/text/PretendardText";
import useMoveToPage from "../../shared/hooks/useMoveToPage";

const JoinComplete = () => {
  const { moveToPage } = useMoveToPage();

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[518px] h-fit px-[90px] py-[86px] flex flex-col items-center rounded-[16px] bg-white shadow-lg">
        <PretendardText
          className={"text-[30px] font-bold text-black text-center mb-[40px]"}
        >
          가입완료
        </PretendardText>

        <PretendardText
          className={"text-[18px] text-gray-500 text-center mb-[40px]"}
        >
          관리자 승인 후 로그인이 가능합니다.
        </PretendardText>

        <PrimaryButton
          title="로그인 페이지로 이동"
          onClick={() => {
            moveToPage(route.login, () => {}, {
              replace: true,
            });
          }}
        />
      </div>
    </section>
  );
};

export default JoinComplete;
