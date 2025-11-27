import { useNavigate, useSearchParams } from "react-router-dom";
import PretendardText from "../../atoms/text/PretendardText";

interface TabItem {
  key: string;
  title: string;
}

interface TabProps {
  tabList: TabItem[];
  link?: string;
}

const Tab: React.FC<TabProps> = ({ tabList, link }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 URL에서 `tab` 값 가져오기 (기본값: 첫 번째 탭 key)
  const currentTab = searchParams.get("tab") || tabList[0]?.key;

  // 탭 클릭 핸들러 (기존 queryString 삭제 후 tab 값만 설정)
  const handleTabClick = (key: string) => {
    if (link) {
      navigate(link, { replace: true });
    }
    setSearchParams({ tab: key });
  };

  return (
    <div className="flex gap-[10px] mb-[20px] border-b-1 border-line-200">
      {tabList.map((item) => (
        <PretendardText
          key={item.key}
          className={`
            font-bold text-[18px]
            px-[30px] py-[20px]
            cursor-pointer transition-all
            border-b-[2px]
            ${
              currentTab === item.key
                ? "border-primary text-primary"
                : "border-transparent text-gray-400"
            }`}
          onClick={() => handleTabClick(item.key)}
        >
          {item.title}
        </PretendardText>
      ))}
    </div>
  );
};

export default Tab;
