import React from "react";
import Image from "next/image";

const productData = [
  {
    id: 1,
    name: "Syltherine",
    image: "/images/syltherine.png",
    price: 2500000,
    originalPrice: 3500000,
    discount: 30,
    isSale: true,
    type: "Stylish cafe chair",
  },
  {
    id: 2,
    name: "Leviosa",
    image: "/images/leviosa.png",
    price: 2500000,
    type: "Stylish cafe chair",
  },
  {
    id: 3,
    name: "Lolito",
    image: "/images/lolito.png",
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    isSale: true,
    type: "Luxury big sofa",
  },
  {
    id: 4,
    name: "Respira",
    image: "/images/respira.png",
    price: 500000,
    type: "Outdoor bar table and stool",
    tag: "New",
  },
  {
    id: 5,
    name: "Grifo",
    image: "/images/grifo.png",
    price: 1500000,
    type: "Night lamp",
  },
  {
    id: 6,
    name: "Muggo",
    image: "/images/muggo.png",
    price: 150000,
    type: "Small mug",
    tag: "New",
  },
  {
    id: 7,
    name: "Pingky",
    image: "/images/pingky.png",
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    isSale: true,
    type: "Cute bed set",
  },
  {
    id: 8,
    name: "Potty",
    image: "/images/potty.png",
    price: 500000,
    type: "Minimalist flower pot",
    tag: "New",
  },
];

const Product = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#3A3A3A]">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-[#F4F5F7]  rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group"
          >
            {/* Image Section */}
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={225}
                className="w-full h-64 object-cover"
              />
              {/* Discount Tag */}
              {product.isSale && (
                <span className="absolute top-2 right-2 bg-[#E97171] text-white px-2 py-1 rounded-lg text-sm">
                  -{product.discount}%
                </span>
              )}
              {/* New Tag */}
              {product.tag && (
                <span className="absolute top-2 right-2 bg-[#2EC1AC] text-white px-2 py-1 rounded-lg text-sm">
                  {product.tag}
                </span>
              )}
              {/* Add to Cart Button */}
              <button className="absolute inset-x-0 bottom-0 bg-black text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Add to Cart
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.type}</p>
              <div className="mt-2">
                {product.isSale ? (
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      Rp {product.originalPrice?.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    Rp {product.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      <button className="mt-8 mx-auto block bg-white border border-[#B88E2F] text-[#B88E2F] py-2 px-6 rounded-md text-sm font-poppins font-semibold text-base leading-[150%]">
        Show More
      </button>
    </div>
  );
};

export default Product;
