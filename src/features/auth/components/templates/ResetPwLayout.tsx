import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import BasicInput from "../../../../shared/components/organisms/input/BasicInput";
import useResetPwController from "../../hooks/useResetPwController";

const ResetPwLayout = () => {
  const {
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    resetPassword,
    isPasswordMatch,
    passwordError,
    passwordCheckError,
  } = useResetPwController();

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
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
          비밀번호 재설정
        </PretendardText>

        <div className="w-full h-fit flex flex-col items-center gap-[20px] mb-[40px]">
          {/* 비밀번호 */}
          <BasicInput
            labelText="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            helperText={
              typeof passwordError === "string"
                ? passwordError
                : "영문/숫자/특수문자 중 2가지 이상 포함, 8자 ~ 16자"
            }
            type="password"
            isError={!!passwordError}
            inputType={"default"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {/* 비밀번호 확인 */}
          <BasicInput
            labelText="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해 주세요."
            helperText={passwordCheckError || ""}
            type="password"
            isError={!!passwordCheckError || !isPasswordMatch}
            inputType={"default"}
            onChange={(e) => setPasswordCheck(e.target.value)}
            value={passwordCheck}
          />
        </div>

        <PrimaryButton
          title="비밀번호 재설정하기"
          onClick={() => {
            resetPassword();
          }}
          disabled={
            !password ||
            !passwordCheck ||
            !!passwordError ||
            !!passwordCheckError
          }
        />
      </div>
    </section>
  );
};

export default ResetPwLayout;
