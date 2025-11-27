import { useSearchParams } from "react-router-dom";
import { cn } from "../../../utils/style";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  inputClassName?: string;
  placeholder?: string;
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  disabled,
  style,
  inputClassName,
  placeholder,
  onClick,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={`
        flex items-center 
        w-[340px] h-[42px]
        px-[20px] py-[10px]
        rounded-[20px]
        bg-gray-100
        `}
      style={style}
    >
      <input
        type="text"
        placeholder={placeholder || "검색어를 입력하세요"}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value === "") {
            searchParams.delete("keyword");
            searchParams.delete("page");
            setSearchParams((searchParams) => searchParams);

            return;
          }

          if (e.key === "Enter") onClick();
        }}
        className={cn(
          `
          w-[282px]
          border-none bg-transparent p-0
          text-gray-1400 text-[16px] font-medium
          leading-[22px] tracking-[-0.048px]
          placeholder-gray-400 caret-primary 
          focus:border-none focus:outline-none
          `,
          inputClassName
        )}
      />
      <img
        style={{ cursor: "pointer" }}
        onClick={onClick}
        src="/assets/admin/icons/ic_search_gray.png"
        className="h-[18px] w-[18px]"
        alt="검색"
      />
    </div>
  );
};

export default SearchBar;
