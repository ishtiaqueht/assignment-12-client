import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../hooks/UseAxios";

const StudySessions = () => {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Study Sessions</h1>

      {sessions.length === 0 ? (
        <p className="text-center">No study sessions available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="card bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
              <p className="text-gray-600 mb-3">
                {session.description.slice(0, 100)}...
              </p>
              <p className="mb-3">
                <span className="font-medium">Status:</span>{" "}
                {new Date(session.registrationEnd) < new Date() ? (
                  <span className="text-red-500 font-semibold">Closed</span>
                ) : (
                  <span className="text-green-600 font-semibold">Ongoing</span>
                )}
              </p>
              <Link
                to={`/sessions/${session._id}`}
                className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudySessions;
