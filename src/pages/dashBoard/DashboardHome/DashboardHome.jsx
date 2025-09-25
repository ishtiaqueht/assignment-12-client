import React from "react";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";
import AdminDashboard from "./AdminDashboard";
import useRole from "../../../hooks/useRole";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {role === "student" && <StudentDashboard />}
      {role === "tutor" && <TutorDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default DashboardHome;
