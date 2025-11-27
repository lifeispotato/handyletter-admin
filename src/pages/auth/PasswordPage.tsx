import { useState } from "react";
import { Button } from "../../shared/components/atoms/Button";
import { FormInput } from "../../shared/components/molecules/FormInput";
import { Checkbox } from "../../shared/components/atoms/Checkbox";
import characterDuck from "../../shared/assets/images/duck.png";

export const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Checkbox States
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false, // Essential
    privacy: false, // Essential
    age: false, // Essential
    email: false, // Optional
    sms: false, // Optional
    service: false, // Optional
    ads: false, // Optional
  });

  // Handle "Agree All" Click
  const handleAllCheck = (checked: boolean) => {
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      age: checked,
      email: checked,
      sms: checked,
      service: checked,
      ads: checked,
    });
  };

  // Handle Individual Click
  const handleSingleCheck = (
    key: keyof typeof agreements,
    checked: boolean
  ) => {
    setAgreements((prev) => {
      const newState = { ...prev, [key]: checked };

      // Check if all individual items are true to auto-check "all"
      const { all, ...others } = newState;
      const allChecked = Object.values(others).every(Boolean);

      return { ...newState, all: allChecked };
    });
  };

  return (
    <div className="w-full  flex items-center px-[95px] py-[89px] justify-center bg-white">
      {/* Main Card (Group 5287) */}
      <div className="w-[351px] rounded-2xl b flex flex-col items-center  border border-transparent">
        {/* 1. Duck Character */}
        <img
          src={characterDuck}
          alt="Welcome"
          className="w-[102px] h-[135px] object-contain mb-1.5"
        />

        {/* 2. Headline */}
        <h1 className="font-sans font-bold text-[30px] leading-[38px] tracking-[-0.007em] text-center text-gray-7 mb-[39px]">
          비밀번호를 설정해 주세요
        </h1>

        {/* 3. Password Forms */}
        <div className="w-full flex flex-col gap-4 mb-[30px]">
          <FormInput
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // Error Logic Example: Show error if passwords don't match and confirm is not empty
            error={
              confirmPassword && password !== confirmPassword
                ? "비밀번호 조합이 올바르지 않습니다."
                : undefined
            }
          />
        </div>

        {/* 4. Terms Agreement Box (Frame 8147) */}
        <div className="w-full border border-[#E6E8EB] rounded-lg p-5 flex flex-col gap-[15px] mb-10">
          {/* Top: Agree All */}
          <div className="pb-[15px] border-b border-[#E6E8EB]">
            <Checkbox
              label="전체 동의"
              checked={agreements.all}
              onChange={handleAllCheck}
              className="font-bold text-gray-7"
            />
          </div>

          {/* List: Individual Terms */}
          <div className="flex flex-col gap-3">
            <Checkbox
              label="필수 이용약관 동의"
              checked={agreements.terms}
              onChange={(c) => handleSingleCheck("terms", c)}
            />
            <Checkbox
              label="개인정보 수집/이용 동의"
              checked={agreements.privacy}
              onChange={(c) => handleSingleCheck("privacy", c)}
            />
            <Checkbox
              label="만 14세 이상 가입 동의"
              checked={agreements.age}
              onChange={(c) => handleSingleCheck("age", c)}
            />
            <Checkbox
              label="이메일 정보 수신, 마케팅 동의(선택)"
              checked={agreements.email}
              onChange={(c) => handleSingleCheck("email", c)}
            />
            <Checkbox
              label="SMS 정보 수신, 마케팅 동의(선택)"
              checked={agreements.sms}
              onChange={(c) => handleSingleCheck("sms", c)}
            />
            <Checkbox
              label="서비스 알림 수신 동의(선택)"
              checked={agreements.service}
              onChange={(c) => handleSingleCheck("service", c)}
            />
            <Checkbox
              label="광고성 알림 수신 동의(선택)"
              checked={agreements.ads}
              onChange={(c) => handleSingleCheck("ads", c)}
            />
          </div>
        </div>

        {/* 5. Submit Button */}
        <Button
          variant="primary"
          className="w-full h-12 rounded-3xl font-bold text-[16px]"
        >
          구독하기
        </Button>
      </div>
    </div>
  );
};

export default PasswordPage;
