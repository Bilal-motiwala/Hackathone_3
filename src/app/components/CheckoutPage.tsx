"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

import { cartAtom } from "../../../stor"; // Adjust the path as needed

const CheckoutButton = () => {
  // Get the cart and its setter from the global Jotai store
  const [cart, setCart] = useAtom(cartAtom);

  // State to store the loaded Stripe instance
  const [stripe, setStripe] = useState<Stripe | null>(null);
  // Loading state for when the checkout session is being created
  const [isLoading, setIsLoading] = useState(false);

  console.log("Checkout page - cart:", cart);

  // Load Stripe on component mount
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      .then((loadedStripe) => {
        setStripe(loadedStripe);
      })
      .catch((error) => {
        console.error("Error loading Stripe:", error);
      });
  }, []);

  const handleCheckout = async () => {
    if (!stripe) {
      console.error("Stripe has not loaded yet!");
      return;
    }

    setIsLoading(true);

    try {
      // Send the cart data as an object so the backend can access it via req.body.cart
      const payload = { cart };
      console.log("Payload being sent:", payload);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to create checkout session");
        toast.error("Failed to create checkout session");
        setIsLoading(false);
        return;
      }

      const { sessionId } = await res.json();

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe Checkout Error:", error);
          toast.error(`Stripe Checkout Error: ${error.message}`);
        }
      } else {
        console.error("No session ID returned from server");
        toast.error("No session ID returned from server");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toaster for toast notifications */}
      <Toaster />

      <motion.button
        className={`${
          !stripe || isLoading || cart.length === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-green-700"
        } w-full text-white p-3 rounded-md mt-4 flex justify-center items-center`}
        onClick={handleCheckout}
        disabled={!stripe || isLoading || cart.length === 0}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isLoading ? (
          <ClipLoader size={30} color="#fff" loading={isLoading} />
        ) : (
          "Checkout"
        )}
      </motion.button>
    </>
  );
};

export default CheckoutButton;
