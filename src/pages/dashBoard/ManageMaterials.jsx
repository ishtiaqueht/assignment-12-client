import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

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
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Materials</h1>

      {materials.length === 0 ? (
        <p className="text-center text-gray-600">No materials found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-left">Uploaded At</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{material.studySessionId}</td>
                  <td className="p-3">{material.title}</td>
                  <td className="p-3">{material.tutorName || material.tutorEmail}</td>
                  <td className="p-3">{new Date(material.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteMutation.mutate(material._id)}
                      disabled={deleteMutation.isLoading}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {materials.map((material) => (
              <div
                key={material._id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <p className="font-semibold text-gray-700 mb-1">
                  <span className="text-gray-500">Id:</span> {material.studySessionId}
                </p>
                <p className="font-semibold text-gray-700 mb-1">
                  <span className="text-gray-500">Title:</span> {material.title}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="text-gray-500">Tutor:</span> {material.tutorName || material.tutorEmail}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="text-gray-500">Uploaded At:</span>{" "}
                  {new Date(material.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => deleteMutation.mutate(material._id)}
                  disabled={deleteMutation.isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
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
