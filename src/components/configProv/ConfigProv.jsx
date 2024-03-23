import { ConfigProvider, Layout } from "antd";
import { Navigate } from "react-router-dom";
import { themeObj } from "../../Utils/theme/theme";
import { useAuth } from "../../context/auth/authProvider";
import SideMenu from "../sideMenu/SideMenu";
import PageContents from "../../pages/pageContents/PageContents";

function ConfigProv() {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <ConfigProvider theme={themeObj}>
      <Layout hasSider style={{ height: "100vh" }} className="bg-transparent">
        <SideMenu />
        <PageContents />
      </Layout>
    </ConfigProvider>
  ) : (
    <Navigate to="/login" />
  );
}

export default ConfigProv;
