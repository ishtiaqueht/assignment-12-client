import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch((err) => toast.error(err));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/tutors">Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/studySessions">Study Sessions</NavLink>
      </li>
      {/* {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )} */}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-6 py-3 sticky top-0 z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} className="btn btn-ghost lg:hidden rounded-full hover:bg-gray-100 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-52 p-2">
        {navItems}
      </ul>
    </div>
    <span className="btn btn-ghost text-2xl font-bold text-gray-800">
      <Logo />
    </span>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-2 font-medium text-gray-700">{navItems}</ul>
  </div>

  <div className="navbar-end flex items-center gap-4">
    {user ? (
      <div className="flex items-center gap-3">
        {/* user profile picture */}
        <div className="relative group">
          <img
            src={user.photo || user.photoURL}
            alt="profile"
            className="w-11 h-11 rounded-full shadow-lg border-2 border-gray-200 cursor-pointer transition-transform transform hover:scale-110"
          />
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-2 text-center hidden group-hover:block">
            <p className="text-gray-800 font-semibold">{user.displayName || user.name}</p>
          </div>
        </div>

        {/* logout button */}
        <button className="btn bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    ) : (
      <div className="flex gap-2">
        <Link className="btn bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform" to="/login">
          Login
        </Link>
        <Link className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform" to="/register">
          Register
        </Link>
      </div>
    )}
  </div>
</div>

  );
};

export default Navbar;
