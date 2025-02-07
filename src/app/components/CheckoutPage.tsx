
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import convertToSubCurrency from "../lib/ConvertToSubCurrency";

// const CheckoutPage = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setError] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       setLoading(false);
//       return;
//     }

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setError(errorMessage);
//       setLoading(false);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
//       },
//     });

//     if (error) {
//       setError(errorMessage);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
//           Secure Checkout
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {clientSecret ? <PaymentElement /> : <p>Loading payment details...</p>}
//           {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
//           <button
//             disabled={!stripe || loading}
//             className="w-full bg-black text-white font-bold py-3 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
//           >
//             {!loading ? `Pay $${amount}` : "Processing..."}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;