import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Popover, Row, Col, Button, Popconfirm, Input } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Loading from "./Common/Loading";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://node-kl1g.onrender.com/users", {
        headers: {
          authorization: token,
        },
      });
      setUsers(data);
      setLoading(false);
      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching Users:", error);
      setLoading(false);
    }
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <Col span={24} className="fireFox">
        <Row justify="space-between" gutter={[16, 16]}>
          <Col span={12}>
            <div>
              <>
                <h2
                  style={{
                    fontSize: "30px",
                    marginLeft: "10px",
                  }}
                >
                  USERS{" "}
                  <span style={{ fontSize: "20px", color: "#fe6101" }}>
                    ({users.length})
                  </span>
                </h2>
              </>
            </div>
          </Col>

          <Col span={12}>
            <Row gutter={[16, 16]} justify="end">
              <Col>
                <Input
                  style={{ marginTop: "25px" }}
                  placeholder="Search..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Button
                  style={{
                    minWidth: "160px",
                    borderRadius: "6px",
                    float: "right",
                    height: "36px",
                    marginRight: "12px",
                    marginTop: "22px",
                    backgroundColor: "#0050b3",
                    color: "#fff",
                    border: "#fe6101",
                  }}
                  onClick={() => (window.location.href = "/addProduct")}
                >
                  <PlusOutlined />
                  Add Product
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Table
        dataSource={
          search.length > 0
            ? users.filter(
                (e) =>
                  e.firstName?.indexOf(search) > -1 ||
                  e.firstName?.toUpperCase()?.indexOf(search) > -1 ||
                  e.firstName?.toLowerCase()?.indexOf(search) > -1 ||
                  e.lastName?.indexOf(search) > -1 ||
                  e.lastName?.toUpperCase()?.indexOf(search) > -1 ||
                  e.lastName?.toLowerCase()?.indexOf(search) > -1
              )
            : users
        }
        columns={[
          {
            title: "userId",
            dataIndex: "userId",
          },
          {
            title: "title",
            dataIndex: "title",
          },
        ]}
        style={{ overflow: "auto" }}
      />
      <Loading enableLoading={loading} />
    </div>
  );
}

export default Users;
