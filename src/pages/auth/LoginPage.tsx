import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../shared/components/atoms/Button";
import { FormInput } from "../../shared/components/molecules/FormInput";
import characterDuck from "../../shared/assets/images/duck.png";
import kakaoIcon from "../../shared/assets/icons/kakao.svg";

export const LoginPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex items-center px-[95px] py-[89px] justify-center bg-white ">
      {/* Main Card Container (Group 5287) */}
      <div className="w-[351px] rounded-2xl bg-white flex flex-col items-center  shadow-none border border-transparent">
        {/* Note: Image shows white bg on white page, so border might not be needed unless on gray bg. 
            If you want a border/shadow to distinguish it: "border border-gray-100 shadow-sm" */}

        {/* 1. Duck Character */}
        <img
          src={characterDuck}
          alt="Welcome"
          className="w-[102px] h-[135px] object-contain mb-1.5"
        />

        {/* 2. Headline */}
        <h1 className="font-sans font-bold text-[22px] leading-8 text-center text-gray-7 mb-[39px] whitespace-pre-line">
          {`숨겨진 동네 맛집, 놀거리들\n가볼 준비 되셨나요?`}
        </h1>

        {/* 3. Kakao Login Section */}
        <div className="w-full flex flex-col gap-4 mb-[30px]">
          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px bg-[#E6E8EB] flex-1"></div>
            <span className="text-[12px] text-gray-6 font-medium">
              카카오톡으로 시작하기
            </span>
            <div className="h-px bg-[#E6E8EB] flex-1"></div>
          </div>

          {/* Kakao Button (Custom Yellow #FEE500) */}
          <Button
            className="w-full h-12 rounded-3xl bg-[#FFE812] hover:bg-[#FDD835] text-gray-700 flex items-center justify-center gap-2 transition-colors"
            icon={
              <img src={kakaoIcon} alt="Kakao" className="w-[18px] h-[18px]" />
            }
            iconPosition="left"
          >
            카카오로 계속하기
          </Button>
        </div>

        {/* 4. Email Login Section */}
        <div className="w-full flex flex-col gap-4">
          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px bg-[#E6E8EB] flex-1"></div>
            <span className="text-[12px] text-gray-6 font-medium">
              이메일로 시작하기
            </span>
            <div className="h-px bg-[#E6E8EB] flex-1"></div>
          </div>

          {/* Email Input */}
          <FormInput
            placeholder="handy@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 bg-white" // Ensure rounded-24px from component default
          />

          {/* Green Subscribe/Login Button */}
          <Button
            variant="primary"
            className="w-full h-12 rounded-3xl font-bold text-[16px]"
          >
            구독하기
          </Button>
        </div>

        {/* 5. Footer Link (Forgot Password) */}
        <Link
          to="/login/password" // Matches your route checklist "login password"
          className="mt-5 text-[13px] text-gray-5 underline decoration-transparent hover:decoration-[#808991] transition-all"
        >
          비밀번호를 잊어버리셨나요?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
