import { useId } from "react";
import classNameMerge from "@/shared/classNameMerge";
import BasicInput from "../atoms/inputs/BasicInput";
import type { SearchInputProps } from "@/shared/types/inputTypes";
import { SEARCH_INPUT_BASE } from "@/shared/styles/input";
import IconButton from "../molecules/button/IconButton-Old";

const SearchInput = ({
  className = "",
  style = {},
  id,
  isDisabled,
  placeholder,
  type = "text",
  onChange,
  onKeyDown,
  value = "",
  isRequired = false,
  maxLength = 100,
  inputClassName = "",
  onClick,
}: SearchInputProps) => {
  // id가 제공되지 않으면 고유 ID 자동 생성
  const autoId = useId();
  const searchInputId = id || autoId;
  return (
    <div
      className={classNameMerge(["flex flex-col gap-[4px]", className])}
      style={{
        ...style,
      }}
    >
      <div className="flex h-fit w-full items-center">
        <div className="relative w-full">
          <BasicInput
            inputClassName={classNameMerge([
              SEARCH_INPUT_BASE,
              "pr-[45px]",
              inputClassName,
            ])}
            id={searchInputId}
            isDisabled={isDisabled}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            isRequired={isRequired}
            maxLength={maxLength}
          />
          <IconButton
            icon="search_gray"
            className={classNameMerge([
              "absolute top-1/2 right-[15px] z-10 flex-shrink-0 -translate-y-1/2 cursor-pointer",
            ])}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
