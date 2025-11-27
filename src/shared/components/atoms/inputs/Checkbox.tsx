interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Checkbox({ id, checked, onChange, disabled }: CheckboxProps) {
  return (
    <input
      id={id}
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      className={`
        h-[20px] w-[20px]
        rounded-[4px] border border-gray-400 bg-white
        appearance-none outline-none
        ${!disabled && "cursor-pointer"}
        ${
          disabled
            ? "border-none bg-[url('/assets/admin/icons/ic_checkbox_disabled.png')] bg-center bg-no-repeat bg-[length:20px_20px]"
            : checked
            ? "border-none bg-[url('/assets/admin/icons/ic_checkbox.png')] bg-center bg-no-repeat bg-[length:20px_20px]"
            : ""
        } 
        ${disabled ? "cursor-not-allowed opacity-50" : ""} 
      `}
    />
  );
}

export default Checkbox;
