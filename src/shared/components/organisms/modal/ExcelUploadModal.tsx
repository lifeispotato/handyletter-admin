import { DragEvent, useEffect, useState } from "react";
import { ImportExcelResponseType } from "../../../types/data.types";
import PretendardText from "../../atoms/text/PretendardText";
import TableTitle from "../../atoms/text/TableTitle";
import ExcelUploadInput from "../input/ExcelUploadInput";

interface ExcelUploadModalProps {
  setModalOpen: (isOpen: boolean) => void;
  handleImportExcel: (file: File) => void;
  excelUploadError?: ImportExcelResponseType | null;
  setExcelUploadError?: React.Dispatch<React.SetStateAction<ImportExcelResponseType | null>>;
}

const ExcelUploadModal = ({ setModalOpen, handleImportExcel, excelUploadError, setExcelUploadError }: ExcelUploadModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 99%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setExcelUploadError?.(null);
    setTimeout(() => setModalOpen(false), 100);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && /\.(xls|xlsx)$/.test(file.name)) {
      handleImportExcel(file);
    } else {
      alert("엑셀 파일만 업로드할 수 있습니다 (.xls, .xlsx)");
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`
        fixed top-0 right-0 w-full h-screen
        flex items-center justify-center z-50
        transition-opacity duration-300 bg-black/30 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          w-[500px] min-h-[300px] max-h-[500px] p-10
          flex flex-col items-center gap-6
          rounded-[15px]
          bg-white shadow-[0px_4px_20px_0px_rgba(10,13,20,0.15)]
          transform transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"}`}
      >
        {!excelUploadError && (
          <>
            <TableTitle>엑셀 업로드</TableTitle>
            <ExcelUploadInput
              id="excel-upload-input"
              accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => {
                handleImportExcel(e.target.files?.[0] as File);
              }}
              className={`${isDragging ? "!bg-primary/5" : "bg-white"}`}
            />
          </>
        )}

        {excelUploadError && (
          <div className="w-full flex flex-col items-center gap-[24px]">
            <PretendardText className="text-gray-700 text-center text-[18px] font-bold whitespace-pre-line">{excelUploadError.message.replace(/\s*\(/g, "\n(")}</PretendardText>
            <div className="overflow-y-auto w-full max-h-[300px] custom-scroll flex flex-col gap-[4px] bg-gray-50 p-[16px] rounded-[10px]">
              {excelUploadError.skippedRows.map((error) => (
                <div className="flex items-center gap-2">
                  <PretendardText className="text-gray-500 text-center text-[14px] font-normal">{error.row}행: </PretendardText>
                  <PretendardText className="text-gray-500 text-center text-[14px] font-normal">{error.reason}</PretendardText>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUploadModal;
