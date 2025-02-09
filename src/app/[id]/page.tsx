"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAtom } from "jotai";

import { client } from "@/sanity/lib/client";
import { cartAtom } from "../../../stor";

const ProductDetail = ({ params }: any) => {
  // Product interface (without quantity field)
  interface Product {
    title: string;
    discountPercentage: number | null;
    isNew: boolean;
    tags: string[];
    imageUrl: string;
    price: number;
    description: string;
    _id: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && _id == "${params.id}"][0]{
        title,
        discountPercentage,
        isNew,
        tags,
        "imageUrl": productImage.asset->url,
        price,
        description,
        _id,
      }`;
      const fetchedProduct = await client.fetch(query);
      setProduct(fetchedProduct);

      // If the product already exists in the cart, set the quantity accordingly.
      const existingItem = cart.find((item) => item._id === params.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    };

    fetchProduct();
  }, [params.id, cart]);

  const handleAddToCart = () => {
    if (!product) return;

    // Create a product object with a dynamic quantity field.
    const productWithQuantity = { ...product, quantity };

    // If the product already exists in the cart, add the current quantity;
    // otherwise, add it with the current quantity.
    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, productWithQuantity];
    }

    setCart(updatedCart);
    toast.success("Product added to cart!");

    // Reset the quantity to 1 after adding to the cart,
    // so each click adds one unit unless the user manually increments.
    setQuantity(1);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold">Loading Products...</h1>
        <div className="animate-spin h-24 w-24 rounded-full border-2 border-b-blue-800 mt-10"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toaster for Notifications */}
      <Toaster />

      {/* Navbar with Cart Count */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Link href="/cart" className="relative">
          <span className="text-xl font-semibold">
            🛒 Cart (
            {cart.reduce((acc: number, item: any) => acc + item.quantity, 0)}
            )
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center md:justify-start">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={300}
            className="rounded-lg shadow-md w-full max-w-[400px] object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl text-gray-700">
            {`Total Price: $${(product.price * quantity).toFixed(2)}`}
          </p>

          <div className="flex flex-wrap space-x-4 mt-4">
            {product.discountPercentage && (
              <span className="text-sm text-red-600 bg-red-200 px-2 py-1 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="text-sm text-green-600 bg-green-200 px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>

          <div className="flex flex-wrap mt-4 space-x-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex flex-col space-y-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Add to Cart (
              {cart.reduce((acc: number, item: any) => acc + item.quantity, 0)})
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    </main>
  );
};

export default ProductDetail;
