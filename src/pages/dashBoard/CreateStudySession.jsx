import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

const CreateStudySession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/sessions", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Session created successfully! ✅ (Waiting for approval)");
      reset();
    },
    onError: () => {
      toast.error("Failed to create session ❌");
    },
  });

  const onSubmit = (data) => {
    const sessionData = {
      ...data,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      registrationFee: 0, // default
      status: "pending",
    };
    mutation.mutate(sessionData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg mt-8 border border-orange-100">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        Create Study Session
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Session Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Session Title
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter session title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Name
            </label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Email
            </label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write about the session..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Registration Start
            </label>
            <input
              type="date"
              {...register("registrationStart", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Registration End
            </label>
            <input
              type="date"
              {...register("registrationEnd", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Class Start
            </label>
            <input
              type="date"
              {...register("classStart", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Class End
            </label>
            <input
              type="date"
              {...register("classEnd", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Duration
          </label>
          <input
            {...register("duration", { required: true })}
            placeholder="e.g. 2 hours"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Default Participants */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Registration Fee
          </label>
          <input
            value="0"
            readOnly
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
