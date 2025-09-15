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
    <footer className="bg-white py-8 mt-12 border-t border-orange-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left side - Branding */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              EduPulse
            </span>
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Empowering students and tutors through seamless study sessions, 
            resource sharing, and smart learning tools.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <NavLink
                to="/"
                className="hover:text-orange-500 transition-colors"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutors"
                className="hover:text-orange-500 transition-colors"
              >
                Tutors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studySessions"
                className="hover:text-orange-500 transition-colors"
              >
                Study Sessions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right side - Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Stay Connected</h3>
          <div className="flex gap-4 text-lg mb-5 text-gray-700">
            <a
              href="https://www.facebook.com/ishtiaque.hossaintanbin.1"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-orange-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://t.me/Ishtiaque_HT"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-orange-400 transition"
            >
              <FaTelegram />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-orange-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ishtiaqueht/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-orange-400 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <p className="text-sm flex items-center gap-2 text-gray-600">
            <MdEmail className="text-orange-500" /> ishtiaqueht@gmail.com
          </p>
          <p className="text-sm flex items-center gap-2 text-gray-600">
            <FaPhoneAlt className="text-orange-500" /> +880 1787 127080
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduPulse. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
