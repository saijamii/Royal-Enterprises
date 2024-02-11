import React, { useState, useEffect } from "react";
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

const EditProduct = ({ match, history }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState({});
  console.log(product,"product")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/getProductDetail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`/products/${productId}`, values);
      alert("Product updated successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Col span={22} style={{ marginTop: "20px" }}>
        <Row justify={"end"}>
          <Button
            style={{ backgroundColor: "#0958d9", color: "#fff" }}
            onClick={() => history.goBack()}
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
                initialValues={product}
                onFinish={onFinish}
              >
                {/* Same Form Items as AddProduct Component */}
                {/* You can reuse the Form Items from your AddProduct component here */}
                
                <center>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{
                        width: "144px",
                        backgroundColor: "#0958d9",
                        color: "#fff",
                      }}
                    >
                      Update
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
};

export default EditProduct;
