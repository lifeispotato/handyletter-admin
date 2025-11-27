import { TEXT_BASE_VARIANT } from "../../../styles/text";
import classNameMerge from "../../../utils/classNameMerge";

interface BasicTextProps {
  // 1. 기본 식별자
  id?: string;

  // 2. 핵심 데이터
  children?: React.ReactNode;
  variant?: "label" | "helper" | "title" | "body";

  // 3. 상태/제어
  isRequired?: boolean;
  isError?: boolean;
  isDarkMode?: boolean;

  // 4. HTML 속성
  htmlFor?: string; // label용

  // 5. 스타일링
  className?: string;
}

const BasicText = ({
  // 1. 기본 식별자
  id,

  // 2. 핵심 데이터
  children,
  variant = "helper",

  // 3. 상태/제어
  isRequired = false,
  isError = false,
  isDarkMode = false,

  // 4. HTML 속성
  htmlFor,

  // 5. 스타일링
  className,
}: BasicTextProps) => {
  // variant에 따른 기본 스타일
  const getBaseStyles = () => {
    switch (variant) {
      case "title":
        return TEXT_BASE_VARIANT.title;
      case "label":
        return TEXT_BASE_VARIANT.label;
      case "helper":
        return TEXT_BASE_VARIANT.helper;
      case "body":
        return TEXT_BASE_VARIANT.body;
      default:
        return TEXT_BASE_VARIANT.default;
    }
  };

  // variant에 따른 색상 스타일
  const getColorStyles = () => {
    if (variant === "helper" && isError) return "text-error";
    if (variant === "helper") return "text-system-500";
    return isDarkMode ? "text-white" : "text-system-700";
  };

  // label
  if (variant === "label") {
    return (
      <div className="flex gap-[2px]">
        <label
          id={id}
          htmlFor={htmlFor}
          className={classNameMerge([
            getBaseStyles(),
            getColorStyles(),
            className ? className : "",
          ])}
        >
          {children}
        </label>
        {isRequired && <span className="text-error">*</span>}
      </div>
    );
  }

  // helper
  return (
    <span
      id={id}
      className={classNameMerge([getBaseStyles(), getColorStyles(), className])}
    >
      {children}
    </span>
  );
};

export default BasicText;
