import React from "react";
import { Row,Col,Input } from "antd";

const { Search } = Input;

export default function CommonHeader({activeMenu}) {
  return (
    <>
      <div className="logo" />
      <Row>
        <Col span={2}><h4 style={{marginTop:'12px'}}>{activeMenu}</h4></Col>
        <Col span={4} offset={15}>
          {activeMenu !== "Dashboard" && <Search placeholder="search text" style={{ width: 200,marginTop:'12px' }} />}
        
        </Col>
      </Row>    
    </>
  );
}
