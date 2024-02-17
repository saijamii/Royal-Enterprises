import React, { useEffect, useState } from "react";
import { Col, Row, Button, Divider, Card } from "antd";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Common/Loading";

export default function ProductDetail(props) {
  console.log(props, "props");
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(product, "product");
  // const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://node-kl1g.onrender.com/getProductDetail/${
            window.location.pathname.split("/")[2]
          }`
        );
        setProduct(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <Col span={24} style={{ marginTop: "80px" }}>
      <Row justify={"space-between"}>
        <Col span={12} offset={1} style={{ justifyContent: "center" }}>
          <Card
            style={{
              width: "40vh",
              marginTop: "12px",
              backgroundColor: "#ffa700",
            }}
            headStyle={{ fontWeight: "bold", fontSize: "18px" }}
            title="User Information"
          >
            <Row justify="space-between">
              <Col>First Name:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.firstName}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Last Name:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.lastName}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Email:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.email}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Phone:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.phone}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Date of Birth:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.dob}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Designation:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {user?.designation}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>Comments:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{user?.comments}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
            </Row>
          </Card>
        </Col>
        <Col span={4}>
          <Button
            style={{
              backgroundColor: "#0958d9",
              color: "#fff",
              marginTop: "12px",
            }}
            onClick={() => window.history.back(-1)}
          >
            BACK
          </Button>
        </Col>
      </Row>
      <Loading enableLoading={loading} />
    </Col>
  );
}
