import React from "react";
import { Link } from "react-router";
import { PlusCircle, BookOpen, Upload, FileStack } from "lucide-react";

const TutorDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        📚 Tutor Dashboard
      </h1>
      <p className="text-gray-600">
        Manage your sessions and materials to help students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/create-session"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <PlusCircle className="text-green-500" />
          <span className="font-medium text-gray-700">Create Study Session</span>
        </Link>

        <Link
          to="/dashboard/my-sessions"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <BookOpen className="text-blue-500" />
          <span className="font-medium text-gray-700">My Study Sessions</span>
        </Link>

        <Link
          to="/dashboard/upload-materials"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <Upload className="text-orange-500" />
          <span className="font-medium text-gray-700">Upload Materials</span>
        </Link>

        <Link
          to="/dashboard/my-materials"
          className="flex items-center gap-3 p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <FileStack className="text-purple-500" />
          <span className="font-medium text-gray-700">My Materials</span>
        </Link>
      </div>
    </div>
  );
};

export default TutorDashboard;
