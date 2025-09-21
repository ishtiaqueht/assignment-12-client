import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/UseAxios";
import { Link } from "react-router";

const ViewBookedSessions = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Booked Sessions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookedSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {session.sessionTitle}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Tutor:</span> {session.tutorEmail}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Booked At:</span>{" "}
              {new Date(session.bookedAt).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Fee:</span>{" "}
              {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
            </p>
            <Link
              to={`/sessions/${session.sessionId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBookedSessions;
