import { route } from "../../../../routes/route";
import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import RegisterButton from "../../../../shared/components/atoms/button/RegisterButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import CheckboxText from "../../../../shared/components/molecules/CheckboxText";
import BasicInput from "../../../../shared/components/organisms/input/BasicInput";
import useMoveToPage from "../../../../shared/hooks/useMoveToPage";
import useLoginController from "../../hooks/useLoginController";

const LoginLayout = () => {
  const {
    userId,
    setUserId,
    password,
    setPassword,
    autoRefreshChecked,
    setautoRefreshChecked,
    handleLogin,
  } = useLoginController();
  const { moveToPage } = useMoveToPage();

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[518px] h-fit px-[90px] py-[86px] flex flex-col items-center rounded-[16px] bg-white shadow-lg">
        
        <PretendardText
          className={
            "text-[30px] font-bold leading-[41.5px] text-black -tracking-[0.7%] mb-[40px]"
          }
        >
          로그인
        </PretendardText>

        <div className="w-full h-fit flex flex-col items-center gap-[20px] mb-[40px]">
          <BasicInput
            placeholder="아이디를 입력해 주세요."
            labelText="아이디"
            helperText=""
            type="text"
            isError={false}
            inputType={"default"}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <BasicInput
            placeholder="비밀번호를 입력해 주세요."
            labelText="비밀번호"
            helperText=""
            type="password"
            isError={false}
            inputType={"default"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <div className="w-full h-fit flex items-center">
            <CheckboxText
              id="autoRefreshChecked"
              checked={autoRefreshChecked}
              title="아이디 저장"
              onChange={(e) => {
                setautoRefreshChecked(e.target.checked);
              }}
              onClick={() => {
                setautoRefreshChecked(!autoRefreshChecked);
              }}
            />
          </div>
        </div>

        <div className="w-full h-fit flex flex-col items-center gap-[10px]">
          <PrimaryButton
            title="로그인"
            onClick={() => {
              handleLogin();
            }}
          />
          <RegisterButton
            title="회원가입"
            onClick={() => {
              moveToPage(route.join);
            }}
          />
        </div>
        <div className="flex items-center gap-[20px] mt-[20px]">
          <PretendardText
            className={
              "text-[16px] font-semibold text-gray-500 underline cursor-pointer"
            }
            onClick={() => {
              moveToPage(route.account_find);
            }}
          >
            아이디 찾기
          </PretendardText>
          <PretendardText
            className={
              "text-[16px] font-semibold text-gray-500 underline cursor-pointer"
            }
            onClick={() => {
              moveToPage(route.account_find);
            }}
          >
            비밀번호 찾기
          </PretendardText>
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
