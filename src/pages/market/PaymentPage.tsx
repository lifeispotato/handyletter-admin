import { useState } from "react";
import bgimg from "@/shared/assets/images/home_landing.png";
import { Button } from "@/shared/components/atoms/Button";
import { Checkbox } from "@/shared/components/atoms/Checkbox";
import { FormInput } from "@/shared/components/molecules/FormInput";

export const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("카드");
  const [name, setName] = useState("김레터");
  const [phone, setPhone] = useState("01012345678");
  const [agreements, setAgreements] = useState({
    all: true,
    age14: true,
    terms: true,
    refund: false,
    eventInfo: false,
    eventPrivacy: false,
    thirdParty: false,
  });

  const handleAgreementChange = (
    key: keyof typeof agreements,
    value: boolean
  ) => {
    if (key === "all") {
      setAgreements({
        all: value,
        age14: value,
        terms: value,
        refund: value,
        eventInfo: value,
        eventPrivacy: value,
        thirdParty: value,
      });
      return;
    }

    const newAgreements = { ...agreements, [key]: value };
    const allChecked = Object.keys(newAgreements)
      .filter((k) => k !== "all")
      .every((k) => newAgreements[k as keyof typeof agreements]);
    newAgreements.all = allChecked;
    setAgreements(newAgreements);
  };

  const paymentMethods = ["카카오페이", "토스페이", "네이버페이", "카드"];

  return (
    <div className="w-full bg-white min-h-screen flex justify-center py-[200px]">
      <div className="flex">
        {/* Payment Form */}
        <div className="flex-1 max-w-[500px]">
          <h1 className="font-sans font-bold text-[28px] text-gray-7 mb-8 text-center">
            결제
          </h1>

          {/* Product Details */}
          <div className="mb-9 flex gap-4 items-center">
            <img
              src={bgimg}
              alt="Product"
              className="w-[176px] h-[117px] object-cover rounded-[10px]"
            />
            <div>
              <div className="flex items-center gap-1 text-[14px] text-gray-5 mb-1">
                <span>호텔</span>
                <span>|</span>
                <span>제주 서귀포</span>
              </div>
              <h2 className="font-sans font-semibold text-[18px] text-gray-7 mb-1">
                도심 골목길에 숨겨져 있는 쉬기 좋은 호텔
              </h2>
              <div className="flex gap-1 items-center">
                <p className="font-sans text-[15px] text-error font-medium">
                  10%
                </p>
                <p className="font-sans text-[15px] text-gray-5 font-medium line-through">
                  300,000원
                </p>
                <p className="font-sans text-[20px] text-black font-semibold">
                  270,000원
                </p>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex items-center justify-center gap-6 p-7 py-4 mb-8 border border-[#E6E8EB] rounded-[8px]">
            <div className="flex flex-col w-[200px]">
              <label className="text-[15px] text-gray-6 mb-2 block">
                구매일자
              </label>
              <div className="text-[16px] font-bold text-gray-7">
                2025.07.27(목) 12:00
              </div>
            </div>
            <div className="w-px h-[72px] bg-gray-4 opacity-30" />
            <div className="flex flex-col w-[200px]">
              <label className="text-[15px]  text-gray-6 mb-2 block">
                예약일자
              </label>
              <div className="text-[16px] font-bold text-gray-7">
                2025.07.27(목) 12:00
              </div>
            </div>
          </div>

          {/* Reservation Info */}
          <div className="mb-8">
            <h3 className="font-sans font-semibold text-[18px] text-gray-7 mb-4">
              예약자 정보
            </h3>
            <div className="flex flex-col gap-4">
              <FormInput
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onClear={() => setName("")}
              />
              <FormInput
                label="휴대전화"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onClear={() => setPhone("")}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="font-sans font-semibold text-[18px] text-gray-7 mb-4">
              결제 수단
            </h3>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-primary focus:ring-primary"
                  />
                  <span className="text-[15px] text-gray-7">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Agreements */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <Checkbox
                label="전체 동의"
                checked={agreements.all}
                onChange={(checked) => handleAgreementChange("all", checked)}
              />
              <div className="w-full h-px bg-gray-4 opacity-30" />
              <div className="flex flex-col gap-3 pl-6">
                <Checkbox
                  label="만 14세 이상 이용 동의"
                  checked={agreements.age14}
                  onChange={(checked) =>
                    handleAgreementChange("age14", checked)
                  }
                />
                <Checkbox
                  label="이용 규칙"
                  checked={agreements.terms}
                  onChange={(checked) =>
                    handleAgreementChange("terms", checked)
                  }
                />
                <Checkbox
                  label="취소 및 환불 규칙"
                  checked={agreements.refund}
                  onChange={(checked) =>
                    handleAgreementChange("refund", checked)
                  }
                />
                <Checkbox
                  label="이벤트, 혜택 정보 수신 동의 (선택)"
                  checked={agreements.eventInfo}
                  onChange={(checked) =>
                    handleAgreementChange("eventInfo", checked)
                  }
                />
                <Checkbox
                  label="이벤트, 혜택 정보 전송을 위한 개인정보 수집 및 이용 동의 (선택)"
                  checked={agreements.eventPrivacy}
                  onChange={(checked) =>
                    handleAgreementChange("eventPrivacy", checked)
                  }
                />
                <Checkbox
                  label="개인정보 제3자 제공안내"
                  checked={agreements.thirdParty}
                  onChange={(checked) =>
                    handleAgreementChange("thirdParty", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            className="w-full h-[52px] text-[16px] font-bold"
          >
            예약하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
