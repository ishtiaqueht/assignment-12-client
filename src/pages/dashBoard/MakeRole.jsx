import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakeRole = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const axiosInstance = useAxiosSecure();

  // 🔹 Fetch all users with search
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?search=${search}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // 🔹 Mutation to update role
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosInstance.patch(`users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      toast.success(data.message || "Role updated ✅");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

  return (
   <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto mt-6 sm:mt-10">
  {/* Title */}
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent drop-shadow">
    Manage Users
  </h2>

  {/* 🔍 Search Bar */}
  <div className="flex justify-center mb-6">
    <input
      type="text"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="input input-bordered w-full sm:w-2/3 lg:w-1/3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 px-4 py-2 text-sm sm:text-base"
    />
  </div>

  {/* Table Wrapper (scroll for mobile) */}
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
    <table className="min-w-full table-auto">
      {/* Table Head */}
      <thead>
        <tr className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold  text-xs sm:text-sm lg:text-base uppercase tracking-wide">
          <th className="px-3 sm:px-4 py-3 text-left">#</th>
          <th className="px-3 sm:px-4 py-3 text-left">Name</th>
          <th className="px-3 sm:px-4 py-3 text-left">Email</th>
          <th className="px-3 sm:px-4 py-3 text-left">Role</th>
          <th className="px-3 sm:px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            className="border-b hover:bg-orange-50 even:bg-gray-50 transition duration-200 text-sm sm:text-base"
          >
            {/* Index */}
            <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 font-medium">
              {index + 1}
            </td>

            {/* Name */}
            <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-800">
              {user.name}
            </td>

            {/* Email */}
            <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 truncate max-w-[180px] sm:max-w-[250px] lg:max-w-xs">
              {user.email}
            </td>

            {/* Role */}
            <td className="px-3 sm:px-4 py-2 sm:py-3 capitalize text-gray-700">
              <span
                className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : user.role === "tutor"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role || "student"}
              </span>
            </td>

            {/* Actions */}
            <td className="px-3 sm:px-4 py-2 sm:py-3">
              <select
                className="select select-sm sm:select-md select-bordered w-full rounded-md focus:ring-2 focus:ring-orange-400 transition"
                value={user.role || "student"}
                onChange={(e) =>
                  mutation.mutate({ id: user._id, role: e.target.value })
                }
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MakeRole;
