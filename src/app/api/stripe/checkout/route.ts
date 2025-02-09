// /src/app/api/stripe/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';


const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!stripeSecretKey) throw new Error("Stripe Secret Key is missing");
if (!baseUrl) throw new Error("Base URL is missing");

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
});

export const POST = async (req: NextRequest) => {
    interface Product {
        _id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
        imageUrl: string;
        isNew: boolean;
        discountPercentage: number | null;
        tags: string[];
      }
    
  try {
    // Parse the request body
    const { cart } = await req.json();

    // Validate addCart and billingDetails
 


    // Initialize total price and total quantity
    let totalPrice = 0;
    let totalItemsQuantity = 0;

    // Map cart items to Stripe line items
    const lineItems = cart.map((item: Product) => {
      if (isNaN(item.price) || isNaN(item.quantity)) {
        throw new Error(`Invalid price or quantity for item: ${item.title}`);
      }

      totalPrice += Math.round(item.price * item.quantity * 100);
      totalItemsQuantity += item.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.imageUrl],
            metadata: {
              heading: 'Product Details',
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

 

    // Return session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
