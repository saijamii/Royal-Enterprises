import React, { useEffect, useState } from "react";
import { Col, Row, Button, Divider, Card } from "antd";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Common/Loading";

export default function ProductDetail(props) {
  const token = localStorage.getItem("JWT");
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
          }`,
          {
            headers: {
              authorization: token,
            },
          }
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
            title="Product Information"
          >
            <Row justify="space-between">
              <Col>productName:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.productName}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>manufacturerName:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.manufacturerName}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>qty:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>{product?.qty}</b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>regularCost:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.regularCost}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>buildingType:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.buildingType}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>buildingSubType:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.buildingSubType}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>storageLocation:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.storageLocation}
                </b>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col>warehouseLocation:</Col>
              <Col>
                <b style={{ textTransform: "capitalize" }}>
                  {product?.warehouseLocation}
                </b>
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
