import { StyleProps } from "../../types";
import classNameMerge from "./../../utils/classNameMerge";

const GrayDivideLine = ({ className = "", style = {} }: StyleProps) => {
  return (
    <div
      className={classNameMerge(["w-full h-[1px] bg-line-200", className])}
      style={{
        ...style,
      }}
    />
  );
};

export default GrayDivideLine;
