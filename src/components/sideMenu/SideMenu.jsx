import { MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import  { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Logo from "./Logo";
import { items } from "./MenuItem";
import { useMediaQuery } from "react-responsive";

const SideMenu = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);
  const isMediumScreen = useMediaQuery({ maxWidth: 1024 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const handelClick = (item) => {
    navigate(item.key);
  };
  const handelCollapse = () => {
    setCollapse((prev) => !prev);
    console.log("isSmall scree ");
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
      <MenuFoldOutlined
        className={`absolute right-[-25px] top-[5px] text-2xl text-[#4D44B5] cursor-pointer ${
          isMediumScreen && !isSmallScreen ? "hidden" : ""
        }`}
        onClick={handelCollapse}
      />
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
