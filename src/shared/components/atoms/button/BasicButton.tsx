import type { BasicButtonProps} from "../../../types/buttonTypes.ts";
import classNameMerge from "../../../utils/classNameMerge";
import { useId } from "react";

const BasicButton = ({
  className = "",
  style = {},
  children = "",
  isDisabled = false,
  type = "button",
  title = "",
  id,
  onClick = () => {},
}: BasicButtonProps) => {
  // id가 제공되지 않으면 고유 ID 자동 생성
  const autoId = useId();
  const buttonId = id || autoId;

  return (
    <button
      className={classNameMerge([className])}
      style={{
        ...style,
      }}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      id={buttonId}
      title={title}
    >
      <span>{children}</span>
    </button>
  );
};

export default BasicButton;
