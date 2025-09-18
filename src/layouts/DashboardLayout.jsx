import React from "react";
import { Outlet, NavLink } from "react-router";
import useRole from "../hooks/UseRole";
import Logo from "../pages/shared/Logo";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p className="text-center mt-10">Loading...</p>;

  const activeClass = ({ isActive }) =>
    isActive ? "block font-bold text-blue-500" : "block hover:text-gray-300";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <Logo className="h-14 w-auto text-white" />
        </div>

        {/* Sidebar Menu */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-3">
            {/* Student Routes */}
            {role === "student" && (
              <>
                <NavLink
                  to="/dashboard/booked-sessions"
                  className={activeClass}
                >
                  View Booked Sessions
                </NavLink>
                <NavLink to="/dashboard/create-note" className={activeClass}>
                  Create Note
                </NavLink>
                <NavLink to="/dashboard/manage-notes" className={activeClass}>
                  Manage Notes
                </NavLink>
                <NavLink
                  to="/dashboard/study-materials"
                  className={activeClass}
                >
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
                <NavLink
                  to="/dashboard/upload-materials"
                  className={activeClass}
                >
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
                <NavLink to="/dashboard/users" className={activeClass}>
                  Manage Users
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
                <NavLink to="/dashboard/manageUsers" className={activeClass}>
                  Manage Admin
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
