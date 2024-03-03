import React from "react";
// import { Layout, Button, Col, Row } from "antd";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Application from "./Application";
import "./App.css";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Landing from "./Landing";
import Register from "./Register";
import Users from "./Users";
import { AppContext } from "./AppContext";
// const { Header } = Layout;

function App() {
  /* eslint-disable no-unused-vars */
  const contextValue = {
    appVersion: "v03.03.24.02",
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ height: "100vh", overflowX: "hidden" }}>
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/inventory-mangement" element={<Landing />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/home" element={<Application />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/getProductDetail/:id" element={<ProductDetail />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addUser" element={<Register />} />
            </Routes>
          </Router>
        </>
      </div>
    </AppContext.Provider>
  );
}

export default App;
