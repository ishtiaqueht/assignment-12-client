import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UseAxios from "../../hooks/UseAxios";

const MakeRole = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const axiosInstance = UseAxios();

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
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto mt-6 sm:mt-10">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Manage Users
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full sm:w-1/2 lg:w-1/3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Table Wrapper (horizontal scroll for mobile) */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm sm:text-base uppercase tracking-wide">
              <th className="border px-2 sm:px-4 py-2 sm:py-3 text-left">#</th>
              <th className="border px-2 sm:px-4 py-2 sm:py-3 text-left">Name</th>
              <th className="border px-2 sm:px-4 py-2 sm:py-3 text-left">Email</th>
              <th className="border px-2 sm:px-4 py-2 sm:py-3 text-left">Role</th>
              <th className="border px-2 sm:px-4 py-2 sm:py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-orange-50 transition duration-200"
              >
                <td className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                  {index + 1}
                </td>
                <td className="border px-2 sm:px-4 py-2 font-medium text-sm sm:text-base">
                  {user.name}
                </td>
                <td className="border px-2 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                  {user.email}
                </td>
                <td className="border px-2 sm:px-4 py-2 capitalize text-sm sm:text-base">
                  {user.role || "student"}
                </td>
                <td className="border px-2 sm:px-4 py-2">
                  <select
                    className="select select-sm sm:select-md select-bordered w-full max-w-[140px] sm:max-w-xs focus:ring-2 focus:ring-orange-400"
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
