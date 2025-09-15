import React from "react";
import { NavLink } from "react-router";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTelegram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="py-4 mt-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Left side - Branding */}
        <div>
          <h1
            className="hidden md:block text-2xl md:text-3xl font-extrabold 
             "
          >
            Athletic<span className="">Club</span>
          </h1>
          <p className="mt-3 text-sm ">
            Connecting athletes and fans through events, bookings, and
            management.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className=" transition-colors">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutors" className=" transition-colors">
                Tutors
              </NavLink>
            </li>
            <li>
              <NavLink to="/studySessions" className=" transition-colors">
                Study Sessions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right side - Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4 text-lg mb-5">
            <a
              href="https://www.facebook.com/ishtiaque.hossaintanbin.1"
              className="p-2 rounded-full  transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://t.me/Ishtiaque_HT"
              className="p-2 rounded-full  transition"
            >
              <FaTelegram />
            </a>
            <a
              href="https://github.com/"
              className="p-2 rounded-full  transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ishtiaqueht/"
              className="p-2 rounded-full transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-sm flex items-center gap-2">
            <MdEmail /> ishtiaqueht@gmail.com
          </p>
          <p className=" text-sm flex items-center gap-2">
            <FaPhoneAlt /> +880 1787 127080
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t  mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} AthleticClub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
