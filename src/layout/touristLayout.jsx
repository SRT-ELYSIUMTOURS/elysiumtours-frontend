import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/ui/Footer";

const TouristLayout = () => {
  return (
    <div className="font-raleway min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default TouristLayout;
