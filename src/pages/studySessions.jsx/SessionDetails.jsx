import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/UseAxios";
import { useAuth } from "../../hooks/UseAuth";

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Tutor:</span> {session.tutorName}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Average Rating:</span> {session.averageRating || 0}
      </p>
      <p className="text-gray-700 mb-2">{session.description}</p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Registration Start:</span>{" "}
        {new Date(session.registrationStart).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Registration End:</span>{" "}
        {new Date(session.registrationEnd).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Class Start:</span>{" "}
        {new Date(session.classStart).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Class End:</span>{" "}
        {new Date(session.classEnd).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Duration:</span> {session.duration}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Registration Fee:</span>{" "}
        {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
      </p>

      <button
        disabled={!canBook}
        onClick={handleBookNow}
        className={`btn px-5 py-2 rounded-lg ${
          canBook ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {registrationClosed ? "Registration Closed" : "Book Now"}
      </button>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="p-3 border rounded-lg bg-gray-50">
              <p className="font-semibold">{rev.studentName}</p>
              <p>Rating: {rev.rating}</p>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionDetails;
