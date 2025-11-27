import BasicButton from "@/shared/components/atoms/button/BasicButton";
import SearchInput from "@/shared/components/organisms/SearchInput";
import {
  BUTTON_DELETE_VARIANT,
  BUTTON_UPDATE_VARIANT,
} from "@/shared/styles/button";
import Pagination from "@/shared/components/organisms/pagination/Pagination";
import { route } from "@/routes/route";
import FaqTable from "../organisms/FaqTable";
import ConfirmDialogModal from "@/shared/components/atoms/modal/ConfirmDialogModal";
import { useState } from "react";
import useFaqList from "../../hooks/useFaqList";

const FaqList = () => {
  const {
    formData,
    selectedIds,
    faqList,
    handleSelectAll,
    handleSelectItem,
    goToCreate,
    goToDetail,
    handleSearch,
    searchValue,
    setSearchValue,
    totalPages,
    deleteFaqs,
    totalCount,
  } = useFaqList();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-[20px] w-[1044px]">
        <div className="mb-[10px]">
          <span className="text-system-700 text-[32px] leading-[138%] font-bold tracking-[-0.01px]">
            FAQ 관리
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[7px]">
            <span className="font-pretendard text-system-400 text-[14px] leading-[22.75px] font-semibold">
              전체 항목 수
            </span>
            <span className="font-pretendard text-system-700 text-[14px] leading-[22.75px] font-semibold">
              {totalCount}개
            </span>
          </div>
          <div className="flex items-center gap-[11px]">
            <form onSubmit={handleSearch}>
              <SearchInput
                placeholder="검색어를 검색하세요"
                className="w-[340px]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={handleSearch}
              />
            </form>
            <BasicButton
              children="선택항목 삭제"
              className={BUTTON_DELETE_VARIANT.selected_delete}
              onClick={() => setIsDeleteModalOpen(true)}
              isDisabled={selectedIds.length === 0}
            />
            <BasicButton
              children="추가"
              className={BUTTON_UPDATE_VARIANT.create}
              onClick={goToCreate}
            />
          </div>
        </div>
      </div>
      <div className="border-system-200 bg-white">
        <FaqTable
          faqList={faqList || []}
          selectedIds={selectedIds}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onNavigate={goToDetail}
        />
      </div>
      <div className="mt-[40px] mb-[113px] flex justify-center">
        <Pagination
          route={route.faqList}
          totalPages={totalPages}
          currentPage={formData.page || 1}
          rangeSize={5}
        />
      </div>
      <ConfirmDialogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteFaqs();
          setIsDeleteModalOpen(false);
        }}
        title={`선택한 ${selectedIds.length}개의 FAQ를 삭제하시겠습니까?`}
        description="삭제된 데이터는 복구가 불가합니다."
        variant="delete"
      />
    </div>
  );
};

export default FaqList;
