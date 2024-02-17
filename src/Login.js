import React, { useState } from "react";
import {
  Col,
  Card,
  Row,
  Button,
  Form,
  Input,
  notification,
  Layout,
} from "antd";
import Loading from "./Common/Loading";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import b1 from "../src/Common/backvideo12.mp4";
import axios from "axios";
import "./login.css"; // Import your custom CSS for styling
import { Header } from "antd/es/layout/layout";

const Login = () => {
  const { Content } = Layout;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values, "values");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://node-kl1g.onrender.com/sigin",
        values
      );

      if (response.data.message === "success") {
        notification.success({
          placement: "top",
          message: "Sign in successful!",
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log(token, "token");
        setTimeout(() => {
          window.location.href = "/home";
        }, 1200);
      } else if (response.data.message === "Invalid username or password.") {
        notification.error({
          placement: "top",
          message: "Invalid username or password!",
        });
      } else {
        setLoading(false);
        notification["error"]({
          placement: "top",
          message: "Something went wrong!",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Sign in Error:", error);
      setLoading(false);
      notification.error({
        placement: "top",
        message: "Something went wrong!",
      });
    }
  };

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
};

export default Login;
