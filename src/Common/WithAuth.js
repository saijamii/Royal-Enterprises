import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const location = useLocation();
    // const token = true;
    const token = localStorage.getItem("JWT");
    console.log(token, "token");

    return token !== null || location.pathname === "/" ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/" />
    );
  };

  return Authenticated;
};

export default WithAuth;
