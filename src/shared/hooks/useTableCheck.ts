import { useState } from "react";

type RowType = { id: string | number } | string | number;

// 리스트를 동적으로 가져올 수 있는 함수(getListFn)를 받아서 최신 데이터를 기준으로 체크 상태 관리
export const useCheckList = (getListFn: () => { id: number | string }[]) => {
  // =========================================================================
  // 상태 관리 (체크된 항목 리스트)
  // =========================================================================
  const [checkedList, setCheckedList] = useState<number[]>([]);

  // row가 객체든 숫자든 문자열이든 관계없이 id만 숫자로 추출
  const extractId = (row: RowType) => {
    if (typeof row === "object") {
      return Number(row.id);
    } else {
      return Number(row);
    }
  };

  // =========================================================================
  // 단일 항목 체크/해제
  // =========================================================================
  const toggleCheckFunc = (row: RowType) => {
    const id = extractId(row);

    setCheckedList((prev) => {
      if (prev.includes(id)) {
        // 이미 체크되어 있으면 제거
        return prev.filter((item) => item !== id);
      } else {
        // 체크되어 있지 않으면 추가
        return [...prev, id];
      }
    });
  };

  // =========================================================================
  // 현재 페이지 전체 체크
  // =========================================================================
  const toggleAllFunc = () => {
    const currentPageIds = getListFn().map((item) => Number(item.id));

    const allChecked = currentPageIds.every((id) => checkedList.includes(id));

    setCheckedList((prev) => {
      if (allChecked) {
        // 모두 체크된 상태라면 해제
        return prev.filter((id) => !currentPageIds.includes(id));
      } else {
        // 일부 또는 전혀 체크되지 않은 경우 전체 추가
        const newIds = currentPageIds.filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      }
    });
  };

  // =========================================================================
  // 해당 row가 현재 체크 상태인지 여부 반환
  // =========================================================================
  const isChecked = (row: RowType) => {
    const id = extractId(row);
    return checkedList.includes(id);
  };

  return {
    checkedList,
    setCheckedList,
    toggleCheckFunc,
    toggleAllFunc,
    isChecked,
  };
};
