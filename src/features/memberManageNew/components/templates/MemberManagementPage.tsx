import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BasicButton from "@/shared/components/atoms/button/BasicButton";
// --- DELETED: Dropdown is no longer used ---
// import Dropdown from "@/shared/components/organisms/Dropdown";
// --- EDITED: Replaced SearchInput with BasicInput ---
import Pagination from "@/shared/components/organisms/pagination/Pagination";

import MemberListTable from "@/features/memberManageNew/components/organisms/MemberListTable";
import type { MockMember } from "@/features/memberManageNew/components/organisms/MemberListTable";
import { route } from "@/routes/route";
// --- EDITED: Replaced TableDropdown with DropdownButton ---
import SearchInput from "@/shared/components/organisms/SearchInput";
// --- CORRECTED IMPORTS from your button.ts ---
import { BUTTON_DELETE_VARIANT } from "@/shared/styles/button";

// --- Mock Data for the Table ---
// TODO: Replace this with data from useQuery
const mockData: MockMember[] = [
  {
    id: 1,
    hospitalName: "병원명 나오는 자리", // 'type' removed, 'hospitalName' added
    name: "홍길동",
    phone: "010-0000-0000",
    email: "ooo@klang.co.kr", // 'status' removed
  },
  {
    id: 2,
    hospitalName: "두번째 병원 이름", // 'type' removed, 'hospitalName' added
    name: "홍길동",
    phone: "010-0000-0000",
    email: "ooo@klang.co.kr", // 'status' removed
  },
  {
    id: 3,
    hospitalName: "병원명 나오는 자리", // 'type' removed, 'hospitalName' added
    name: "홍길동",
    phone: "010-0000-0000",
    email: "ooo@klang.co.kr", // 'status' removed
  },
  {
    id: 4,
    hospitalName: "네번째 병원", // 'type' removed, 'hospitalName' added
    name: "홍길동",
    phone: "010-0000-0000",
    email: "ooo@klang.co.kr", // 'status' removed
  },
];
// ---

// ---
export interface GetMemberListQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  orderBy?: "ASC" | "DESC";
  cursor?: number;
  keyword?: string;
  searchField?: string;
}
const MemberManagementPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // --- Table State ---
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [formData, setFormData] = useState<GetMemberListQueryParams>({
    keyword: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    size: 10,
    sort: "id",
    orderBy: "ASC",
  });
  const [searchValue, setSearchValue] = useState(formData.keyword);

  const handleViewDetails = (id: number) => {
    navigate(`${route.memberDetail}/${id}`);
  };
  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const trimmedSearch = searchValue?.trim();

    setFormData((prev) => ({
      ...prev,
      keyword: trimmedSearch,
      page: 1,
    }));

    const newParams = new URLSearchParams(searchParams);
    if (trimmedSearch) {
      newParams.set("search", trimmedSearch);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">회원 정보</h1>

      {/* --- Table Area --- */}
      <div className="mt-8">
        {/* Table Controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm">
            전체 회원 수{" "}
            <span className="font-semibold text-gray-800">000</span>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-[11px]">
              <form onSubmit={handleSearch}>
                <SearchInput
                  placeholder="닉네임, 이메일을 입력하세요"
                  className="w-[340px]"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={handleSearch}
                />
              </form>
            </div>
            <BasicButton
              // Use "selected_delete" which is white w/ gray border
              className={`${BUTTON_DELETE_VARIANT.selected_delete}`}
            >
              삭제
            </BasicButton>
          </div>
        </div>

        {/* Table Component */}
        <MemberListTable
          data={mockData}
          selectedIds={selectedIds}
          onSelectChange={setSelectedIds}
          onViewDetails={handleViewDetails}
        />

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={1} currentPage={1} rangeSize={5} route={""} />
        </div>
      </div>
    </div>
  );
};

export default MemberManagementPage;
