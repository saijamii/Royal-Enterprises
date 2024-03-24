import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WithAuth from "./WithAuth";
import Application from "../Application";
import Landing from "./Landing";

const Authenticated = () => {
  const location = useLocation();

  return (
    <div
      style={{
        background: "#ffff",
        // marginBottom: "10vw",
      }}
    >
      {location.pathname !== "*" &&
      location.pathname !== "/" &&
      location.pathname !== "" ? (
        <Application />
      ) : (
        <Routes>
          <Route path="*" element={<Landing />} />
        </Routes>
      )}
    </div>
  );
};

export default WithAuth(Authenticated);
