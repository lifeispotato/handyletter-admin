import PassButton from "../../../../shared/components/atoms/button/PassButton";
import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import useAccountFindController from "../../hooks/useAccountFindController";
import useMoveToPage from "../../../../shared/hooks/useMoveToPage";
import { route } from "../../../../routes/route";

const AccountFindLayout = () => {
  const { authData } = useAccountFindController();
  const { moveToPage } = useMoveToPage();

  return (
    <section className="w-full h-screen flex justify-center items-center py-[40px]">
      <div className="w-[518px] h-fit px-[90px] py-[86px] flex flex-col items-center rounded-[16px] bg-white shadow-lg">
        <img
          src="/assets/admin/icons/ic_logo.png"
          alt=""
          className="w-[120px] mb-[40px]"
        />
        <PretendardText
          className={
            "text-[30px] font-bold leading-[41.5px] text-black -tracking-[0.7%] mb-[40px]"
          }
        >
          아이디/비밀번호 찾기
        </PretendardText>

        {!authData ? (
          <PassButton title="본인인증" />
        ) : (
          <div className="flex flex-col items-center gap-[10px]">
            <PrimaryButton
              title="아이디 찾기"
              onClick={() => {
                moveToPage(route.find_id_complete, () => {}, {
                  state: {
                    authData: authData,
                  },
                });
              }}
            />
            <PrimaryButton
              title="비밀번호 찾기"
              onClick={() => {
                moveToPage(route.reset_pw, () => {}, {
                  state: {
                    authData: authData,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountFindLayout;
