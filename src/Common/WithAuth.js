import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const location = useLocation();
    const token = true;
    // const token = localStorage.getItem("token");

    return token || location.pathname === "/login" ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return Authenticated;
};

export default WithAuth;
