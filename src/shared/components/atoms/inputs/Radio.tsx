import { ChangeEvent, CSSProperties, MouseEvent } from "react";
// import { RADIO_STYLES } from "@/shared/styles/radio"; // Assuming this is your import path

// You'll need a class-merging utility like clsx/tailwind-merge
// If you don't have one, you can just join the strings.
// import { cn } from "@/shared/utils/style";
export const RADIO_STYLES = {
  base: {
    container:
      "flex h-full w-full items-center justify-center rounded-full border-2 border-[#B8BFC4] bg-white",
    dot: "h-[8px] w-[8px] rounded-full bg-[#B8BFC4]",
  },
  variants: {
    hover: "hover:border-[#27BEFF] hover:bg-[#F5FCFF]",
    checked: {
      container:
        "flex h-full w-full items-center justify-center rounded-full border-2 border-[#27BEFF] bg-white",
      dot: "h-[8px] w-[8px] rounded-full bg-[#27BEFF]",
    },
    disabled: "!cursor-not-allowed !bg-[#B8BFC4] !border-[#B8BFC4]",
  },
  focus: "peer-focus-visible:ring-[#27BEFF] peer-focus-visible:ring-2",
};
interface RadioProps {
  id: string;
  checked: boolean;
  name: string;
  value: string;
  valueText: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  textStyle?: CSSProperties;
  disabled?: boolean;
}

function Radio({
  id,
  checked,
  name,
  value,
  valueText,
  onChange,
  textStyle,
  disabled,
}: RadioProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // This logic is fine, it finds the child input and clicks it
    const input = e.currentTarget.querySelector("input");
    if (input && !input.disabled) {
      input.click();
    }
  };

  return (
    <div
      className={`
        inline-flex items-center gap-[8px]
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      onClick={handleClick}
    >
      <div className="relative inline-flex h-[20px] w-[20px]">
        {/* 1. The REAL input
          - It's invisible ("opacity-0")
          - It's now a "peer" so the fake div can react to its focus
        */}
        <input
          name={name}
          type="radio"
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            absolute h-full w-full opacity-0 peer
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          `}
        />

        {/* 2. The "FAKE" Radio Button (Visual Container)
          - This div uses all your styles from RADIO_STYLES
        */}
        <div
          className={`
            ${
              disabled
                ? RADIO_STYLES.variants.disabled
                : `
                  ${
                    checked
                      ? RADIO_STYLES.variants.checked.container
                      : RADIO_STYLES.base.container
                  }
                  ${RADIO_STYLES.variants.hover}
                  ${RADIO_STYLES.focus}
                `
            }
          `}
        >
          {/* 3. The "FAKE" Inner Dot
            - Uses dot styles from RADIO_STYLES
          */}
          <div
            className={`
              ${
                disabled
                  ? "h-[8px] w-[8px] rounded-full bg-transparent" // Hide dot on disabled
                  : checked
                  ? RADIO_STYLES.variants.checked.dot
                  : RADIO_STYLES.base.dot
              }
            `}
          />
        </div>
      </div>

      {/* 4. The Label
        - Updated with theme colors and hover effect
      */}
      <label
        htmlFor={id}
        style={textStyle}
        className={`
     font-sans text-[15px] font-medium
     leading-[21.25px] select-none
     ${
       disabled
         ? "cursor-not-allowed text-system-400" // Disabled text color
         : `
                cursor-pointer hover:text-primary 
                ${checked ? "text-system-700" : "text-system-500"}
              ` // Enabled text with hover
     }
        `}
        aria-label={valueText}
      >
        {valueText}
      </label>
    </div>
  );
}

export default Radio;
