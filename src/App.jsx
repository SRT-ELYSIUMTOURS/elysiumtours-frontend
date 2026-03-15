import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TouristLayout from "./layout/touristLayout.jsx";
import HomePage from "./pages/tourist/HomePage";
import BlogPage from "./pages/tourist/BlogPage";
import BlogCategoryPage from "./pages/tourist/BlogCategoryPage";

function App() {
  return (
    <BrowserRouter>
      <div id="toast-root" />
      <Routes>
        <Route element={<TouristLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:category" element={<BlogCategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
