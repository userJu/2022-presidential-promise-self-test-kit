import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseRange from "./components/ChooseRange";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseRange />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
