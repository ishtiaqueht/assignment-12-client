import React from "react";
import { Link } from "react-router";
import { BookOpen, FileText, Notebook, UserPlus, FileStack } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Student Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome! From here you can manage your study activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/booked-sessions"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <BookOpen className="text-blue-500" />
          <span className="font-medium text-gray-700">View Booked Sessions</span>
        </Link>

        <Link
          to="/dashboard/create-note"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <Notebook className="text-green-500" />
          <span className="font-medium text-gray-700">Create Note</span>
        </Link>

        <Link
          to="/dashboard/manage-notes"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <FileText className="text-purple-500" />
          <span className="font-medium text-gray-700">Manage Notes</span>
        </Link>

        <Link
          to="/dashboard/study-materials"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <FileStack className="text-teal-500" />
          <span className="font-medium text-gray-700">View Study Materials</span>
        </Link>

        <Link
          to="/dashboard/be-a-tutor"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <UserPlus className="text-orange-500" />
          <span className="font-medium text-gray-700">Apply to be a Tutor</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
