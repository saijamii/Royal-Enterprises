import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Popover, Row, Col, Button, Popconfirm, Input } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
export default function Application() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getInventoryData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/deleteProduct/${id}`);
      console.log(response, "response");
      alert("Delete successful");
      getInventoryData();
    } catch (error) {
      alert("Something went wrong");
      console.error("There was an error!", error);
    }
  };

  const colums = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",

      onCell: (record) => ({
        onClick: () =>
          // eslint-disable-next-line no-useless-concat
          (window.location.href = "/getProductDetail/" + `${record?._id}`),
      }),
      render: (firstName) => {
        return (
          <div style={{ textTransform: "capitalize", cursor: "pointer" }}>
            {firstName}
          </div>
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (lastName) => {
        return <div style={{ textTransform: "capitalize" }}>{lastName}</div>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },
    {
      title: "Comments",
      dataIndex: "comments",
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
                        handleDeleteProduct(_id);
                      }}
                    >
                      <span>
                        <DeleteOutlined className="mddelete" /> Delete
                      </span>
                    </Popconfirm>
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    className="popoveroptions"
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                      width: "90px",
                    }}
                  >
                    <span>
                      <DeleteOutlined className="mddelete" /> Edit
                    </span>
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

  const getInventoryData = async () => {
    const { data } = await axios.get("/inventoryProducts");
    setUsers(data);
    console.log(data, "data");
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
        columns={colums}
      />
    </div>
  );
}
