import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

const MySessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch tutor's sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["my-sessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`sessions/tutor/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Mutation with optimistic update
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`sessions/${id}`, {
        status: "pending",
      });
      return res.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["my-sessions", user?.email]);

      const prevData = queryClient.getQueryData(["my-sessions", user?.email]);

      // optimistic update
      queryClient.setQueryData(["my-sessions", user?.email], (old) =>
        old.map((s) => (s._id === id ? { ...s, status: "pending" } : s))
      );

      return { prevData };
    },
    onError: (err, id, context) => {
      // rollback if failed
      queryClient.setQueryData(["my-sessions", user?.email], context.prevData);
      toast.error("Failed to send request ❌");
    },
    onSuccess: () => {
      toast.success("Approval request sent again ✅");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["my-sessions", user?.email]);
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        My Study Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not created any sessions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{session.title}</td>
                  <td className="p-3">{session.duration}</td>
                  <td className="p-3 font-medium">
                    {session.status === "pending" && (
                      <span className="text-yellow-600">⏳ Pending</span>
                    )}
                    {session.status === "approved" && (
                      <span className="text-green-600">✅ Approved</span>
                    )}
                    {session.status === "rejected" && (
                      <div className="text-red-600">
                        ❌ Rejected
                        <div className="text-sm text-gray-500">
                          <p>
                            <strong>Reason:</strong>{" "}
                            {session.rejectionReason || "N/A"}
                          </p>
                          <p>
                            <strong>Feedback:</strong>{" "}
                            {session.rejectionFeedback || "N/A"}
                          </p>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {session.status === "rejected" ? (
                      <button
                        onClick={() => mutation.mutate(session._id)}
                        disabled={mutation.isLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        {mutation.isLoading ? "Sending..." : "Request Again"}
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySessions;
