import React from "react";
// import { Layout, Button, Col, Row } from "antd";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Application from "./Application";
import "./App.css";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Register from "./Register";
import Users from "./Users";

// const { Header } = Layout;

function App() {
  return (
    <div style={{ height: "100vh", overflowX: "hidden" }}>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inventory-mangement" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Application />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/getProductDetail/:id" element={<ProductDetail />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
