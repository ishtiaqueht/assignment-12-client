import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaChalkboardTeacher, FaStar, FaCalendarAlt, FaClock, FaDollarSign, FaRegComments } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Fetch single session
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${id}`);
      return res.data;
    },
  });

  // ✅ Check if current student already booked
  const { data: bookingStatus } = useQuery({
    queryKey: ["bookingStatus", id, user?.email],
    enabled: !!user?.email && role === "student",
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bookedSessions/${id}/${user.email}`
      );
      return res.data;
    },
  });

  const alreadyBooked = bookingStatus?.booked;

  // ✅ Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["sessionReviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${id}/reviews`);
      return res.data;
    },
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // ✅ Add review (only for booked students)
  const reviewMutation = useMutation({
    mutationFn: async (newReview) => {
      await axiosInstance.post("/reviews", newReview);
    },
    onSuccess: () => {
      // Refresh reviews and session (to update averageRating)
      queryClient.invalidateQueries(["sessionReviews", id]);
      queryClient.invalidateQueries(["session", id]);
      setRating(5);
      setComment("");
      toast.success("Review added ✅");
    },
    onError: (err) => {
      // console.error("Add review error:", err);
      toast.error(err.response?.data?.message || "Failed to add review ❌");
    },
  });

  // ✅ Book session mutation
 const bookMutation = useMutation({
  mutationFn: async () => {
    if (session.registrationFee > 0) {
      navigate(`/payment/${session._id}`);
      return null; 
    } else {
      return await axiosInstance.post("/bookedSessions", {
        sessionId: session._id,
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        bookedAt: new Date().toISOString(),
        sessionTitle: session.title,
        registrationFee: session.registrationFee,
      });
    }
  },
  onSuccess: (data) => {
    if (data) {
      toast.success("Session booked successfully 🎉");
      queryClient.invalidateQueries(["session", id]);
      queryClient.invalidateQueries(["bookingStatus", id, user.email]);
    }
  },
  onError: (err) => {
    // console.error(err);
    toast.error(err.response?.data?.message || "Failed to book session ❌");
  },
});

  if (sessionLoading || roleLoading)
    return <p className="text-center mt-10">Loading session...</p>;

  const registrationClosed = new Date(session.registrationEnd) < new Date();
  const canBook = !registrationClosed && role === "student" && !alreadyBooked;

  const handleBookNow = () => {
    if (!canBook) return;
    bookMutation.mutate();
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to add a review");
    if (!alreadyBooked) return toast.error("You must book this session first");

    const newReview = {
      sessionId: session._id,
      studentEmail: user.email,
      studentName: user.displayName || "Anonymous",
      rating,
      comment,
    };
    reviewMutation.mutate(newReview);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
  {/* Session Header */}
  <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold  shadow-lg rounded-xl p-6 mb-8">
    <h1 className="text-3xl font-bold mb-4 text-center drop-shadow-lg">
      {session.title}
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p className="flex items-center gap-2">
        <FaChalkboardTeacher className="text-xl" /> 
        <span className="font-semibold">Tutor:</span> {session.tutorName}
      </p>
      <p className="flex items-center gap-2">
        <FaStar className="text-yellow-300 text-xl" /> 
        <span className="font-semibold">Average Rating:</span>{" "}
        {session.averageRating || 0}
      </p>
      <p className="md:col-span-2">{session.description}</p>
    </div>
  </div>

  {/* Session Info */}
  <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
      <FaCalendarAlt className="text-orange-500" /> Session Information
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p className="flex items-center gap-2">
        <MdOutlineDateRange className="text-blue-500" />
        <span className="font-semibold">Registration Start:</span>{" "}
        {new Date(session.registrationStart).toLocaleString()}
      </p>
      <p className="flex items-center gap-2">
        <MdOutlineDateRange className="text-red-500" />
        <span className="font-semibold">Registration End:</span>{" "}
        {new Date(session.registrationEnd).toLocaleString()}
      </p>
      <p className="flex items-center gap-2">
        <FaClock className="text-green-500" />
        <span className="font-semibold">Class Start:</span>{" "}
        {new Date(session.classStart).toLocaleString()}
      </p>
      <p className="flex items-center gap-2">
        <FaClock className="text-purple-500" />
        <span className="font-semibold">Class End:</span>{" "}
        {new Date(session.classEnd).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Duration:</span> {session.duration}
      </p>
      <p className="flex items-center gap-2">
        <FaDollarSign className="text-green-600" />
        <span className="font-semibold">Fee:</span>{" "}
        {session.registrationFee === 0
          ? "Free"
          : `$${session.registrationFee}`}
      </p>
    </div>
  </div>

  {/* Book Button */}
  {role === "student" && (
    <div className="text-center mb-10">
      <button
        disabled={!canBook}
        onClick={handleBookNow}
        className={`px-8 py-3 text-lg font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 ${
          !canBook
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
        }`}
      >
        {alreadyBooked
          ? "Booked"
          : registrationClosed
          ? "Registration Closed"
          : "Book Now"}
      </button>
    </div>
  )}

  {/* Reviews Section */}
  <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
      <FaRegComments className="text-pink-500" /> Reviews
    </h2>
    {reviews.length === 0 ? (
      <p className="text-gray-600 italic">No reviews yet.</p>
    ) : (
      <div className="space-y-4 mb-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-blue-600">{rev.studentName}</p>
            <p className="text-yellow-600 flex items-center gap-1">
              <FaStar /> {rev.rating}
            </p>
            <p className="text-gray-700">{rev.comment}</p>
          </div>
        ))}
      </div>
    )}

    {/* Review Form */}
    {role === "student" && alreadyBooked && (
      <form onSubmit={handleAddReview} className="space-y-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded w-24"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition"
        >
          Submit Review
        </button>
      </form>
    )}
  </div>
</div>
  );
};

export default SessionDetails;
