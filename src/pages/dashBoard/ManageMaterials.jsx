import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaBook, FaTrash } from "react-icons/fa";

const ManageMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/materials/${id}`),
    onSuccess: () => {
      toast.success("Material deleted ✅");
      queryClient.invalidateQueries(["materials"]);
    },
    onError: () => toast.error("Failed to delete ❌"),
  });

  if (isLoading) return <p className="text-center mt-10">Loading materials...</p>;

  return (
   <div className="max-w-6xl mx-auto py-10 px-4">
  <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 flex items-center justify-center gap-2">
    <FaBook className="text-blue-600" /> Manage Materials
  </h1>

  {materials.length === 0 ? (
    <p className="text-center text-gray-600 italic">No materials found.</p>
  ) : (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table w-full border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
            <th className="p-4 text-left font-semibold">ID</th>
            <th className="p-4 text-left font-semibold">Title</th>
            <th className="p-4 text-left font-semibold">Tutor</th>
            <th className="p-4 text-left font-semibold">Uploaded At</th>
            <th className="p-4 text-center font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, idx) => (
            <tr
              key={material._id}
              className={`transition hover:bg-blue-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="p-4 font-mono text-sm text-gray-700">
                {material.studySessionId}
              </td>
              <td className="p-4 font-medium text-gray-800">{material.title}</td>
              <td className="p-4 text-gray-700">
                {material.tutorName || material.tutorEmail}
              </td>
              <td className="p-4 text-gray-600">
                {new Date(material.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => deleteMutation.mutate(material._id)}
                  disabled={deleteMutation.isLoading}
                  className="flex items-center gap-2 justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50"
                >
                  <FaTrash />
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-5">
        {materials.map((material) => (
          <div
            key={material._id}
            className="border p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <p className="font-semibold text-gray-800 mb-2">
              <span className="text-gray-500">ID:</span>{" "}
              <span className="font-mono">{material.studySessionId}</span>
            </p>
            <p className="font-semibold text-gray-800 mb-2">
              <span className="text-gray-500">Title:</span> {material.title}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="text-gray-500">Tutor:</span>{" "}
              {material.tutorName || material.tutorEmail}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="text-gray-500">Uploaded At:</span>{" "}
              {new Date(material.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => deleteMutation.mutate(material._id)}
              disabled={deleteMutation.isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50"
            >
              <FaTrash />
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
  );
};

export default ManageMaterials;
