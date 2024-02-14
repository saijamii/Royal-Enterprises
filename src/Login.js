import React, { useState } from "react";
import { Col, Card, Row, Button, Form, Input, notification } from "antd";
import Loading from "./Common/Loading";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css"; // Import your custom CSS for styling

const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values,"valeus")
    return
    try {
      setLoading(true);
      // Your login logic here
    } catch (err) {
      console.log("Login Error:", err);
      setLoading(false);
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
        <Card className="login-card">
          <h1 className="login-title">Welcome back!</h1>
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
          </Form>
        </Card>
      </Col>
      <Loading enableLoading={loading} />
    </Row>
  );
};

export default Login;
