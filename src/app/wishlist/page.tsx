"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  productImage: string;
  price: number;
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Dispatch custom event
    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.error("Product removed from wishlist!", {
      position: "bottom-right",
      autoClose: 2500,
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={product.productImage}
                alt={product.title}
                width={150}
                height={150}
                className="object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500">${product.price}</p>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;
