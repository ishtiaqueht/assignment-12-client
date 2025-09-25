import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png"

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img
          className=" w-10 h-10 object-contain"
          src={logo}
          alt=""
        />
        <p className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
          <span className="">Edu</span>
          <span className="">Pulse</span>
        </p>
      </div>
    </Link>
  );
};

export default Logo;
