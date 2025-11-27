import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import useFindIdCompleteController from "../../hooks/useFindIdCompleteController";
import useMoveToPage from "../../../../shared/hooks/useMoveToPage";
import { route } from "../../../../routes/route";

const FindIdCompleteLayout = () => {
  const { account } = useFindIdCompleteController();
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
          아이디 찾기 완료
        </PretendardText>

        <div className="w-full flex items-center justify-center bg-gray-100 py-[16px] rounded-[6px]">
          <PretendardText className={"text-[16px] font-medium text-gry-700"}>
            {account}
          </PretendardText>
        </div>

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

export default FindIdCompleteLayout;
