import { cn } from "../../utils/style";
import Checkbox from "../atoms/inputs/Checkbox";
import PretendardText from "../atoms/text/PretendardText";
import { ChangeEvent, MouseEvent } from "react";

interface CheckboxTextProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  title: string;
}

const CheckboxText = ({
  id,
  checked,
  disabled,
  onChange,
  onClick,
  title,
}: CheckboxTextProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      // Create a synthetic change event for the onChange handler
      const syntheticEvent = {
        target: { checked: !checked },
      } as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-[8px] w-fit h-fit cursor-pointer",
        disabled && "cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <Checkbox
        id={id}
        checked={checked}
        onChange={(e) => e.stopPropagation()}
        disabled={disabled}
      />
      <PretendardText
        className={cn(
          "text-[15px] font-medium leading-[21.5px] text-gray-500",
          checked && "text-gray-700"
        )}
      >
        {title}
      </PretendardText>
    </div>
  );
};

export default CheckboxText;
