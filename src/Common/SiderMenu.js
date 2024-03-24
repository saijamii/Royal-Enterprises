import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import AppRoutes from "../Config/AppRoutes";
import appConfig from "../Config/AppConfig"
const { Sider } = Layout;
function SiderMenu({ siderClosed, onMenuItemClick }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = (itemName) => {
    onMenuItemClick(itemName);
    siderClosed();
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      // collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />
      <Menu
        style={{
          marginTop: "45px",
          position: "fixed",
          width: collapsed ? "80px" : "200px",
        }}
        theme="dark"
        defaultSelectedKeys={
          AppRoutes?.find((e) => e?.path === location.pathname)?.key || ""
        }
      >
        {AppRoutes?.map(
          (item) =>
            item.isShowItem && (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => handleClick(item.title)}
              >
                <span onClick={siderClosed}>{item.title}</span>
                <Link to={item.path} />
              </Menu.Item>
            )
        )}
        {!collapsed && (
          <div className="siderVersion">
            <b>{appConfig.appVersion}</b>
          </div>
        )}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
