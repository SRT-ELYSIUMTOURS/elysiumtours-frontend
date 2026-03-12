import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TouristLayout from "./layout/touristLayout.jsx";
import HomePage from "./pages/tourist/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div id="toast-root" />
      <Routes>
        <Route element={<TouristLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
