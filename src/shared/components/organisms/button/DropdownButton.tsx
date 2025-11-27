import { useEffect, useRef, useState } from "react";
import { StyleProps } from "../../../types";
import classNameMerge from "../../../utils/classNameMerge";
import IconImg from "../../atoms/IconImg";

interface DropdownButtonProps extends StyleProps {
  btnClassName?: string;
  btnStyle?: React.CSSProperties;
  btnText?: string;
  listClassName?: string;
  listStyle?: React.CSSProperties;
  selectListItem?: { title: string; value: string };
  listItem: {
    title: string;
    value: string;
  }[];
  selectListItemHandler?: (item: { title: string; value: string }) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  className = "",
  style = {},
  btnClassName = "",
  btnStyle = {},
  btnText = "",
  listClassName = "",
  listStyle = {},
  selectListItem = { title: "", value: "" },
  listItem = [],
  selectListItemHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownBtnRef = useRef<HTMLDivElement>(null);
  const dropdownSelectBoxRef = useRef<HTMLUListElement>(null);

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownSelectBoxRef.current &&
        !dropdownSelectBoxRef.current.contains(event.target as Node) &&
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div
      ref={dropdownBtnRef}
      className={classNameMerge(["relative w-fit h-fit", className])}
      style={{
        ...style,
      }}
    >
      <button
        className={classNameMerge([
          "w-fit h-[42px] rounded-[23px] p-[10px_14px]",
          "bg-gray-700 hover:brightness-125 transition",
          "flex items-center justify-center gap-[4px]",
          "font-sans font-medium text-[16px] text-white",
          "leading-[22px] tracking-[-0.3%]",
          btnClassName,
        ])}
        style={{
          ...btnStyle,
        }}
        onClick={toggleDropdown}
      >
        {btnText}
        <IconImg
          className={classNameMerge([
            "w-[16px] h-[16px] transition",
            isOpen ? "rotate-180" : "rotate-0",
          ])}
          src="/assets/admin/icons/ic_arrow_gray02.png"
          alt={isOpen ? "close" : "open"}
        />
      </button>

      <ul
        ref={dropdownSelectBoxRef}
        className={classNameMerge([
          "w-full rounded-[3px] p-[10px] bg-white",
          "absolute top-[51px] left-0 z-10",
          "overflow-y-auto custom-scroll",
          isOpen
            ? "max-h-[230px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
          listClassName,
        ])}
        style={{
          ...listStyle,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
        }}
      >
        {listItem.map((item, index) => (
          <li
            key={index}
            className={classNameMerge([
              "w-full h-fit p-[10px] rounded-[3px] cursor-pointer transition",
              "font-sans font-medium text-[15px] leading-[21.25px] text-gray-700",
              selectListItem.value === item.value
                ? "bg-gray-200"
                : "hover:bg-gray-100",
            ])}
            onClick={() => {
              selectListItemHandler?.(item);
              closeDropdown();
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownButton;
