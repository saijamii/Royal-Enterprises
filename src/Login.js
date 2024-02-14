import React, { useState } from "react";
import { Col, Card, Row, Button, Form, Input, Space, notification } from "antd";

import Loading from "./Common/Loading";

const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
    } catch (err) {
      console.log("Login Error:", err);
      if (err.code === "UserNotConfirmedException") {
        notification["error"]({
          placement: "top",
          duration: 1,

          message: "Registered user not confirmed.!",
        });
        setLoading(false);
      } else if (err.code === "PasswordResetRequiredException") {
        notification["error"]({
          placement: "top",
          duration: 1,

          message: "Something went wrong.!",
        });
        setLoading(false);
      } else if (err.code === "NotAuthorizedException") {
        setLoading(false);
        notification["error"]({
          placement: "top",
          duration: 1,

          message: "Wrong email or password. Please try again.",
        });
      } else if (err.code === "UserNotFoundException") {
        setLoading(false);
        notification["error"]({
          placement: "top",
          duration: 1,

          message: "User not found.!",
        });
      } else {
        notification["error"]({
          placement: "top",
          duration: 1,

          message: "Something went wrong.!",
        });
        setLoading(false);
      }
    }
  };

  const onFinishFailed = () => {
    notification["error"]({
      placement: "top",
      duration: 1,

      message: "Submit failed!",
    });
  };

  return (
    <Row>
      <Col className="logogo" span={24}>
        <Row>
          <Col
            xxl={{ span: 12 }}
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            style={{ backgroundColor: "#fff", height: "100vh" }}
          >
            <Row
              className="design admin-login-form"
              style={{ justifyContent: "center", marginRight: "10vw" }}
            >
              <Col className="main-logo show-on-mobile-login"></Col>
              <Col>
                <div className="centerItem">
                  <Card className="login-card">
                    <Col>
                      <h1>
                        <b className="font"> Welcome back!</b>
                      </h1>
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="login-form"
                      >
                        <Form.Item
                          name="EmailAddress"
                          label="Email Address"
                          className="login-psrd"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input Email",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Email Address"
                            required
                            className="login-mail font"
                            type="email"
                          />
                        </Form.Item>
                        <Form.Item
                          name="Password"
                          label="Password"
                          className="login-psrd"
                          rules={[
                            {
                              required: true,
                              message: "Please input Password",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Password"
                            className="login-mail font"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Space
                            style={{ width: "100%", justifyContent: "right" }}
                          >
                            <Col span={24}>
                              <Row>
                                {/* <Col>
                            <h3 className="login-forgot">
                              <u>Forgot Password?</u>
                            </h3>
                          </Col> */}
                                <Col
                                  xl={{ span: 24 }}
                                  lg={{ span: 24 }}
                                  md={{ span: 24 }}
                                  xxl={{ span: 24 }}
                                >
                                  <Button
                                    htmlType="submit"
                                    className="login-btn btn-ani btn--svg js-animated-button"
                                    loading={loading}
                                  >
                                    <span class="btn--svg__label"> Login</span>
                                    <svg
                                      class="btn--svg__circle"
                                      width="190"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 60 60"
                                      enable-background="new 0 0 60 60"
                                    >
                                      <circle
                                        class="js-discover-circle"
                                        fill="#FFFFFF"
                                        cx="30"
                                        cy="30"
                                        r="28.7"
                                      ></circle>
                                    </svg>
                                    <svg
                                      class="btn--svg__border"
                                      x="0px"
                                      y="0px"
                                      preserveaspectratio="none"
                                      viewBox="2 29.3 56.9 13.4"
                                      enable-background="new 2 29.3 56.9 13.4"
                                      width="190"
                                    >
                                      <g
                                        class="btn--svg__border--left js-discover-left-border"
                                        id="Calque_2"
                                      >
                                        <path
                                          fill="none"
                                          stroke="#FFF"
                                          stroke-width="0.5"
                                          stroke-miterlimit="1"
                                          d="M30.4,41.9H9c0,0-6.2-0.3-6.2-5.9S9,30.1,9,30.1h21.4"
                                        ></path>
                                      </g>
                                      <g
                                        class="btn--svg__border--right js-discover-right-border"
                                        id="Calque_3"
                                      >
                                        <path
                                          fill="none"
                                          stroke="#FFF"
                                          stroke-width="0.5"
                                          stroke-miterlimit="1"
                                          d="M30.4,41.9h21.5c0,0,6.1-0.4,6.1-5.9s-6-5.9-6-5.9H30.4"
                                        ></path>
                                      </g>
                                    </svg>
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Space>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            className="main-login-image"
            xxl={{ span: 12 }}
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          ></Col>
        </Row>
        <Loading enableLoading={loading} />
      </Col>
    </Row>
  );
};

export default Login;
