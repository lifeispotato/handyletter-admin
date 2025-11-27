import PretendardText from "../../atoms/text/PretendardText";

interface FileInputProps {
  id: string;
  accept: string;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ExcelUploadInput: React.FC<FileInputProps> = ({
  id,
  accept,
  isRequired,
  onChange,
  className,
}) => {
  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        id={id}
        accept={accept}
        required={isRequired}
        onChange={(e) => {
          onChange(e);
        }}
        className="absolute h-0 w-0 overflow-hidden border-0 p-0"
      />
      {/* Label for File Input */}
      <label
        htmlFor={id}
        className={`
          h-[150px] w-full
          cursor-pointer
          flex-center flex-col
          gap-[5px] rounded-[3px]
          border border-dashed border-gray-300
          bg-white
          ${className}
        `}
      >
        <img
          src={"/assets/admin/icons/ic_file.png"}
          alt={"파일업로드"}
          className="h-[18px] w-[26px]"
        />
        <PretendardText className="text-gray-500 text-[14px] font-normal text-center">
          파일을 클릭하거나 드래그해서
          <br />
          이곳에 업로드하세요.
        </PretendardText>
      </label>
    </>
  );
};

export default ExcelUploadInput;
