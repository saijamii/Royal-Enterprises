import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./Config/AppRoutes";
import { AppContext } from "./Config/AppContext";
import Authenticated from "./Common/Authenticated";

export default function App() {
  console.log(process.env.REACT_APP_TEST, "valueFromEnv");
  const contextValue = [
    {
      AppRoutes: AppRoutes,
    },
  ];
  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="*" element={<Authenticated />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
