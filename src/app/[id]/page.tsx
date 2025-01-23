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

  // Fetch product data
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
    };
    fetchProduct();
  }, [params.id]);

  // Handle adding product to cart
  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newProduct = { ...product, quantity: 1 };
    localStorage.setItem("cart", JSON.stringify([...currentCart, newProduct]));
    alert("Added to cart!");
  };

  // Handle buy now (redirect to checkout)
  const handleBuyNow = () => {
    // Assuming you're redirecting to a checkout page
    localStorage.setItem("cart", JSON.stringify([{ ...product, quantity: 1 }]));
    window.location.href = "/checkout";  // Replace with your checkout page URL
  };

  if (!product) {
    return <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold">Loading Products...
      </h1>
      <div className="animate-spin h-24 w-24 rounded-full border-2 border-b-blue-800 mt-10"></div>
    </div>
  }


  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={300}
            className="rounded-lg shadow-md w-full max-w-[400px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          {/* Product Price */}
          <p className="text-xl text-gray-700">{`$${product.price.toFixed(2)}`}</p>

          {/* Discount & New Badge */}
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

          {/* Product Tags */}
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

          {/* Product Description */}
          <p className="text-gray-600">{product.description}</p>

          {/* Add to Cart or Buy Button */}
          <div className="flex flex-col space-y-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Back to Products Link */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    </main>
  );
};

export default ProductDetail;
