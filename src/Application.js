import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import { AppContext } from "./AppContext";
import SiderMenu from "./Common/SiderMenu";
import CommonHeader from "./Common/CommonHeader";
import AppRoutes from "./Config/AppRoutes";

export default function Application() {
  const [menuVisable, setMenuVisable] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  const siderClosed = () => {
    setMenuVisable(false);
  };
  const siderOpened = () => {
    setMenuVisable(true);
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const { Header, Content } = Layout;

  const context = useContext(AppContext);
  console.log(context, "context");

  return (
    <Layout hasSider>
      <SiderMenu
        className="show-on-desktop"
        siderOpened={siderOpened}
        siderClosed={siderClosed}
        menuVisable={menuVisable}
        onMenuItemClick={handleMenuItemClick}
      />
      <Layout>
        <Header
          className="app-hed topheight"
          style={{
            position: "fixed",
            width: "100%",
            zIndex: "1",
            backgroundColor: "white",
          }}
        >
          <CommonHeader
            activeMenu={activeMenu}
            siderOpened={siderOpened}
            siderClosed={siderClosed}
            menuVisable={menuVisable}
          />
        </Header>
        <Content className="mainlayout">
          style={{ height: "100%" }}
          <Layout
            style={{
              minHeight: "100vh",
              overflowX: "hidden",
            }}
          >
            <Routes>
              {AppRoutes?.map(
                (item) =>
                  item.title && (
                    <Route
                      path={item.path}
                      key={item.key}
                      element={<item.component />}
                    />
                  )
              )}
            </Routes>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
