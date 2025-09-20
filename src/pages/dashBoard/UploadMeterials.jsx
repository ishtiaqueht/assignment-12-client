import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UseAxios from "../../hooks/UseAxios";
import useAuth from "../../hooks/UseAuth";

const UploadMaterials = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    studySessionId: "",
    tutorEmail: user?.email || "",
    image: "",
    link: "",
  });

  // ✅ Fetch only approved sessions of this tutor
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/sessions?status=approved&tutorEmail=${user.email}`)
        .then((res) => setSessions(res.data))
        .catch(() => toast.error("Failed to fetch sessions ❌"));
    }
  }, [user, axiosInstance]);

  // ✅ Upload material
  const uploadMutation = useMutation({
    mutationFn: async (newMaterial) => {
      const res = await axiosInstance.post("/materials", newMaterial);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Material uploaded ✅");
      setFormData({
        title: "",
        studySessionId: "",
        tutorEmail: user?.email,
        image: "",
        link: "",
      });
    },
    onError: () => toast.error("Upload failed ❌"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studySessionId) {
      toast.error("Please select a session!");
      return;
    }
    uploadMutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Upload Study Materials
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 grid gap-4"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Select Approved Session */}
        <div>
          <label className="block font-medium mb-1">Select Session</label>
          <select
            value={formData.studySessionId}
            onChange={(e) =>
              setFormData({ ...formData, studySessionId: e.target.value })
            }
            className="select select-bordered w-full"
            required
          >
            <option value="">-- Select Your Approved Session --</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title} (ID: {s._id})
              </option>
            ))}
          </select>
        </div>

        {/* Readonly Session ID */}
        {formData.studySessionId && (
          <div>
            <label className="block font-medium mb-1">Study Session ID</label>
            <input
              type="text"
              value={formData.studySessionId}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        {/* Tutor Email */}
        <div>
          <label className="block font-medium mb-1">Tutor Email</label>
          <input
            type="email"
            value={formData.tutorEmail}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Image Link */}
        <div>
          <label className="block font-medium mb-1">Image Link</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="input input-bordered w-full"
            placeholder="Paste ImgBB or image URL"
            required
          />
        </div>

        {/* Google Drive Link */}
        <div>
          <label className="block font-medium mb-1">Google Drive Link</label>
          <input
            type="text"
            value={formData.link}
            onChange={(e) =>
              setFormData({ ...formData, link: e.target.value })
            }
            className="input input-bordered w-full"
            placeholder="Paste Google Drive document link"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4 bg-orange-500 hover:bg-orange-600 text-white"
          disabled={uploadMutation.isLoading}
        >
          {uploadMutation.isLoading ? "Uploading..." : "Upload Material"}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
