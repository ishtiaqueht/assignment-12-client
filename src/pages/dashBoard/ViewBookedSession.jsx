import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const ViewBookedSessions = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  // ✅ Fetch booked sessions of this student
  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get("/bookedSessions");
      // filter only this student
      return res.data.filter(
        (session) => session.studentEmail === user.email
      );
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading your booked sessions...</p>;

  if (bookedSessions.length === 0)
    return <p className="text-center mt-10">You have not booked any sessions yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
    My Booked Sessions
  </h1>

  {bookedSessions.length === 0 ? (
    <p className="text-center text-gray-500 italic">You haven’t booked any sessions yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {bookedSessions.map((session) => (
        <div
          key={session._id}
          className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:scale-[1.02] transition transform p-6"
        >
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {session.sessionTitle}
          </h2>

          {/* Tutor */}
          <p className="text-gray-700 mb-2 flex items-center gap-2">
            <FaChalkboardTeacher className="text-orange-500" />
            <span className="font-semibold">Tutor:</span> {session.tutorEmail}
          </p>

          {/* Booked At */}
          <p className="text-gray-700 mb-2 flex items-center gap-2">
            <MdDateRange className="text-blue-500" />
            <span className="font-semibold">Booked At:</span>{" "}
            {new Date(session.bookedAt).toLocaleString()}
          </p>

          {/* Fee */}
          <p className="text-gray-700 mb-5 flex items-center gap-2">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Fee:</span>{" "}
            {session.registrationFee === 0
              ? "Free"
              : `$${session.registrationFee}`}
          </p>

          {/* Button */}
          <Link
            to={`/sessions/${session.sessionId}`}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium shadow-md hover:from-blue-700 hover:to-indigo-800 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default ViewBookedSessions;
