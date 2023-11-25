import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TreeSelect,
  Col,
  Row,
  Card,
} from "antd";

const { TextArea } = Input;

export default function AddProduct() {
  const [dob, setDob] = useState("");
  const onResetValues = () => {
    document.getElementById("myForm").reset();
  };

  const onSubmitForm = async (values) => {
    const response = await axios.post("/addInventory", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender,
      designation: values.designation,
      phone: values.phone,
      dob: dob,
      comments: values.comments,
      dataType: "form",
      createdAt: Date.now(),
    });
    // console.log(response, "response");
    // return;
    if (response.status === 200) {
      alert("Your Response is Saved!!!!!!!!!");
      onResetValues();
      window.location.href = "/";
    } else {
      alert("Data Not Submited");
    }
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Col span={22} style={{ marginTop: "20px" }}>
        <Row justify={"end"}>
          <Button
            style={{ backgroundColor: "#0958d9", color: "#fff" }}
            onClick={() => window.history.back(-1)}
          >
            BACK
          </Button>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col span={8}></Col>

          <Col span={8} style={{ marginTop: "50px" }}>
            <Card style={{ boxShadow: "  0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onSubmitForm}
                id="myForm"
              >
                <Form.Item
                  name="firstName"
                  label="First Name "
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstName",
                    },
                  ]}
                >
                  <Input placeholder="firstName" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name "
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastName",
                    },
                  ]}
                >
                  <Input placeholder="lastName" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email ID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email",
                    },
                  ]}
                >
                  <Input type="email" placeholder="email" />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please input your gender",
                    },
                  ]}
                >
                  <TreeSelect
                    treeData={[
                      {
                        title: "Male",
                        value: "male",
                      },
                      {
                        title: "FeMale",
                        value: "female",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="designation"
                  label="Designation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your designation",
                    },
                  ]}
                >
                  <TreeSelect
                    treeData={[
                      {
                        title: "Front-End-Developer",
                        value: "Front-End-Developer",
                      },
                      {
                        title: "Back-End-Developer",
                        value: "Back-End-Developer",
                      },
                      {
                        title: "Full-Stack-Developer",
                        value: "Full-Stack-Developer",
                      },
                      { title: "Mobile-Developer", value: "Mobile-Developer" },
                      {
                        title: "Software Developer",
                        value: "Software-Developer",
                      },
                      {
                        title: "Junior Software Developer",
                        value: "Junior-Software-Developer",
                      },
                      {
                        title: "Senior Software Developer",
                        value: "Senior-Software-Developer",
                      },
                      {
                        title: "Digital Marketing Analyst",
                        value: "Digital-Marketing-Analyst",
                      },
                      { title: "SEO Specialist", value: "SEO-Specialist" },
                      {
                        title: "Quality Assurance",
                        value: "Quality-Assurance",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Mobile Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone",
                    },
                  ]}
                >
                  <Input type="number" placeholder="phone" />
                </Form.Item>

                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please input your dob",
                    },
                  ]}
                >
                  <DatePicker
                    onChange={(e) => {
                      setDob(e);
                    }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>

                <Form.Item
                  name="comments"
                  label="Comments"
                  rules={[
                    {
                      required: true,
                      message: "Please input your comments",
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder=" Please Enter comments" />
                </Form.Item>

                {/* <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}

                <center>
                  <Form.Item>
                    <Button
                      type="submit"
                      htmlType="submit"
                      style={{
                        width: "144px",
                        backgroundColor: "#0958d9",
                        color: "#fff",
                      }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </center>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
