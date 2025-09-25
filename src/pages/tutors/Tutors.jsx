import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/UseAxios";

const Tutors = () => {
  const axiosSecure = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch tutors
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "tutor");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading tutors...</p>;

  // Calculate pagination
  const totalPages = Math.ceil(tutors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTutors = tutors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
        Our Tutors
      </h1>

      {currentTutors.length === 0 ? (
        <p className="text-gray-500 text-center">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="relative group bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-6 flex flex-col items-center text-center"
            >
              {/* Profile image */}
              <div className="relative">
                <img
                  src={
                    tutor.photo ||
                    tutor.photoURL ||
                    "https://i.ibb.co/2M0ZQZk/avatar.png"
                  }
                  alt={tutor.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-orange-200 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 to-orange-100 opacity-0 group-hover:opacity-40 blur-2xl transition duration-500"></div>
              </div>

              {/* Name */}
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition">
                {tutor.name}
              </h2>

              {/* Email */}
              <p className="text-gray-600 text-sm">{tutor.email}</p>

              {/* Badge */}
              <span className="mt-3 px-4 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full shadow-sm">
                Tutor
              </span>

              {/* Animated Border on hover */}
              <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400 transition-all duration-500 pointer-events-none"></span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-orange-500 text-white disabled:bg-gray-300"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-orange-600 text-white"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-orange-500 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Tutors;
