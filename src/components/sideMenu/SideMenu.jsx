import { Layout, Menu } from "antd";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router";
import { useToggleButton } from "../configProv/ToggleSideMenuProvider";
import Logo from "./Logo";
import { items } from "./MenuItem";

const SideMenu = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const isMediumScreen = useMediaQuery({ maxWidth: 1024 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const { collapse } = useToggleButton();

  const handelClick = (item) => {
    navigate(item.key);
  };

  return (
    <Sider
      width={"245"}
      breakpoint="lg"
      className={`h-full bg-main_color   relative  max-w-[110px]  ${
        isSmallScreen ? "pl-0" : "pl-6"
      }`}
      trigger={null}
      collapsible
      collapsed={isMediumScreen || isSmallScreen ? true : collapse}
      collapsedWidth={isSmallScreen ? 0 : 110}>
      <Logo />
      <Menu
        onClick={handelClick}
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className="bg-transparent"
      />
    </Sider>
  );
};

export default SideMenu;
