import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxios from "../../hooks/UseAxios";

const ApproveTutors = () => {
  const axios = useAxios(); // ✅ axios instance
  const queryClient = useQueryClient();

  // Fetch pending tutor requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pending-tutors"],
    queryFn: async () => {
      const res = await axios.get("/users/pending-tutors"); // ✅ baseURL handled by hook
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Approve mutation
  const mutation = useMutation({
    mutationFn: async (id) => {
      return axios.patch(`/users/${id}/approve-tutor`); // ✅ use axios hook
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-tutors"]);
      toast.success("Tutor approved successfully ✅");
    },
    onError: (err) => {
      console.error("Approve tutor failed:", err.response);
      toast.error(err.response?.data?.message || "❌ Failed to approve tutor");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Pending Tutor Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{req.name}</strong> ({req.email})
                </p>
                {req.pendingReason && <p className="text-sm text-gray-500">Reason: {req.pendingReason}</p>}
              </div>
              <div>
                <button
                  onClick={() => mutation.mutate(req._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApproveTutors;
