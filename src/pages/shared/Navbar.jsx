import React from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/tutors">Tutors</NavLink></li>
        <li><NavLink to="/studySessions">Study Sessions</NavLink></li>

        {/* {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        } */}
{/* 
        <li><NavLink to="/beARider">Be a Rider</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li> */}
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <Link to="/login" className='btn btn-primary  text-black'>Login</Link>
                <Link to="/register" className='btn btn-primary  text-black'>Register</Link>
                {/* {user ?
                    <button onClick={handleLogOut} className='btn btn-primary text-black'>Log Out</button>
                    :
                    <Link to="/login" className='btn btn-primary  text-black'>Login</Link>} */}
            </div>
        </div>
    );
};

export default Navbar;