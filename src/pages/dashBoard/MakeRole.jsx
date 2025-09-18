import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import UseAxios from "../../hooks/UseAxios";

const MakeRole = () => {
  const queryClient = useQueryClient();

  // 🔹 Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const axiosInstance = UseAxios();
      const res = await axiosInstance.get("users"); // Backend GET /users
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // 🔹 Mutation to update role
  const mutation = useMutation({
    mutationFn: async (id) => {
      const axiosInstance = UseAxios();
      const res = await axiosInstance.patch(`users/${id}/role`, {
        role: "admin",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User promoted to Admin ✅");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-lg uppercase tracking-wide">
              <th className="border px-4 py-3 text-left">#</th>
              <th className="border px-4 py-3 text-left">Name</th>
              <th className="border px-4 py-3 text-left">Email</th>
              <th className="border px-4 py-3 text-left">Role</th>
              <th className="border px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-orange-50 transition duration-300 ease-in-out"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 font-medium">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">
                  {user.role || "student"}
                </td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => mutation.mutate(user._id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Admin</span>
                  )}
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
