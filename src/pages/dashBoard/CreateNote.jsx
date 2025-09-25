import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const noteData = {
        email: user.email,
        title: data.title,
        description: data.description,
      };

      const res = await axiosSecure.post("/notes", noteData);
      if (res.data.insertedId) {
        toast.success("Note created successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create a Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter description"
            rows="4"
            className="w-full px-3 py-2 border rounded-lg"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
