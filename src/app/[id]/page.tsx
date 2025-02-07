"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

const ProductDetail = ({ params }: any) => {
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);

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
      setBasePrice(fetchedProduct.price);
      setTotalPrice(fetchedProduct.price);

      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find((item: any) => item._id === params.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
        setTotalPrice(fetchedProduct.price + (existingItem.quantity - 1) * fetchedProduct.price);
      }
    };
    fetchProduct();
  }, [params.id]);

  const updateCart = (newQuantity: number) => {
    if (!product) return;
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cartItems.filter((item: any) => item._id !== product._id);

    if (newQuantity > 0) {
      updatedCart.push({ ...product, quantity: newQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setQuantity(newQuantity);
    setTotalPrice(basePrice + (newQuantity - 1) * basePrice);
  };

  const handleIncrement = () => {
    updateCart(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateCart(quantity - 1);
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center md:justify-start">
          <Image src={product.imageUrl} alt={product.title} width={500} height={300} className="rounded-lg shadow-md w-full max-w-[400px] object-contain" />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl text-gray-700">{`Total Price: $${totalPrice.toFixed(2)}`}</p>

          <div className="flex flex-wrap space-x-4 mt-4">
            {product.discountPercentage && (
              <span className="text-sm text-red-600 bg-red-200 px-2 py-1 rounded-full">{product.discountPercentage}% OFF</span>
            )}
            {product.isNew && (
              <span className="text-sm text-green-600 bg-green-200 px-2 py-1 rounded-full">New</span>
            )}
          </div>

          <div className="flex flex-wrap mt-4 space-x-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex items-center space-x-4">
              <button onClick={handleDecrement} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">-</button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button onClick={handleIncrement} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+</button>
            </div>
            <button onClick={() => (window.location.href = "/checkout")} className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">Back to Products</Link>
      </div>
    </main>
  );
};

export default ProductDetail;