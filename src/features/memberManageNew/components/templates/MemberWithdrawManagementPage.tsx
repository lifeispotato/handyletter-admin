import type { MemberLeaveData } from "@/features/memberManageNew/components/organisms/MemberLeaveTable";
import MemberLeaveTable from "@/features/memberManageNew/components/organisms/MemberLeaveTable";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import Pagination from "@/shared/components/organisms/pagination/Pagination";
import { BUTTON_DELETE_VARIANT } from "@/shared/styles/button";
import { useState } from "react";

// --- ADDED: Import for the formatter function ---
// (Adjust this path to where your utility function is located)

// --- Mock Data ---
const mockLeaveData: MemberLeaveData[] = [
  { id: 1, reason: "원하는 서비스가 없어요", leaveDate: "YYYY-MM-DD" },
  { id: 2, reason: "서비스를 사용하기가 어려워요", leaveDate: "YYYY-MM-DD" },
  { id: 3, reason: "서비스에서 불쾌한 ", leaveDate: "YYYY-MM-DD" },
  { id: 4, reason: "다른 서비스를 이용하고 싶어요", leaveDate: "YYYY-MM-DD" },
  { id: 5, reason: "기타", leaveDate: "YYYY-MM-DD" },
  { id: 6, reason: "원하는 서비스가 없어요", leaveDate: "YYYY-MM-DD" },
  { id: 7, reason: "서비스를 사용하기가 어려워요", leaveDate: "YYYY-MM-DD" },
  { id: 8, reason: "서비스에서 불쾌한 경험을 했어요", leaveDate: "YYYY-MM-DD" },
];

const MemberWithdrawManagementPage = () => {
  // --- Table State ---
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // --- Delete Handler ---
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    console.log(`Deleting selected leave requests:`, Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">탈퇴 회원 관리</h1>

      {/* --- Table Controls --- */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm">
          전체 탈퇴 회원 수{" "}
          <span className="font-semibold text-gray-800">000</span>
        </div>
        <div className="flex gap-2">
          <BasicButton
            className={`${BUTTON_DELETE_VARIANT.selected_delete}`}
            onClick={handleDeleteSelected}
            isDisabled={selectedIds.size === 0}
          >
            선택항목 삭제
          </BasicButton>
        </div>
      </div>

      {/* --- Table Area --- */}
      <div className="mt-8">
        <MemberLeaveTable
          data={mockLeaveData}
          selectedIds={selectedIds}
          onSelectChange={setSelectedIds}
        />
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={1} currentPage={1} rangeSize={5} route={""} />
        </div>
      </div>
    </div>
  );
};

export default MemberWithdrawManagementPage;
