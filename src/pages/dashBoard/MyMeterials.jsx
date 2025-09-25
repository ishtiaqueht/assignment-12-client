import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyMaterials = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [editMaterial, setEditMaterial] = useState(null);

  // ✅ Fetch tutor’s uploaded materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/materials?role=tutor&email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Delete material
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/materials/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Material deleted ❌");
      queryClient.invalidateQueries(["materials", user?.email]);
    },
    onError: () => toast.error("Delete failed"),
  });

  const updateMutation = useMutation({
  mutationFn: async (updated) => {
    // শুধু allowed field পাঠাও
    const { _id, title, image, link } = updated;
    const res = await axiosInstance.put(`/materials/${_id}`, {
      title,
      image,
      link,
    });
    return res.data;
  },
  onSuccess: () => {
    toast.success("Material updated ✅");
    queryClient.invalidateQueries(["materials", user?.email]);
    setEditMaterial(null);
  },
  onError: () => toast.error("Update failed ❌"),
});


  if (isLoading) return <p className="text-center mt-8">Loading materials...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
        My Uploaded Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-gray-500 text-center">No materials uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div
              key={m._id}
              className="border rounded-xl shadow-md p-4 bg-white flex flex-col"
            >
              <img
                src={m.image}
                alt={m.title}
                className="h-40 object-cover rounded-lg mb-3"
              />
              <h4 className="font-bold text-lg mb-2">{m.title}</h4>
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-3"
              >
                View Resource
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditMaterial(m)}
                  className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(m._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Material</h3>
            <input
              type="text"
              value={editMaterial.title}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, title: e.target.value })
              }
              className="input input-bordered w-full mb-3"
            />
            <input
              type="text"
              value={editMaterial.link}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, link: e.target.value })
              }
              className="input input-bordered w-full mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditMaterial(null)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => updateMutation.mutate(editMaterial)}
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMaterials;
