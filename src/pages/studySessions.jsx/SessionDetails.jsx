import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/UseAxios";
import useAuth from "../../hooks/UseAuth";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useAuth();

  // ✅ Fetch single session
  const { data: session, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${id}`);
      return res.data;
    },
  });

  // ✅ Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["sessionReviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${id}/reviews`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading session...</p>;

  const registrationClosed = new Date(session.registrationEnd) < new Date();
  const canBook =
    !registrationClosed && user && user.role === "student";

  const handleBookNow = async () => {
    if (!canBook) return;
    try {
      if (session.registrationFee > 0) {
        // Redirect to payment page
        window.location.href = `/payment/${session._id}`;
      } else {
        // Free booking
        await axiosInstance.post("/bookedSessions", {
          sessionId: session._id,
          studentEmail: user.email,
          tutorEmail: session.tutorEmail,
          bookedAt: new Date().toISOString(),
        });
        alert("Session booked successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to book session");
    }
  };

  return (
   <div className="max-w-5xl mx-auto px-4 py-10">
  {/* Session Header */}
  <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">
    <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
      {session.title}
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold">👨‍🏫 Tutor:</span> {session.tutorName}
      </p>
      <p>
        <span className="font-semibold">⭐ Average Rating:</span>{" "}
        {session.averageRating || 0}
      </p>
      <p className="md:col-span-2">{session.description}</p>
    </div>
  </div>

  {/* Session Info */}
  <div className="bg-gray-50 shadow-md rounded-xl p-6 mb-8 border">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
      📅 Session Information
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold">Registration Start:</span>{" "}
        {new Date(session.registrationStart).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Registration End:</span>{" "}
        {new Date(session.registrationEnd).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Class Start:</span>{" "}
        {new Date(session.classStart).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Class End:</span>{" "}
        {new Date(session.classEnd).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Duration:</span> {session.duration}
      </p>
      <p>
        <span className="font-semibold">Fee:</span>{" "}
        {session.registrationFee === 0
          ? "Free"
          : `$${session.registrationFee}`}
      </p>
    </div>
  </div>

  {/* Book Button */}
  <div className="text-center mb-10">
    <button
      disabled={!canBook}
      onClick={handleBookNow}
      className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
        canBook
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-400 text-gray-100 cursor-not-allowed"
      }`}
    >
      {registrationClosed ? "Registration Closed" : "Book Now"}
    </button>
  </div>

  {/* Reviews Section */}
  <div className="bg-white shadow-lg rounded-xl p-6 border">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">💬 Reviews</h2>
    {reviews.length === 0 ? (
      <p className="text-gray-600 italic">No reviews yet.</p>
    ) : (
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <p className="font-semibold text-blue-600">{rev.studentName}</p>
            <p className="text-yellow-600">⭐ {rev.rating}</p>
            <p className="text-gray-700">{rev.comment}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default SessionDetails;
