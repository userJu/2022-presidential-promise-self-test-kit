import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseRange from "./components/ChooseRange";
import ResultPage from "./components/ResultPage";
import SelectPromise from "./components/SelectPromise";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseRange />} />
        <Route path="/select_promise" element={<SelectPromise />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
