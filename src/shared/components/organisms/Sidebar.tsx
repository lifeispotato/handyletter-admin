import BasicText from "../atoms/text/BasicText"; // ⚠️ You must copy this file
import IconImg from "../atoms/image/IconImg"; // ⚠️ You must copy this file
import { TEXT_BASE_VARIANT } from "../../styles/text"; // ⚠️ You must copy this file
import { useSidebar } from "../../hooks/useSidebar"; // ✅ This now points to your new hook

const Sidebar = () => {
  const {
    openMenus,
    selectedSubMenu,
    selectedMainMenu,
    filteredMenu,
    handleMainMenuClick,
    handleSubMenuClick,
  } = useSidebar();

  return (
    <aside className="bg-sidebar fixed top-0 left-0 z-40 h-screen w-[265px] flex flex-col">
      <div className="bg-primary flex w-full p-6 text-[16px] font-bold">
        {/* TODO: Replace with your new logo */}
        아키스토리
      </div>
      {/* Scrollable menu area */}
      <div className="sidebar-content h-full flex-1 ">
        <nav className="flex flex-col">
          {filteredMenu.map((menu) => (
            <div key={menu.title}>
              {/* Main Menu */}
              <div
                className="group hover:bg-sidebar-sub-menu-hover flex cursor-pointer items-center justify-between p-[25px] text-white transition-colors"
                onClick={() => handleMainMenuClick(menu)}
              >
                <BasicText
                  variant="body"
                  children={menu.title}
                  className={`${
                    TEXT_BASE_VARIANT.body
                  } text-[16px] font-medium transition-colors ${
                    selectedMainMenu === menu.title
                      ? "text-primary"
                      : "group-hover:text-primary text-white"
                  }`}
                />

                {/* Show icon only if submenus exist */}
                {menu.subMenus && menu.subMenus.length > 0 && (
                  <div className="relative h-[12px] w-[12px]">
                    {/* White icon */}
                    <IconImg
                      src={openMenus[menu.title] ? "minus" : "plus"} // ⚠️ You must provide these icons
                      alt={openMenus[menu.title] ? "Close" : "Open"}
                      className={`absolute h-[12px] w-[12px] transition-opacity duration-200 ${
                        selectedMainMenu === menu.title
                          ? "opacity-0"
                          : "opacity-100 group-hover:opacity-0"
                      }`}
                    />
                    {/* Blue (primary) icon */}
                    <IconImg
                      src={
                        openMenus[menu.title] ? "minus" : "plus" // ⚠️ You must provide these icons
                      }
                      alt={openMenus[menu.title] ? "Close" : "Open"}
                      className={`absolute h-[12px] w-[12px] transition-opacity duration-200 ${
                        selectedMainMenu === menu.title
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Sub Menu */}
              {menu.subMenus && (
                <div
                  className={`bg-sidebar transition-all overflow-y-auto duration-300 ease-in-out ${
                    openMenus[menu.title]
                      ? "max-h-[400px] opacity-100" // You can increase max-h if needed
                      : "max-h-0 opacity-0"
                  } scrollbar-thin
    scrollbar-thumb-gray-400
    scrollbar-track-gray-100
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-sidebar
    [&::-webkit-scrollbar-thumb]:bg-primary
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
    `}
                >
                  <div className="flex flex-col gap-[4px] px-[20px] py-[10px]">
                    {menu.subMenus.map((subMenu, index) => {
                      const subMenuKey = `${menu.title}-${index}`;
                      const isSelected = selectedSubMenu === subMenuKey;

                      return (
                        <div
                          key={index}
                          onClick={() =>
                            handleSubMenuClick(subMenu, menu.title, index)
                          }
                          className={`flex h-[50px] w-[225px] cursor-pointer items-center gap-[10px] rounded-[8px] px-[25px] py-[14px] transition-all duration-200 ${
                            isSelected
                              ? "bg-sidebar-sub-menu-selected text-white"
                              : "text-system-300 hover:bg-sidebar-sub-menu-hover hover:text-white"
                          }`}
                        >
                          <BasicText
                            variant="body"
                            children={subMenu.title}
                            className={`${TEXT_BASE_VARIANT.body} text-[14px] font-normal `}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Scrollbar styles */}
      <div>
        <style>
          {`
      .sidebar-content::-webkit-scrollbar {
       width: 6px;
      }
      .sidebar-content::-webkit-scrollbar-thumb {
       background: rgba(255, 255, 255, 0.3);
       border-radius: 3px;
       min-height: 20px;
      }
      .sidebar-content::-webkit-scrollbar-thumb:hover {
       background: rgba(255, 255, 255, 0.5);
      }
     `}
        </style>
      </div>
    </aside>
  );
};

export default Sidebar;
