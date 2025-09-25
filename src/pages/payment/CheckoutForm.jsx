import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/UseAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CheckoutForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Payment + booking
  const bookingMutation = useMutation({
    mutationFn: async (paymentIntentId) => {
      return await axiosInstance.post("/bookedSessions", {
        sessionId: session._id,
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        bookedAt: new Date().toISOString(),
        sessionTitle: session.title,
        registrationFee: session.registrationFee,
        paymentIntentId,
      });
    },
    onSuccess: () => {
      toast.success("Payment successful & session booked 🎉");
      navigate("/dashboard/booked-sessions");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Booking failed ❌");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    // ✅ Create PaymentIntent on backend
    const { data } = await axiosInstance.post("/create-payment-intent", {
      price: session.registrationFee,
    });

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
            name: user.displayName || "Anonymous",
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      bookingMutation.mutate(paymentIntent.id);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : `Pay $${session.registrationFee}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
