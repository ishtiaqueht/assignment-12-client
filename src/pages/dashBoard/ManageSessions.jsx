import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import { toast } from "react-toastify";

const ManageSessions = () => {
  const axios = UseAxios();
  const queryClient = useQueryClient();

  const [rejectSession, setRejectSession] = useState(null);
  const [approveSession, setApproveSession] = useState(null);

  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const [isPaid, setIsPaid] = useState(false);
  const [fee, setFee] = useState(0);

  // Fetch all pending sessions
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-sessions"],
    queryFn: async () => {
      const res = await axios.get("/sessions");
      return res.data.filter((session) => session.status === "pending");
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async ({ id, isPaid, fee }) =>
      axios.patch(`/sessions/${id}/approve`, { isPaid, fee }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-sessions"]);
      toast.success("Session approved ✅");
      setApproveSession(null);
      setIsPaid(false);
      setFee(0);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to approve ❌");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason, feedback }) =>
      axios.patch(`/sessions/${id}/reject`, { reason, feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-sessions"]);
      toast.success("Session rejected ❌");
      setRejectSession(null);
      setReason("");
      setFeedback("");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to reject ❌");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading sessions...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load sessions.</p>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Study Sessions
      </h1>

      {sessions.length === 0 ? (
        <p className="text-center">No pending sessions.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="border p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{session.title}</h2>
                <p className="text-gray-600">Tutor: {session.tutorName}</p>
                <p className="text-gray-600">Email: {session.tutorEmail}</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => setApproveSession(session)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => setRejectSession(session)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectSession && (
        <dialog id="reject_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Reject Session</h3>
            <p className="text-gray-600 mb-3">
              Session:{" "}
              <span className="font-semibold">{rejectSession.title}</span>
            </p>
            <div className="form-control mb-3">
              <label className="label">Rejection Reason</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="form-control mb-3">
              <label className="label">Feedback (optional)</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                onClick={() => {
                  if (!reason)
                    return toast.error("Rejection reason required ❌");
                  rejectMutation.mutate({
                    id: rejectSession._id,
                    reason,
                    feedback,
                  });
                }}
                className="btn bg-red-500 text-white"
              >
                Submit Reject
              </button>
              <button
                onClick={() => setRejectSession(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Approve Modal */}
      {approveSession && (
        <dialog id="approve_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Approve Session</h3>
            <p className="text-gray-600 mb-3">
              Session:{" "}
              <span className="font-semibold">{approveSession.title}</span>
            </p>

            <div className="form-control mb-3">
              <label className="label">Is this session Free or Paid?</label>
              <select
                className="select select-bordered w-full"
                value={isPaid ? "paid" : "free"}
                onChange={(e) => {
                  const paid = e.target.value === "paid";
                  setIsPaid(paid);
                  if (paid) {
                    setFee("");
                  } else {
                    setFee(0);
                  }
                }}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {isPaid && (
              <div className="form-control mb-3">
                <label className="label">Fee Amount</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  placeholder="Enter fee amount"
                />
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={() => {
                  if (isPaid && (!fee || fee <= 0)) {
                    return toast.error("Please enter a valid fee amount ❌");
                  }
                  approveMutation.mutate({
                    id: approveSession._id,
                    isPaid,
                    fee: isPaid ? fee : 0,
                  });
                }}
                className="btn bg-green-500 text-white"
              >
                Submit Approve
              </button>
              <button
                onClick={() => setApproveSession(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageSessions;
