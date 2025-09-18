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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Create Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <input {...register("title", { required: true })} placeholder="Session Title"
          className="w-full border p-2 rounded" />

        <input value={user?.displayName || ""} readOnly
          className="w-full border p-2 rounded bg-gray-100" />

        <input value={user?.email || ""} readOnly
          className="w-full border p-2 rounded bg-gray-100" />

        <textarea {...register("description", { required: true })}
          placeholder="Session Description" className="w-full border p-2 rounded" />

        <div className="grid grid-cols-2 gap-4">
          <input type="date" {...register("registrationStart", { required: true })} className="border p-2 rounded" />
          <input type="date" {...register("registrationEnd", { required: true })} className="border p-2 rounded" />
          <input type="date" {...register("classStart", { required: true })} className="border p-2 rounded" />
          <input type="date" {...register("classEnd", { required: true })} className="border p-2 rounded" />
        </div>

        <input {...register("duration", { required: true })} placeholder="Session Duration (e.g. 2 hours)"
          className="w-full border p-2 rounded" />

        <input value="0" readOnly
          className="w-full border p-2 rounded bg-gray-100" />

        <button type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateStudySession;
