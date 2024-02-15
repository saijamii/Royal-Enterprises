import React, { useState } from "react";
import { Col, Card, Row, Button, Form, Input, notification } from "antd";
import Loading from "./Common/Loading";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import "./login.css";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values, "values");
    return;
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

  const onFinishFailed = () => {
    notification.error({
      placement: "top",
      duration: 1,
      message: "Submit failed!",
    });
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <Card
          className="login-card"
          style={{
            boxShadow: "0 4px 8px 0 rgba(0, 0, 8, 0.2)",
            backgroundColor: "#c7c8cc",
            border: "transparent",
          }}
        >
          <h1 className="login-title">Create a free account</h1>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email Address"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
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
            <span
              style={{
                cursor: "pointer",
                color: "#4f46e5",
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Back to Login
            </span>
          </Form>
        </Card>
      </Col>
      <Loading enableLoading={loading} />
    </Row>
  );
};

export default Register;
