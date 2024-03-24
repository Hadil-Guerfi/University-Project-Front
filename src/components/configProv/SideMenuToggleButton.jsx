import { MenuFoldOutlined } from "@ant-design/icons";
import { useToggleButton } from "./ToggleSideMenuProvider";

const SideMenuToggleButton = () => {
  const { collapse, handelCollapse } = useToggleButton();
  return (
    <MenuFoldOutlined
      className={`absolute ${
        collapse ? "left-[111px]" : "left-[245px]"
      } top-[5px] text-2xl text-[#4D44B5] cursor-pointer max-md:left-[3px] md:max-lg:hidden `}
      onClick={handelCollapse}
    />
  );
};

export default SideMenuToggleButton;
