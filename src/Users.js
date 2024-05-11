import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  Popover,
  Popconfirm,
  notification,
} from "antd";
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
  const token = localStorage.getItem("JWT");

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

  const handleDeleteUser = async (id) => {
    console.log(id, "id");
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://node-kl1g.onrender.com/deleteUser/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response, "response");
      if (response.data.message === "User Deleted Successfully") {
        notification.success({
          placement: "top",
          message: "User Deleted successful!",
        });
        setLoading(false);
        getUsers();
      } else {
        notification.error({
          placement: "top",
          message: `Something went wrong: ${response.data.message}`,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        placement: "top",
        message: `There was an error!`,
      });
      console.error("There was an error!", error);
    }
  };

  const columns = [
    {
      title: "FIRST NAME",
      dataIndex: "firstName",
    },
    {
      title: "LAST NAME",
      dataIndex: "lastName",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
    },
    {
      title: "EMAIL",
      dataIndex: "userId",
    },

    {
      width: "60px",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <Popover
            placement="left"
            trigger="hover"
            content={
              <Row className="popovergrid">
                <Col span={24}>
                  <Button
                    className="popoveroptions"
                    style={{ backgroundColor: "red", color: "#fff" }}
                  >
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      showArrow={true}
                      onConfirm={() => {
                        handleDeleteUser(_id);
                      }}
                    >
                      <span>
                        <DeleteOutlined className="mddelete" /> Delete
                      </span>
                    </Popconfirm>
                  </Button>
                </Col>
              </Row>
            }
          >
            <EllipsisOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
          </Popover>
        );
      },
    },
  ];

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
                  onClick={() => (window.location.href = "/addUser")}
                >
                  <PlusOutlined />
                  Add User
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
        columns={columns}
        style={{ overflow: "auto" }}
      />
      <Loading enableLoading={loading} />
    </div>
  );
}

export default Users;
