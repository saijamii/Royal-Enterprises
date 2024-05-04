import React, { useState, useContext, useEffect } from "react";
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
import { LockOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";
import b1 from "./backvideo12.mp4";
import "../login.css"; // Import your custom CSS for styling
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import { AppContext } from "../AppContext";
import appConfig from "../Config/AppConfig";

function Landing() {
  const context = useContext(AppContext);
  console.log(context, "context");
  const [formSignIn] = Form.useForm();
  // const [formSignUp] = Form.useForm();
  const { Content } = Layout;
  const [signin, setSignIn] = useState(false);
  // const [signup, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

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
        const jwt = response.data.token;
        localStorage.setItem("JWT", jwt);
        console.log(jwt, "jwt");
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

  // const onFinishSignUp = async (values) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://node-kl1g.onrender.com/sigup",
  //       values
  //     );

  //     if (response.data.message === "success") {
  //       notification.success({
  //         placement: "top",
  //         message: "User created successful!",
  //       });
  //       setLoading(false);
  //       setTimeout(() => {
  //         // setSignUp(false);
  //         setSignIn(true);
  //       }, 1200);
  //     } else if (
  //       response.data.message === "Username already exists. Choose another one."
  //     ) {
  //       notification.error({
  //         placement: "top",
  //         message: "Username already exists. Choose another one",
  //       });
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       notification["error"]({
  //         placement: "top",
  //         message: "Something went wrong!",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Sign in Error:", error);
  //     setLoading(false);
  //     notification.error({
  //       placement: "top",
  //       message: "Something went wrong!",
  //     });
  //   }
  // };

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
        <Col span={2}>
          <Button
            className="login-header-signin"
            onClick={() => {
              formSignIn.resetFields();
              // formSignUp.resetFields();
              setSignIn(false);
              // setSignUp(false);
            }}
            style={{ minWidth: "50px" }}
            icon={<HomeOutlined />}
          ></Button>
        </Col>
        <Col span={22}>
          <Row gutter={[8, 8]} style={{ justifyContent: "end", width: "100%" }}>
            <Col></Col>
            <Col>
              <Button
                className="login-header-signin"
                onClick={() => {
                  // formSignUp.resetFields();
                  setSignIn(true);
                  // setSignUp(false);
                }}
              >
                Sign in
              </Button>
            </Col>
            {/* <Col>
              <Button
                className="login-header-signup"
                onClick={() => {
                  formSignIn.resetFields();
                  setSignIn(false);
                  // setSignUp(true);
                }}
              >
                Sign up
              </Button>
            </Col> */}
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
          {signin ? (
            <Row justify="center" align="middle" className="login-container">
              <Col xxl={12} xl={12} lg={16} md={14} sm={14} xs={24}>
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
                        {
                          required: true,
                          message: "Please Enter Your Email!",
                        },
                        {
                          type: "email",
                          message: "The Input Is Not Valid Email",
                        },
                      ]}
                    >
                      <Input
                        className="form-input"
                        placeholder="Please Enter Your Email"
                        prefix={
                          <MailOutlined className="site-form-item-icon" />
                        }
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

                    <span style={{ display: "flex",  justifyContent: "center" }}>
                      {appConfig.appVersion}
                    </span>
                  </Form>
                </Card>
              </Col>
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
