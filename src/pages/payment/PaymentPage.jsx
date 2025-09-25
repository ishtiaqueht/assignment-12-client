import React from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

// ✅ Load Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  // ✅ Get session details
  const { data: session, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading payment...</p>;

  return (
    <section className="max-w-xl mx-auto mt-10 p-1 rounded-2xl">
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl">
{/* Decorative gradient blob */}
<div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-tr from-indigo-200 via-pink-100 to-transparent opacity-60 blur-3xl"></div>


<div className="p-6 md:p-8">
{/* Header */}
<div className="flex items-center justify-between gap-4">
<div>
<h3 className="text-lg md:text-2xl font-semibold text-gray-900">Pay for</h3>
<p className="text-xl md:text-3xl font-bold leading-tight text-slate-900">{session?.title}</p>
</div>


<div className="flex shrink-0 items-center gap-3 rounded-lg bg-white/60 px-3 py-2 backdrop-blur">
<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
<path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v3H7a2 2 0 00-2 2v5H4a2 2 0 01-2-2V5z" />
<path d="M12 12h6v3a2 2 0 01-2 2h-4v-5z" />
</svg>
<div className="text-right">
<div className="text-xs text-slate-500">Amount</div>
<div className="text-sm font-medium text-slate-800">${session?.registrationFee}</div>
</div>
</div>
</div>


{/* Subtext */}
<p className="mt-4 text-sm text-slate-600">Secure payment powered by Stripe. Your card details are handled safely and never touch our servers.</p>


{/* Form + card container */}
<div className="mt-6 rounded-xl bg-white p-5 shadow-md">
<Elements stripe={stripePromise}>
<CheckoutForm session={session} />


{/* subtle helper row */}
<div className="mt-4 flex items-center justify-between text-xs text-slate-500">
<span>Test cards: 4242 4242 4242 4242</span>
<span>Secure • PCI compliant</span>
</div>
</Elements>
</div>


</div>
</div>
</section>
  );
};

export default PaymentPage;
