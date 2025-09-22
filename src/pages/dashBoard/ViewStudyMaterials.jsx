import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ViewStudyMaterials = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);

  // ✅ Fetch booked sessions for this student
  const { data: bookings = [], isLoading: bLoading } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bookedSessions?email=${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Fetch materials for selected session
  const { data: materials = [], isLoading: mLoading } = useQuery({
    queryKey: ["materials", selectedSession?.sessionId],
    enabled: !!selectedSession, // only run if session selected
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/materials/${selectedSession.sessionId}`
      );
      return res.data;
    },
  });

  // helper function
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();

      // Create temp link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || "material.jpg";
      link.click();

      // cleanup
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
    My Booked Sessions
  </h1>

  {/* Booked sessions */}
  {bLoading ? (
    <p className="text-gray-600">Loading booked sessions...</p>
  ) : bookings.length === 0 ? (
    <p className="text-gray-600">You haven’t booked any sessions yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
      {bookings.map((session) => (
        <div
          key={session._id}
          className="border rounded-xl shadow-md bg-gradient-to-br from-white to-orange-50 p-4 sm:p-5 flex flex-col hover:shadow-lg transition"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
            {session.sessionTitle}
          </h2>
          <p className="text-gray-600 mb-3 text-sm sm:text-base">
            Tutor:{" "}
            <span className="font-medium text-gray-800">
              {session.tutorName}
            </span>{" "}
            ({session.tutorEmail})
          </p>
          <button
            onClick={() => setSelectedSession(session)}
            className="mt-auto px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            View Materials
          </button>
        </div>
      ))}
    </div>
  )}

  {/* Study Materials */}
  {selectedSession && (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Materials for {selectedSession.sessionTitle}
      </h2>
      {mLoading ? (
        <p className="text-gray-600">Loading materials...</p>
      ) : materials.length === 0 ? (
        <p className="text-gray-600">
          No materials uploaded yet for this session.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="border rounded-xl shadow bg-white hover:shadow-lg transition flex flex-col p-4"
            >
              <img
                src={mat.image}
                alt={mat.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg text-gray-800">
                {mat.title}
              </h3>
              <a
                href={mat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline my-2 text-sm sm:text-base hover:text-orange-700"
              >
                Open Link
              </a>
              <button
                onClick={() => handleDownload(mat.image, mat.title + ".jpg")}
                className="px-3 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition mt-auto"
              >
                Download Image
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default ViewStudyMaterials;
