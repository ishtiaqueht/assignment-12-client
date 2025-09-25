import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApproveTutors = () => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 Fetch pending tutor requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pending-tutors"],
    queryFn: async () => {
      const res = await axios.get("/users/pending-tutors");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // 🔹 Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => axios.patch(`/users/${id}/approve-tutor`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-tutors"]);
      toast.success("Tutor approved successfully ✅");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "❌ Failed to approve tutor");
    },
  });

  // 🔹 Decline mutation
  const declineMutation = useMutation({
    mutationFn: async (id) => axios.delete(`/users/${id}/decline-tutor`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-tutors"]);
      toast.success("Tutor request declined ❌");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "❌ Failed to decline tutor");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading tutors...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Pending Tutor Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
            >
              <div>
                <p className="font-semibold text-gray-700">
                  {req.name} ({req.email})
                </p>
                {req.pendingReason && (
                  <p className="text-sm text-gray-500">
                    Reason: {req.pendingReason}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approveMutation.mutate(req._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => declineMutation.mutate(req._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Decline
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
