import React from "react";
// import { Layout, Button, Col, Row } from "antd";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Application from "./Application";
import "./App.css";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Register from "./Register";
import Users from "./Users";

// const { Header } = Layout;

function App() {
  return (
    <div style={{ height: "100vh", overflowX: "hidden" }}>
      <>
        {/* <Header style={{ position: "fixed", width: "100%", zIndex: "100" }}>
          <Col span={24}>
            <div style={{ backgroundColor: "#8d99ae", height: "60px" }}>
              <Col span={24}>
                <Row style={{ justifyContent: "right" }}>
                  <Col span={3} id="nav-links-container">
                    <Button
                      style={{
                        backgroundColor: "#8d99ae",
                        color: "#000",
                        border: "0px",
                        fontWeight: "600",
                        fontSize: "20px",
                        marginTop: "10px",
                      }}
                      onClick={() => (window.location.href = "/dashboard")}
                    >
                      DASHBOARD
                    </Button>
                  </Col>
                  <Col span={2} id="nav-links-container">
                    <Button
                      style={{
                        backgroundColor: "#8d99ae",
                        color: "#000",
                        border: "0px",
                        fontSize: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                      onClick={() => (window.location.href = "/homePage")}
                    >
                      HOME
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{
                        backgroundColor: "#8d99ae",
                        color: "#000",
                        border: "0px",
                        fontSize: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                      onClick={() => (window.location.href = "/usersTable")}
                    >
                      USERS
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{
                        backgroundColor: "#8d99ae",
                        color: "#000",
                        border: "0px",
                        fontSize: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                      onClick={() => (window.location.href = "/demoApi")}
                    >
                      Demo Data
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{
                        backgroundColor: "#8d99ae",
                        color: "#000",
                        border: "0px",
                        fontSize: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                      onClick={() => (window.location.href = "/demoExcel")}
                    >
                      Demo Employee Data
                    </Button>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
        </Header> */}

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/inventory-mangement" element={<Login />} /> */}
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Application />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/getProductDetail/:id" element={<ProductDetail />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
