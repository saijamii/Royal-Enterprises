import React, { useState } from "react";
import { Col, Card, Row, Button, Form, Input, notification } from "antd";
import Loading from "./Common/Loading";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import "./login.css";

const Register = () => {
  const [formSignUp] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values, "values");
    // return;
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
        formSignUp.resetFields();
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
    <Col span={24}>
      <Row justify="center" align="middle" className="login-container">
        <Card
          className="login-card"
          style={{
            boxShadow: "0 4px 8px 0 rgba(0, 0, 8, 0.2)",
            backgroundColor: "#c7c8cc",
            border: "transparent",
          }}
        >
          {/* <h1 className="login-title">Create account</h1> */}
          <Form
            form={formSignUp}
            onFinish={onFinish}
            autoComplete="off"
            className="login-form"
          >
            <Col>
              <span>
                First Name<span style={{ color: "red" }}>*</span>
              </span>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" className="form-input" />
              </Form.Item>
            </Col>

            <Col>
              <span>
                Last Name<span style={{ color: "red" }}>*</span>
              </span>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Input Last Name" className="form-input" />
              </Form.Item>
            </Col>

            <Col>
              <span>
                Email<span style={{ color: "red" }}>*</span>
              </span>
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
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
            </Col>

            <Col>
              <span className="title_changes ">
                Password<span style={{ color: "red" }}>*</span>
              </span>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%#^*?&+=_-])[A-Za-z\d$@$!%*?&]/,
                    message:
                      "At least one  upperCase letter, At least one number and one special character!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  autoComplete="new-password"
                  className="form-input"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
            </Col>

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
          </Form>
        </Card>

        <Loading enableLoading={loading} />
      </Row>
    </Col>
  );
};

export default Register;
