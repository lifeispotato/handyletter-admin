import React from "react";
import useHomeQuickMenu from "../../hooks/useHomeQuickMenu";
import HomeQuickMenuItem from "../molecules/HomeQuickMenuItem";

const HomeQuickMenu = () => {
  const { moveToPage, ROUTE_LIST } = useHomeQuickMenu();

  return (
    <div className="w-[1044px] h-fit flex flex-col gap-[20px]">
      <div className="flex items-center gap-[10px] !font-bold !text-[16px] text-gray-700">
        퀵메뉴
      </div>

      <div className="flex flex-wrap gap-[21px]">
        {ROUTE_LIST.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.subMenu
                .filter((subItem) => subItem.isView !== false)
                .map((subItem, subIndex) => (
                  <HomeQuickMenuItem
                    key={subIndex}
                    tabTitle={item.title}
                    title={subItem.title}
                    onClick={() => {
                      moveToPage(subItem.route);
                    }}
                  />
                ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HomeQuickMenu;
