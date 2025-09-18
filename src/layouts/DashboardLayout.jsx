import React from "react";
import { Outlet, NavLink } from "react-router";
import useRole from "../hooks/UseRole";
import Logo from "../pages/shared/Logo";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole(); // destructure object return

  if (roleLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* 🔥 Logo Section */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <Logo className="h-14 w-auto text-white" /> 
        </div>

        {/* 🔥 Sidebar Menu */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-3">
            {/* Student Routes */}
            {role === "student" && (
              <>
                <NavLink to="/dashboard/booked-sessions" className="block hover:text-yellow-400">
                  View Booked Sessions
                </NavLink>
                <NavLink to="/dashboard/create-note" className="block hover:text-yellow-400">
                  Create Note
                </NavLink>
                <NavLink to="/dashboard/manage-notes" className="block hover:text-yellow-400">
                  Manage Notes
                </NavLink>
                <NavLink to="/dashboard/study-materials" className="block hover:text-yellow-400">
                  View Study Materials
                </NavLink>
              </>
            )}

            {/* Tutor Routes */}
            {role === "tutor" && (
              <>
                <NavLink to="/dashboard/create-session" className="block hover:text-green-400">
                  Create Study Session
                </NavLink>
                <NavLink to="/dashboard/my-sessions" className="block hover:text-green-400">
                  My Study Sessions
                </NavLink>
                <NavLink to="/dashboard/upload-materials" className="block hover:text-green-400">
                  Upload Materials
                </NavLink>
                <NavLink to="/dashboard/my-materials" className="block hover:text-green-400">
                  My Materials
                </NavLink>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <NavLink to="/dashboard/users" className="block hover:text-red-400">
                  Manage Users
                </NavLink>
                <NavLink to="/dashboard/all-sessions" className="block hover:text-red-400">
                  Manage Study Sessions
                </NavLink>
                <NavLink to="/dashboard/all-materials" className="block hover:text-red-400">
                  Manage Materials
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
