import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Table,
  Popover,
  Row,
  Col,
  Button,
  Popconfirm,
  Input,
  notification,
} from "antd";
import { Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "./Common/Loading";
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
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const context = useContext(AppContext);
  console.log(context, "context");

  useEffect(() => {
    token && getInventoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!token) {
      console.error("No token ");
      notification.warning({
        placement: "top",
        message: "Unauthorized user",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [token]);

  const getInventoryData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://node-kl1g.onrender.com/inventoryProducts",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setUsers(data);
      setLoading(false);
      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setLoading(false);
    }
  };

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
          <div className="app-div">
            <Layout
              style={{
                minHeight: "90vh",
                overflowX: "hidden",
                marginTop: "10vh",
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
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
