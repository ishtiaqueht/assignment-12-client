import React from "react";
import { Link } from "react-router";
import { Users, BookOpen, FileText, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        🛠️ Admin Dashboard
      </h1>
      <p className="text-gray-600">
        Here you can manage users, sessions, and materials across the platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/manageUsers"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <Users className="text-blue-500" />
          <span className="font-medium text-gray-700">View All Users</span>
        </Link>

        <Link
          to="/dashboard/all-sessions"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <BookOpen className="text-green-500" />
          <span className="font-medium text-gray-700">Manage Study Sessions</span>
        </Link>

        <Link
          to="/dashboard/all-materials"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <FileText className="text-orange-500" />
          <span className="font-medium text-gray-700">Manage Materials</span>
        </Link>

        <Link
          to="/dashboard/approve-tutors"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <CheckCircle className="text-purple-500" />
          <span className="font-medium text-gray-700">Approve Tutors</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
