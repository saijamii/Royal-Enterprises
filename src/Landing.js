import React from "react";
import { Col, Row, Button, Layout } from "antd";
import b1 from "../src/Common/backvideo12.mp4";
import "./login.css"; // Import your custom CSS for styling
import { Header } from "antd/es/layout/layout";

function Landing() {
  const { Content } = Layout;

  return (
    <Layout>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={b1} type="video/mp4" />
      </video>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Col span={10}></Col>
        <Col span={14}>
          <Row gutter={[8, 8]} style={{ justifyContent: "end", width: "100%" }}>
            <Col>
              <Button
                className="login-header-signin"
                onClick={() => alert("signin")}
              >
                Sign in
              </Button>
            </Col>
            <Col>
              <Button
                className="login-header-signup"
                onClick={() => alert("signup")}
              >
                Sign up
              </Button>
            </Col>
          </Row>
        </Col>
      </Header>
      <Content
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Col>
          <Col span={12}>
            <div
              className="content"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
              }}
            >
              Welcome
            </div>
          </Col>
        </Col>
      </Content>
    </Layout>
  );
}

export default Landing;
