import moment from "moment";
import get from "lodash/get";
import DetailInfoTitle from "../../../components/atoms/text/DetailInfoTitle";
import DetailBox from "../../atoms/layout/detailPage/DetailBox";
import DetailInfoText from "../../atoms/text/DetailInfoText";
import ImgFilePreview from "../../organisms/file/ImgFilePreview";
import DetailPageTitle from "./../../atoms/text/DetailPageTitle";
import Checkbox from "./../../atoms/inputs/Checkbox";
import FillButton from "./../../atoms/button/FillButton";
import { DetailColumn, DetailColumnContent } from "../../../types";

interface DetailTemplateProps {
  columns: DetailColumn[];
  data: Record<string, unknown>;
  isAction?: boolean;
  actionText?: string;
  actionFunc?: () => void;
}

function DetailTemplate({
  columns,
  data,
  isAction,
  actionText,
  actionFunc,
}: DetailTemplateProps) {
  const renderers = {
    text: (col: DetailColumnContent, row: Record<string, unknown>) => {
      const value = get(row, col.key || "", "");
      return <DetailInfoText>{String(value) || "-"}</DetailInfoText>;
    },

    date: (col: DetailColumnContent, row: Record<string, unknown>) => {
      const value = get(row, col.key || "", null);
      return (
        <DetailInfoText>
          {value ? moment(value).format(col.format || "YYYY-MM-DD") : "-"}
        </DetailInfoText>
      );
    },

    checkbox: (col: DetailColumnContent) => {
      return (
        <div className="flex flex-col gap-[20px]">
          {Array.isArray(col.list) &&
            col.list.map((item, index) => (
              <div key={index} className="flex items-center gap-[5px]">
                <DetailInfoText>{item.text}</DetailInfoText>
                <Checkbox
                  checked={item.isChecked}
                  disabled={item.isDisabled}
                  onChange={() => {}}
                />
              </div>
            ))}
        </div>
      );
    },

    img: (col: DetailColumnContent, row: Record<string, unknown>) => {
      const imageOriginName = get(row, col.imageOriginName || "", "");
      const imageStoredName = get(row, col.imageStoredName || "", "");
      return (
        <ImgFilePreview
          imageOriginName={imageOriginName as string}
          imageStoredName={imageStoredName as string}
        />
      );
    },

    free: (col: DetailColumnContent, row: Record<string, unknown>) =>
      col.customRender?.(col, row) || null,
  };

  const getRenderFunc = (col: DetailColumnContent) => {
    return (row: Record<string, unknown>) => {
      const renderer = renderers[col.type];
      return renderer ? (
        renderer(col, row)
      ) : (
        <DetailInfoText>{row[col.key || ""] as string}</DetailInfoText>
      );
    };
  };

  return (
    <DetailBox>
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={column?.isMargin ? "mb-6" : undefined}
        >
          <DetailPageTitle>{column.title}</DetailPageTitle>

          <div className="flex flex-col gap-[20px]">
            {column.content.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`flex gap-[20px] ${
                  col.isAlignStart ? "items-start" : "items-center"
                }`}
              >
                <DetailInfoTitle>
                  <div className="flex items-center gap-[8px] w-fit">
                    {col.subTitle}
                    {col.isEdited && (
                      <span className="w-[10px] h-[10px] bg-primary rounded-full" />
                    )}
                  </div>
                </DetailInfoTitle>

                {getRenderFunc(col)(data)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {isAction && actionText && actionFunc && (
        <div className="w-full h-fit flex justify-end">
          <FillButton title={actionText} onClick={actionFunc} />
        </div>
      )}
    </DetailBox>
  );
}

export default DetailTemplate;
