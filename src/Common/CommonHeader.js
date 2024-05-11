import React from "react";
import { Row, Col } from "antd";

export default function CommonHeader({ activeMenu }) {
  return (
    <>
      <div className="logo" />
      <Row>
        <Col span={2}>
          <h4 style={{ marginTop: "12px" }}>{activeMenu}</h4>
        </Col>
      </Row>
    </>
  );
}
