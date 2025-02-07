"use client"

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutPage from './components/CheckoutPage';
import Header from './components/Header';
import Products from './components/Products';
import Footer from './components/Footer';

const stripePromise = loadStripe('your-publishable-key-here');

const App = () => {
  const [amount, setAmount] = useState(100); // Example amount, set this as needed

  const convertToSubCurrency = (amount: number) => {
    return amount * 100; // Convert dollars to cents
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500 p-6">
      <div className="w-full max-w-4xl bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Muhammad Bilal</h1>
        <h2 className="text-2xl mb-6">
          has requested 
          <span className="font-bold">${amount}</span>
        </h2>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "usd",
          }}
        >
          {/* <CheckoutPage amount={amount} /> */}
        </Elements>
        <Header />
        <Products />
        <Footer />
      </div>
    </main>
  );
};

export default App;