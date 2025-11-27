import IconButton from "../../../../shared/components/molecules/button/IconButton";
import classNameMerge from "../../../../shared/utils/classNameMerge";

const HomeQuickMenuItem = ({
  tabTitle,
  title,
  onClick,
}: {
  tabTitle: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={classNameMerge([
        "w-[334px] h-[110px] p-[27px_32px] rounded-[8px]",
        "border-[1px] border-line-200 flex flex-col flex-shrink-0",
        "cursor-pointer",
      ])}
      onClick={onClick}
    >
      <p
        className={classNameMerge([
          "font-sans !font-semibold !text-[15px]",
          "!leading-[22px] text-primary",
        ])}
      >
        {tabTitle}
      </p>
      <div className="flex items-center gap-[6px]">
        <p
          className={classNameMerge([
            "font-sans !font-semibold !text-[20px]",
            "!leading-[34px] !tracking-[-1%] text-gray-700",
          ])}
        >
          {title}
        </p>
        <IconButton
          className="w-[20px] h-[20px]"
          imgSrc="/assets/admin/icons/ic_round_arrow.svg"
          alt="바로가기"
        />
      </div>
    </div>
  );
};

export default HomeQuickMenuItem;
