import React, { useEffect, useState } from "react";
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
import {
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Loading from "./Common/Loading";

export default function Application() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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

  const handleDeleteMoiveRecord = async (id) => {
    console.log(id, "id");
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://node-kl1g.onrender.com/deleteProduct/${id}`
      );
      console.log(response, "response");
      if (response.data.message === "User Deleted Successfully") {
        alert("Delete successful");
        setLoading(false);
        getInventoryData();
      } else {
        alert("Something went wrong: " + response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.error("There was an error!", error);
    }
  };

  const colums = [
    {
      title: "productName",
      dataIndex: "productName",
    },
    {
      title: "brand",
      dataIndex: "brand",
    },
    {
      title: "finish",
      dataIndex: "finish",
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
                {/* <Col span={24}>
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
                </Col> */}
              </Row>
            }
          >
            <EllipsisOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
          </Popover>
        );
      },
    },
  ];

  console.log(colums);

  const moiveColumns = [
    {
      title: "movie",
      dataIndex: "movie",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "genres",
      dataIndex: "genres",
    },
    {
      title: "year",
      dataIndex: "year",
    },
    {
      width: "60px",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "5px", fontSize: "25px" }}>
              <Popover
                placement="left"
                trigger="hover"
                content={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {" "}
                    <Button
                      style={{ height: "35px" }}
                      className="edit-btn"
                      onClick={() =>
                        (window.location.href = `/getProductDetail/${_id}`)
                      }
                    >
                      <EllipsisOutlined />
                      Edit
                    </Button>
                    <Popconfirm
                      placement="left"
                      title="Are you sure?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        handleDeleteMoiveRecord(_id);
                      }}
                    >
                      <Button
                        className="delete-header-btn"
                        style={{
                          width: "100%",
                          marginTop: "3px",
                        }}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                }
              >
                <EllipsisOutlined style={{ fontSize: "30px", color: "grey" }} />
              </Popover>
            </div>
          </Row>
        );
      },
    },
  ];

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
        columns={moiveColumns}
        style={{ overflow: "auto" }}
      />
      <Loading enableLoading={loading} />
    </div>
  );
}
