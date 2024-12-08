"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const SingleProduct = () => {
  const thumbnails = [
    "/images/product-sofa.png",
    "/images/productImg2.png",
    "/images/productImg3.png",
    "/images/productImg4.png",
  ];

  const galleryImages = [
    "/images/descriptionImg1.png",
    "/images/descriptionImg2.png",
  ];

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-12 bg-[#F9F5F0]">
      {/* Breadcrumb */}
      <div className="text-sm bg-[#F9F1E7] text-gray-600 py-4 px-4 rounded-md mb-6">
        <span>Home</span> &gt; <span>Shop</span> &gt;{" "}
        <span className="font-medium text-black">Asgaard Sofa</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Section: Images */}
        <div className="flex flex-col items-center">
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/product-sofa.png"
              alt="Asgaard Sofa"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex mt-4 space-x-3">
            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Asgaard Sofa
          </h1>
          <p className="text-[#B88E2F] text-xl font-semibold mb-4">
            Rs. 250,000.00
          </p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={24} />
              ))}
              <Star size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-600 ml-3 text-sm">(4 Customer Reviews)</p>
          </div>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed">
            Asgaard sofa is one of the loudest speakers in its class. The sleek
            design combined with a powerful sound system makes it ideal for
            music enthusiasts and casual living room users alike.
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium">Colors:</span>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-800 rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-[#B88E2F] rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-gray-400 rounded-full cursor-pointer"></div>
            </div>
          </div>
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-2 text-gray-700"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-2 text-gray-700"
              >
                +
              </button>
            </div>
            <button className="px-6 py-2 bg-[#B88E2F] text-white rounded-md">
              Add To Cart
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-800 rounded-md">
              Compare
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>SKU: 55031</p>
            <p>Category: Sofa</p>
            <p>Tags: Sofa, Chair, Home, Shop</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div>
        <ul className="flex border-b text-gray-600 text-sm mb-6">
          <li className="px-4 py-2 cursor-pointer border-b-2 border-[#B88E2F]">
            Description
          </li>
          <li className="px-4 py-2 cursor-pointer">Additional Information</li>
          <li className="px-4 py-2 cursor-pointer">Reviews [5]</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 text-sm leading-relaxed">
            Embracing the raw, weathered spirit of rock 'n' roll, the Asgaard
            sofa takes the unmistakable look and feel of bohemian industrial
            upholstery to new heights. Its sturdy frame combined with premium
            materials ensures longevity and comfort for all living spaces.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
