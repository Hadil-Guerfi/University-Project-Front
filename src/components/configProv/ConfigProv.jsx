import { ConfigProvider, Layout } from "antd";
import { Navigate } from "react-router-dom";
import { themeObj } from "../../Utils/theme/theme";
import { useAuth } from "../../context/auth/authProvider";
import PageContents from "../../pages/pageContents/PageContents";
import SideMenu from "../sideMenu/SideMenu";
import SideMenuToggleButton from "./SideMenuToggleButton";
import ToggleSideMenuProvider from "./ToggleSideMenuProvider";
import DrawerMenu from "../reponsiveSider/DrawerMenu";
import { useMediaQuery } from "react-responsive";

function ConfigProv() {
  const { loggedIn } = useAuth();
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return loggedIn ? (
    <ConfigProvider theme={themeObj}>
      <Layout hasSider style={{ height: "100vh" }} className="bg-transparent">
        <ToggleSideMenuProvider>
          <SideMenuToggleButton />
          <SideMenu />
          {isSmallScreen ? <DrawerMenu /> : null}{" "}
        </ToggleSideMenuProvider>
        <PageContents />
      </Layout>
    </ConfigProvider>
  ) : (
    <Navigate to="/login" />
  );
}

export default ConfigProv;
