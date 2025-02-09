"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import toast, { Toaster } from "react-hot-toast";
import { cartAtom } from "../../../stor";
import CheckoutButton from "../components/CheckoutPage"

const CartPage: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);

  // Function to remove a specific item from the cart
  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    toast.success("Item removed from cart!");
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared!");
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toaster for displaying toast notifications */}
      <Toaster />

      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">Your cart is empty.</p>
          <Link href="/">
            <div className="text-blue-600 hover:underline">Go to Products</div>
          </Link>
        </div>
      ) : (
        <>
          {/* Clear Cart Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item: any) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex flex-col shadow-sm hover:shadow-lg transition"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-2">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                <p className="text-gray-900 font-semibold mb-4">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
      
         
           <div className="md:w-32">
              <CheckoutButton />
           </div>
      
          
       
        </>
      )}
    </main>
  );
};

export default CartPage;
