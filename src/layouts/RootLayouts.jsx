import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-orange-50 to-orange-100 ">
      <Navbar></Navbar>
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
