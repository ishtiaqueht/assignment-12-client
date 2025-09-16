import React from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Logo / Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Your{" "}
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">EduPulse</span> Account
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Profile Picture URL
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
        <SocialLogin></SocialLogin>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
