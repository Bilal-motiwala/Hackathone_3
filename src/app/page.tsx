"use client"

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Products from './components/Products';


const stripePromise = loadStripe('your-publishable-key-here');

const App = () => {
  const [amount, setAmount] = useState(100); // Example amount, set this as needed

  const convertToSubCurrency = (amount: number) => {
    return amount * 100; // Convert dollars to cents
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-full  bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center">
 
        <Products />

      </div>
    </main>
  );
};

export default App;