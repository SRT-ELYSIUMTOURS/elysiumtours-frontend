import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const TouristLayout = () => {
  return (
    <div className="tourist-layout min-h-screen bg-primary-normal-default font-raleway">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default TouristLayout;