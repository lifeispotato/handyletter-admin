import { route } from "@/routes/route";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";
import Pagination from "@/shared/components/organisms/pagination/Pagination";
import SearchInput from "@/shared/components/organisms/SearchInput";
import { BUTTON_UPDATE_VARIANT } from "@/shared/styles/button";
import { useState } from "react";
import useDormList from "../../hooks/useDormList";
import DormTable from "../organisms/DormTable";

const DormManagement = () => {
  const {
    formData,
    selectedIds,
    dormList,
    goToCreate,
    goToDetail,
    handleSearch,
    searchValue,
    setSearchValue,
    totalPages,
    deleteDorms,
    totalCount,
  } = useDormList();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-[20px] min-w-[1044px]">
        <div className="mb-[10px]">
          <span className="text-system-700 text-[32px] leading-[138%] font-bold tracking-[-0.01px]">
            숙소 관리
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[7px]">
            <span className="font-pretendard text-system-400 text-[14px] leading-[22.75px] font-semibold">
              전체 항목 수
            </span>
            <span className="font-pretendard text-system-700 text-[14px] leading-[22.75px] font-semibold">
              {totalCount || 0}개
            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <form onSubmit={handleSearch}>
              <SearchInput
                placeholder="이름을 입력하세요."
                className="w-[340px]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={handleSearch}
              />
            </form>
            <BasicButton
              children="추가하기"
              className={BUTTON_UPDATE_VARIANT.create}
              onClick={() => {
                goToCreate();
              }}
            />
          </div>
        </div>
      </div>
      <div className="border-system-200 bg-white">
        <DormTable
          dormList={dormList || []}
          onNavigate={goToDetail}
        />
      </div>
      <div className="mt-[40px] mb-[113px] flex justify-center">
        <Pagination
          route={route.dormList}
          totalPages={totalPages}
          currentPage={formData.page || 1}
          rangeSize={5}
        />
      </div>
      <ConfirmDialogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteDorms();
          setIsDeleteModalOpen(false);
        }}
        title={`선택한 ${selectedIds.length}개의 숙소를 삭제하시겠습니까?`}
        description="삭제된 데이터는 복구가 불가합니다."
        variant="delete"
      />
    </div>
  );
};

export default DormManagement;

