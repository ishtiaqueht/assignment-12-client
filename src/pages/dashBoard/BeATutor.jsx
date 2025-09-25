import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/UseAxios";

const BeATutor = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      // backend URL handled by hook
      return axios.patch("/users/request-tutor", data);
    },
    onSuccess: () => {
      toast.success("Tutor request sent successfully ✅");
      reset();
    },
    onError: (err) => {
      // console.error("Tutor request failed:", err.response);
      toast.error(err.response?.data?.message || "Failed to send request ❌");
    },
  });

  const onSubmit = (data) => {
    if (!user?.email) {
      toast.error("User not logged in ❌");
      return;
    }
    mutation.mutate({ email: user.email, reason: data.reason });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Request to be a Tutor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Why do you want to be a tutor?</label>
          <textarea
            {...register("reason", { required: true })}
            placeholder="Write your reason..."
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BeATutor;
