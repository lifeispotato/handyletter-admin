import { route } from "../../../../routes/route";
import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import useMoveToPage from "../../../../shared/hooks/useMoveToPage";

const BeforeApproveAccountLayout = () => {
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
          승인 대기중
        </PretendardText>

        <PretendardText className={"text-[16px] font-medium text-gry-700"}>
          아직 계정 승인이 되지 않았습니다.
          <br />
          관리자 승인 완료시 로그인이 가능합니다.
        </PretendardText>

        <PrimaryButton
          title="확인"
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

export default BeforeApproveAccountLayout;
