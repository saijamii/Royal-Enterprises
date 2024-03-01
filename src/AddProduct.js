import React from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  // DatePicker,
  // TreeSelect,
  Col,
  Row,
  Card,
  Divider,
} from "antd";

const { TextArea } = Input;

export default function AddProduct() {
  const [dataForm] = Form.useForm();
  // const [dob, setDob] = useState("");
  const onResetValues = () => {
    document.getElementById("myForm").reset();
  };

  const onSubmitForm = async (values) => {
    console.log(values, "values");
    return;
    const response = await axios.post("/addInventory", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender,
      designation: values.designation,
      phone: values.phone,
      // dob: dob,
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
    <div style={{ marginTop: "80px", background: "#f0f2f5" }}>
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
        <Row className="product-card" justify="space-between" gutter={[16, 16]}>
          <Col xxl={24}>
            <Card
              style={{
                margin: "0px auto",
              }}
            >
              <Form
                layout="vertical"
                id={"dataForm"}
                onFinish={onSubmitForm}
                style={{ margin: "10px 0px" }}
                form={dataForm}
              >
                <Row gutter={[16, 0]}>
                  <Col
                    xxl={{ span: 8 }}
                    xl={{ span: 8 }}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <b>
                      SKU #<span className="">*</span>
                    </b>
                    <Form.Item
                      name="productNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input SKU #",
                        },
                      ]}
                    >
                      <Input
                        placeholder="SKU#"
                        type="text"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xxl={{ span: 8 }}
                    xl={{ span: 8 }}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <b>Product Name </b>
                    <Form.Item name="productName">
                      <Input
                        placeholder="Product Name"
                        type="text"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    xxl={{ span: 8 }}
                    xl={{ span: 8 }}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <b>
                      Cost <span className="">*</span>
                    </b>
                    <Form.Item
                      name="regularCost"
                      rules={[
                        {
                          required: true,
                          message: "Please input cost",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Cost"
                        type="number"
                        prefix="$"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xxl={{ span: 8 }}
                    xl={{ span: 8 }}
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <b>
                      Price <span className="">*</span>
                    </b>
                    <Form.Item
                      name="regularPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input price",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Price"
                        type="number"
                        prefix="$"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>

                  <Divider>
                    <h1
                      style={{
                        fontSize: "20px",
                        marginBottom: "-15px",
                      }}
                    >
                      Product(s)
                    </h1>
                  </Divider>
                  <Divider />
                  <Col span={24}>
                    <b>
                      Description <span className=""></span>
                    </b>
                    <Form.Item name="shortDescription">
                      <TextArea showCount style={{ height: 100 }} />
                    </Form.Item>
                  </Col>
                  <Col
                    xxl={{ span: 24 }}
                    xl={{ span: 24 }}
                    lg={{ span: 24 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <div style={{ float: "right" }}>
                      <Row>
                        <Button
                          type="default"
                          style={{
                            width: "max-content",
                            marginLeft: "auto",
                            backgroundColor: "#28589a",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                            // marginLeft: "20px",
                          }}
                          htmlType="submit"
                          form="dataForm"
                        >
                          Submit
                        </Button>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
