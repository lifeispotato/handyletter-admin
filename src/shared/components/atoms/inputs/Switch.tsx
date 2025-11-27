interface SwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = ({
  isChecked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={`relative inline-flex h-[24px] w-[44px] shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isChecked ? "bg-primary" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => !disabled && onChange(!isChecked)}
      >
        <span
          className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isChecked ? "translate-x-[20px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
