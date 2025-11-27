import { useNavigate, useLocation, NavigateOptions } from "react-router-dom";
import PretendardText from "../../atoms/text/PretendardText";

interface TabItem {
  title: string;
  link: string;
  state?: NavigateOptions;
}

interface NavigateTabProps {
  tabList: TabItem[];
}

const NavigateTab: React.FC<NavigateTabProps> = ({ tabList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleTabClick = (link: string, params?: NavigateOptions) => {
    navigate(link, { state: params });
  };

  return (
    <div className="flex gap-[10px] mb-[20px] border-b-1 border-line-200">
      {tabList.map((item) => (
        <PretendardText
          key={item.link}
          className={`
            font-bold text-[18px]
            px-[30px] py-[20px]
            cursor-pointer transition-all
            border-b-[2px]
            ${
              currentPath === item.link
                ? "border-primary text-primary"
                : "border-transparent text-gray-400"
            }`}
          onClick={() => handleTabClick(item.link, item?.state)}
        >
          {item.title}
        </PretendardText>
      ))}
    </div>
  );
};

export default NavigateTab;
