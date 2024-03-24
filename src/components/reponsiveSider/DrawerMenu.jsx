import { ConfigProvider, Drawer, Menu } from "antd";
import { useToggleButton } from "../configProv/ToggleSideMenuProvider";
import { CloseCircleOutlined } from "@ant-design/icons";
import { items } from "../sideMenu/MenuItem";
import { useNavigate } from "react-router-dom";

const DrawerMenu = () => {
  const { collapse, setCollapse } = useToggleButton();
  const navigate = useNavigate();
  const handelClick = (item) => {
    navigate(item.key);
  };
  return (
    <ConfigProvider theme={{ token: { colorBgMask: "rgba(0, 0, 0, 0.9)" } }}>
      <Drawer
        className=" bg-main_color pr-0 md:hidden"
        bodyStyle={{ padding: "16px 0px 24px 24px" }}
        placement="left"
        width={270}
        onClick={() => setCollapse(false)}
        onClose={() => setCollapse(false)}
        closable={false}
        open={collapse}>
        <CloseCircleOutlined
          className={`fixed right-4 text-3xl text-white  top-10 `}
          onClick={() => setCollapse(false)}
        />

        <Menu
          onClick={handelClick}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className="bg-transparent"
        />
      </Drawer>
    </ConfigProvider>
  );
};
export default DrawerMenu;
