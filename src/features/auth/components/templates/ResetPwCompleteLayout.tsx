import { route } from "../../../../routes/route";
import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import useMoveToPage from "../../../../shared/hooks/useMoveToPage";

const ResetPwCompleteLayout = () => {
  const { moveToPage } = useMoveToPage();

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[518px] h-fit px-[90px] py-[86px] flex flex-col gap-[40px] items-center rounded-[16px] bg-white shadow-lg">
        <img
          src="/assets/admin/icons/ic_logo.png"
          alt=""
          className="w-[120px]"
        />
        <PretendardText
          className={
            "text-[30px] font-bold leading-[41.5px] text-black -tracking-[0.7%]"
          }
        >
          비밀번호 재설정 완료
        </PretendardText>

        <PretendardText className={"text-[16px] font-medium text-gry-700"}>
          비밀번호 재설정이 완료되었습니다.
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

export default ResetPwCompleteLayout;
