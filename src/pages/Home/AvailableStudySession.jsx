import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/UseAxios";

const AvailableStudySession = () => {
  const axios = useAxios();

  // ✅ Get only approved sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["approvedSessions"],
    queryFn: async () => {
      const res = await axios.get("/sessions/approved");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading sessions...</p>;

  // ✅ Show only first 6 sessions
  const limitedSessions = sessions.slice(0, 6);

  // ✅ Check ongoing / closed
  const getStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    return now >= startDate && now <= endDate ? "Ongoing" : "Closed";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-10">
        Available Study Sessions
      </h1>

      {limitedSessions.length === 0 ? (
        <p className="text-center text-gray-500">No available sessions.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {limitedSessions.map((session) => {
              const status = getStatus(
                session.registrationStart,
                session.registrationEnd
              );
              return (
                <div
                  key={session._id}
                  className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {session.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {session.description}
                    </p>

                    {/* Status Badge */}
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        status === "Ongoing"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Read More */}
                  <div className="mt-6 text-right">
                    <Link
                      to={`/sessions/${session._id}`}
                      className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ More Sessions Button */}
          <div className="text-center mt-10">
            <Link
              to="/studySessions"
              className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              More Sessions
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableStudySession;
