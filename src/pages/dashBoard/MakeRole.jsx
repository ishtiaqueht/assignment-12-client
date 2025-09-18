import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const MakeRole = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, reset } = useForm();

  const email = watch("email");

  // 🔹 Fetch users by email for live search
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axios.get(`/users/search?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // 🔹 Update role mutation
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axios.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      refetch(); // ✅ refetch call
      toast.success("Role updated successfully ✅"); // toast instead of alert
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    },
  });

  const onSubmit = (data) => {
    const { userId, role } = data;
    mutation.mutate({ id: userId, role });
  };

  return (
    <div className="p-6 bg-white shadow rounded-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Assign Role</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Search by Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter user email..."
            className="w-full border p-2 rounded"
          />
        </div>

        {users.length > 0 && (
          <>
            <div>
              <label className="block mb-1">Select User</label>
              <select
                {...register("userId")}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Select User --</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email}) – {u.role || "student"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Select Role</label>
              <select {...register("role")} className="w-full border p-2 rounded" required>
                <option value="">-- Select Role --</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Role
        </button>
      </form>
    </div>
  );
};

export default MakeRole;
