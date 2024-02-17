import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Layout,
  Card,
  Form,
  notification,
  Input,
} from "antd";
import Loading from "./Common/Loading";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import b1 from "../src/Common/backvideo12.mp4";
import "./login.css"; // Import your custom CSS for styling
import { Header } from "antd/es/layout/layout";
import axios from "axios";

function Landing() {
  const [formSignIn] = Form.useForm();
  const [formSignUp] = Form.useForm();
  const { Content } = Layout;
  const [signin, setSignIn] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinishSignIn = async (values) => {
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

  const onFinishSignUp = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://node-kl1g.onrender.com/sigup",
        values
      );

      if (response.data.message === "success") {
        notification.success({
          placement: "top",
          message: "User created successful!",
        });
        setLoading(false);
        setTimeout(() => {
          setSignUp(false);
          setSignIn(true);
        }, 1200);
      } else if (
        response.data.message === "Username already exists. Choose another one."
      ) {
        notification.error({
          placement: "top",
          message: "Username already exists. Choose another one",
        });
        setLoading(false);
      } else {
        setLoading(false);
        notification["error"]({
          placement: "top",
          message: "Something went wrong!",
        });
      }
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
                onClick={() => {
                  formSignUp.resetFields();
                  setSignIn(true);
                  setSignUp(false);
                }}
              >
                Sign in
              </Button>
            </Col>
            <Col>
              <Button
                className="login-header-signup"
                onClick={() => {
                  formSignIn.resetFields();
                  setSignIn(false);
                  setSignUp(true);
                }}
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
          {signin && !signup ? (
            <Row justify="center" align="middle" className="login-container">
              <Col span={12}>
                <Card
                  className="login-card"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 8, 0.2)",
                    backgroundColor: "#c7c8cc",
                    border: "transparent",
                  }}
                >
                  <h1 className="login-title">Welcome back!</h1>
                  <Form
                    form={formSignIn}
                    onFinish={onFinishSignIn}
                    autoComplete="off"
                    className="login-form"
                  >
                    <Form.Item
                      name="userId"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        // { type: "email", message: "Invalid email format!" },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email Address"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                      >
                        Login
                      </Button>
                    </Form.Item>
                    Don't have an account?{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#4f46e5",
                      }}
                      onClick={() => {
                        formSignIn.resetFields();
                        setSignIn(false);
                        setSignUp(true);
                      }}
                    >
                      Signup
                    </span>
                  </Form>
                </Card>
              </Col>
              <Loading enableLoading={loading} />
            </Row>
          ) : !signin && signup ? (
            <Row justify="center" align="middle" className="login-container">
              <Col span={12}>
                <Card
                  className="login-card"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 8, 0.2)",
                    backgroundColor: "#c7c8cc",
                    border: "transparent",
                  }}
                >
                  <h1 className="login-title">Create account</h1>
                  <Form
                    form={formSignUp}
                    onFinish={onFinishSignUp}
                    autoComplete="off"
                    className="login-form"
                  >
                    <Form.Item
                      name="userId"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        // { type: "email", message: "Invalid email format!" },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email Address"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                      >
                        Submit Details
                      </Button>
                    </Form.Item>
                    <Col>
                      <Row justify={"space-between"}>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "#4f46e5",
                          }}
                          onClick={() => {
                            formSignIn.resetFields();
                            formSignUp.resetFields();
                            setSignIn(false);
                            setSignUp(false);
                          }}
                        >
                          Home
                        </span>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "#4f46e5",
                          }}
                          onClick={() => {
                            setSignIn(true);
                            setSignUp(false);
                          }}
                        >
                          Back to Login
                        </span>
                      </Row>
                    </Col>
                  </Form>
                </Card>
              </Col>
              <Loading enableLoading={loading} />
            </Row>
          ) : (
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
          )}
        </Col>
      </Content>
    </Layout>
  );
}

export default Landing;
