import { Layout } from "antd";
import React from "react";
import Header from "../../components/header/Header";
import AppRoute from "./AppRoute";
const PageContents = () => {
  const { Content } = Layout;
  return (
    <Content className="bg-[#F3F4FF] p-9">
      <Header />
      <AppRoute />
    </Content>
  );
};

export default PageContents;
