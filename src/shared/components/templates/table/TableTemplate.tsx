import get from "lodash/get";
import moment from "moment";
import TableDetailButton from "../../../components/atoms/button/TableDetailButton";
import Checkbox from "../../../components/atoms/inputs/Checkbox";
import BodyTr from "../../../components/atoms/layout/table/BodyTr";
import HeadTr from "../../../components/atoms/layout/table/HeadTr";
import Table from "../../../components/atoms/layout/table/Table";
import Td from "../../../components/atoms/layout/table/Td";
import Th from "../../../components/atoms/layout/table/Th";
import TableText from "../../../components/atoms/text/TableText";
import TableDelButton from "../../atoms/button/TableDelButton";
import TableDropdown from "../../organisms/input/TableDropdown";
import { Column, DropdownItem, TableRow } from "../../../types";
import { cn } from "../../../utils/style";

interface TableTemplateProps {
  columns: Column[];
  data: TableRow[];
  toggleAll?: () => void;
  updateStatus?: (id: number, newValue: string | number) => void;
  statusOptions?: DropdownItem[];
  checkedList?: { id: string | number }[];
  tableClassName?: string;
  headTrClassName?: string;
  headTrTextClassName?: string;
  firstColumnPl?: string;
  TdClassName?: string;
}

function TableTemplate({
  columns,
  data,
  toggleAll,
  updateStatus = () => {},
  statusOptions = [],
  checkedList,
  tableClassName,
  headTrClassName,
  headTrTextClassName,
  firstColumnPl = "30px",
  TdClassName,
}: TableTemplateProps) {
  // 데이터를 받아서 type에 따라 자동으로 render 함수 생성

  const renderers = {
    // 체크박스
    checkbox: (col: Column, row: TableRow) => {
      // disabled가 함수인 경우 실행, boolean인 경우 그대로 사용
      const isDisabled =
        typeof col.disabled === "function"
          ? col.disabled(row)
          : col.disabled || false;

      return (
        <Checkbox
          id={String(row.id)}
          disabled={isDisabled}
          checked={
            col.includeAllInfo
              ? col.checked?.(row) ?? false
              : col.checked?.(row.id) ?? false
          }
          onChange={() => {
            if (col.includeAllInfo) {
              col.onChange?.(row);
            } else {
              col.onChange?.(row.id);
            }
          }}
        />
      );
    },

    // 텍스트 (중첩 객체 지원)
    text: (col: Column, row: TableRow) => {
      const value = get(row, col.key, "");
      return (
        <TableText style={{ maxWidth: col.width }}>
          {String(value) || "-"}
        </TableText>
      );
    },

    // 날짜 (중첩 객체 지원)
    date: (col: Column, row: TableRow) => {
      const value = get(row, col.key);
      return (
        <TableText>{value ? moment(value).format(col.format) : "-"}</TableText>
      );
    },

    // 삭제 버튼
    delButton: (col: Column, row: TableRow) => (
      <TableDelButton
        onClick={() => col.onClick?.(row)}
        title={col?.btnText || "삭제"}
      />
    ),

    // 상세 버튼
    detailButton: (col: Column, row: TableRow) => (
      <TableDetailButton
        onClick={() => col.onClick?.(row)}
        title={col?.btnText || "보기"}
      />
    ),

    // 일반 버튼
    button: (col: Column, row: TableRow, index?: number) => (
      <TableDetailButton
        onClick={() => col.onClick?.(row, index)}
        isNoPlusIcon={true}
        title={col?.btnText || "링크복사"}
      />
    ),

    // 상태 드롭다운 (중첩 객체 지원)
    dropdown: (col: Column, row: TableRow) => {
      const selectedValue = get(row, col.key, "");
      return (
        <TableDropdown
          list={statusOptions}
          selectedValue={String(selectedValue)}
          onClick={(newValue) => updateStatus(Number(row.id), newValue)}
        />
      );
    },

    // 사용자 정의 렌더링
    free: (col: Column, row: TableRow, index?: number) =>
      col.customRender?.(col, row, index) || null,
  };

  const getRenderFunc = (col: Column) => {
    return (row: TableRow, index?: number) => {
      const value = row[col.key];
      return (
        renderers[col.type]?.(col, row, index) || (
          <TableText>{value ? String(value) : "-"}</TableText>
        )
      );
    };
  };

  return (
    <Table className={tableClassName}>
      {/* ===== 너비 조정 ===== */}
      <colgroup>
        {columns.map((col) => (
          <col key={col.key} width={col.width} />
        ))}
      </colgroup>

      {/* ===== 테이블 head ===== */}
      <thead>
        <HeadTr className={headTrClassName}>
          {columns.map((col, index) => (
            <Th
              key={col.key}
              className={cn(
                col.position === "center" ? "text-center" : "",
                headTrTextClassName
              )}
              style={index === 0 ? { paddingLeft: firstColumnPl } : undefined}
            >
              {col.type === "checkbox" ? (
                <Checkbox
                  checked={
                    data?.length > 0 &&
                    data?.every((item) =>
                      checkedList?.some((i) => i.id === item.id)
                    )
                  }
                  onChange={() => {
                    if (toggleAll) {
                      toggleAll();
                    }
                  }}
                />
              ) : (
                <TableText
                  className={`${
                    col.position === "center"
                      ? `text-center ${headTrTextClassName}`
                      : headTrTextClassName
                  }`}
                >
                  {col.title}
                </TableText>
              )}
            </Th>
          ))}
        </HeadTr>
      </thead>

      {/* ===== 테이블 body ===== */}
      <tbody>
        {data?.map((row, rowIndex) => (
          <BodyTr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <Td
                key={col.key}
                className={TdClassName}
                style={
                  colIndex === 0 ? { paddingLeft: firstColumnPl } : undefined
                }
              >
                {getRenderFunc(col)(row, rowIndex)}
              </Td>
            ))}
          </BodyTr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableTemplate;
