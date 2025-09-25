import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState } from "react";
import UseAxios from "../../hooks/UseAxios";

const StudySessions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-sessions"],
    queryFn: async () => {
      const axiosInstance = UseAxios();
      const res = await axiosInstance.get("/sessions/approved"); // only approved fetch
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading sessions...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load sessions.</p>
    );

  // Pagination calculation
  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSessions = sessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
    Study Sessions
  </h1>

  {sessions.length === 0 ? (
    <p className="text-center text-gray-600">No study sessions available.</p>
  ) : (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {session.title}
            </h2>
            <p className="text-gray-600 mb-3">
              {session.description.slice(0, 100)}...
            </p>
            <p className="mb-3">
              <span className="font-medium text-gray-700">Status:</span>{" "}
              {new Date(session.registrationEnd) < new Date() ? (
                <span className="text-red-500 font-semibold">Closed</span>
              ) : (
                <span className="text-green-600 font-semibold">Ongoing</span>
              )}
            </p>
            <Link
              to={`/sessions/${session._id}`}
              className="inline-block w-full text-center px-4 py-2 rounded-lg font-semibold 
              bg-gradient-to-r from-orange-400 to-orange-600 text-white  
              shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-10">
        <nav className="flex items-center gap-2">
          {/* Prev Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg font-medium 
            border border-gray-300 text-gray-600 bg-white 
            transition-transform duration-300 hover:scale-105 hover:bg-orange-50 hover:border-orange-400 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-transform duration-300 hover:scale-105 ${
                currentPage === num + 1
                  ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold  shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-400"
              }`}
            >
              {num + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg font-medium 
            border border-gray-300 text-gray-600 bg-white 
            transition-transform duration-300 hover:scale-105 hover:bg-orange-50 hover:border-orange-400 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </nav>
      </div>
    </>
  )}
</div>

  );
};

export default StudySessions;
