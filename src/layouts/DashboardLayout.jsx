import React, { useState } from "react";
import { Outlet, NavLink } from "react-router";
import Logo from "../pages/shared/Logo";
import useRole from "../hooks/useRole";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p className="text-center mt-10">Loading...</p>;
  
 const activeClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition text-white ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
    }`;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-white via-orange-50 to-orange-100">
      {/* Mobile  */}
      <div className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white shadow-md px-4 py-3 z-50">
        <Logo className="h-10 w-auto" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-orange-600 focus:outline-none"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
         className={`fixed lg:min-h-screen lg:static top-0 left-0 h-full w-64 
     
    lg:bg-gray-900 lg:text-gray-100
    flex flex-col transform transition-transform duration-300 z-40
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-orange-500">
          <Logo className="h-14 w-auto text-white" />
        </div>

        {/* Sidebar Menu */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 tracking-wide">
            Dashboard
          </h2>
          <nav className="space-y-2">
            {/* Student Routes */}
            {role === "student" && (
              <>
                <NavLink to="/dashboard/booked-sessions" className={activeClass}>
                  View Booked Sessions
                </NavLink>
                <NavLink to="/dashboard/create-note" className={activeClass}>
                  Create Note
                </NavLink>
                <NavLink to="/dashboard/manage-notes" className={activeClass}>
                  Manage Notes
                </NavLink>
                <NavLink to="/dashboard/study-materials" className={activeClass}>
                  View Study Materials
                </NavLink>
                <NavLink to="/dashboard/be-a-tutor" className={activeClass}>
                  Be a Tutor
                </NavLink>
              </>
            )}

            {/* Tutor Routes */}
            {role === "tutor" && (
              <>
                <NavLink to="/dashboard/create-session" className={activeClass}>
                  Create Study Session
                </NavLink>
                <NavLink to="/dashboard/my-sessions" className={activeClass}>
                  My Study Sessions
                </NavLink>
                <NavLink to="/dashboard/upload-materials" className={activeClass}>
                  Upload Materials
                </NavLink>
                <NavLink to="/dashboard/my-materials" className={activeClass}>
                  My Materials
                </NavLink>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <NavLink to="/dashboard/manageUsers" className={activeClass}>
                  View all users
                </NavLink>
                <NavLink to="/dashboard/all-sessions" className={activeClass}>
                  Manage Study Sessions
                </NavLink>
                <NavLink to="/dashboard/all-materials" className={activeClass}>
                  Manage Materials
                </NavLink>
                <NavLink to="/dashboard/approve-tutors" className={activeClass}>
                  Approve Tutors
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 mt-14 lg:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
