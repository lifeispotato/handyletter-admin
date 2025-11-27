import PassButton from "../../../../shared/components/atoms/button/PassButton";
import PrimaryButton from "../../../../shared/components/atoms/button/PrimaryButton";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import BasicInput from "../../../../shared/components/organisms/input/BasicInput";
import { formatPhoneNumber } from "../../../../shared/utils/formatNum";
import useJoinController from "../../hooks/useJoinController";

const JoinLayout = () => {
  const {
    userId,
    setUserId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    handleJoin,
    isPasswordMatch,
    passwordError,
    passwordCheckError,
    certificateError,
    checkUserIdFunc,
    userIdDuplicateError,
    authData,
  } = useJoinController();

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
          회원가입
        </PretendardText>

        {!authData ? (
          <PassButton title="본인인증" />
        ) : (
          <>
            <div className="w-full h-fit flex flex-col items-center gap-[20px] mb-[40px]">
              {/* 아이디 */}
              <BasicInput
                placeholder="아이디를 입력해 주세요."
                labelText="아이디"
                type="text"
                inputType={"default"}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                btnText="중복확인"
                onClick={checkUserIdFunc}
                helperText={userIdDuplicateError}
                isError={!!userIdDuplicateError}
              />

              {/* 비밀번호 */}
              <BasicInput
                labelText="비밀번호"
                placeholder="비밀번호를 입력해 주세요."
                helperText={
                  passwordError ||
                  "영문/숫자/특수문자 중 2가지 이상 포함, 8자 ~ 16자"
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
                helperText={passwordCheckError}
                type="password"
                isError={!!passwordCheckError || !isPasswordMatch}
                inputType={"default"}
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
              />

              {/* 이름 */}
              <BasicInput
                placeholder="이름을 입력해 주세요."
                labelText="이름"
                helperText=""
                type="text"
                isError={false}
                inputType={"default"}
                value={authData?.user_name || name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!authData}
              />

              {/* 휴대폰 번호 */}
              <BasicInput
                placeholder="휴대폰 번호를 입력해 주세요."
                labelText="휴대폰 번호"
                type="text"
                helperText={certificateError}
                isError={!!certificateError}
                maxLength={11}
                inputType={"default"}
                value={formatPhoneNumber(authData?.phone_no || phoneNumber)}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!!authData}
              />
            </div>

            <PrimaryButton
              title="회원가입"
              onClick={() => {
                handleJoin();
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default JoinLayout;
