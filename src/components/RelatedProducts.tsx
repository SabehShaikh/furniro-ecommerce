'use client'

import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { useState, useEffect } from 'react'

type ProductDetails = {
    _id: string;
    title: string;
    productImage: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    isNew: boolean;
    tags: string[];
    description?: string;
    quantity: number;
  };
  


const RelatedProducts = () => {
      const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([]);

      useEffect(() => {
          const fetchRelatedProducts = async () => {
            try {
              const query = `*[_type == "product"] | order(_createdAt desc)[0..3] {
                _id,
                title,
                "productImage": productImage.asset->url,
                price,
                originalPrice,
                discountPercentage,
                isNew,
                tags
              }`;
              const data = await client.fetch(query);
              setRelatedProducts(data);
            } catch (error) {
              console.error("Error fetching related products:", error);
            }
          };
      
          fetchRelatedProducts();
        }, []);
      
  return (
    <div>
         <div className="container mx-auto px-4 py-8 border-b">
              <h2 className="text-3xl font-medium mb-6 text-center text-[#3A3A3A]">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                  >
                    <div className="relative w-full h-64">
                      <Image
                        src={urlFor(product.productImage).url()}
                        alt={product.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                      {product.discountPercentage && (
                        <span className="absolute top-4 right-4 bg-[#E97171] text-white px-3 py-1 rounded-lg">
                          -{product.discountPercentage}%
                        </span>
                      )}
                      {product.isNew && (
                        <span className="absolute top-4 left-4 bg-[#2EC1AC] text-white px-3 py-1 rounded-lg">
                          New
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-bold text-gray-900">
                          Rs {product.price.toLocaleString()}
                        </span>
                        {product.discountPercentage && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="bg-[#B88E2F] text-white py-2 px-4 w-full rounded-b-lg hover:bg-[#9e7a28] transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-8 mx-auto block bg-white border border-[#B88E2F] text-[#B88E2F] py-2 px-6 rounded-md text-sm font-poppins font-semibold text-base leading-[150%]">
                Show More
              </button>
            </div>
    </div>
  )
}

export default RelatedProducts
