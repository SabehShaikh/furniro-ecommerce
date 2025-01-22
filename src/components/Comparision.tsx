"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  _id: string;
  title: string;
  productImage: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isNew?: boolean;
  tags?: string[];
  description?: string;
}

interface ComparisonProps {
  cartItems: Product[];
  allProducts: Product[]; // For dropdown selection
}

const Comparison = ({ cartItems, allProducts }: ComparisonProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    cartItems.map((item) => item._id).slice(0, 1)
  );

  // Filter out products that are already selected
  const availableProducts = allProducts
    .filter((product) => !selectedProducts.includes(product._id))
    .slice(0, 5); // Limit to 5 products in dropdown

  const handleProductSelect = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Mock ratings data since it's not in the API
  const getRating = () => {
    const ratings = {
      rating: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
      reviews: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
    };
    return ratings;
  };
  

  // Comparison sections focused on available data
  const sections = [
    {
      title: "Price Information",
      rows: [
        {
          label: "Current Price",
          getValue: (product: Product) =>
            `Rs. ${product.price.toLocaleString()}`,
        },
        {
          label: "Original Price",
          getValue: (product: Product) =>
            product.originalPrice
              ? `Rs. ${product.originalPrice.toLocaleString()}`
              : "No discount",
        },
        {
          label: "Discount",
          getValue: (product: Product) =>
            product.discountPercentage
              ? `${product.discountPercentage}% off`
              : "No discount",
        },
      ],
    },
    {
      title: "Features",
      rows: [
        {
          label: "Tags",
          getValue: (product: Product) => product.tags?.join(", ") || "No tags",
        },
        {
          label: "Status",
          getValue: (product: Product) =>
            product.isNew ? "New Arrival" : "Regular Item",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Selection Area */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compare Products</h2>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedProducts.map((productId) => {
            const product = [...cartItems, ...allProducts].find(
              (p) => p._id === productId
            );
            const rating = getRating();

            return (
              <Card key={productId}>
                <CardContent className="p-4">
                  <div className="relative h-48 bg-[#F9F1E7] rounded-md mb-4">
                    <Image
                      src={product?.productImage || ""}
                      alt={product?.title || ""}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {product?.title}
                  </h3>
                  <p className="text-[#B88E2F] font-medium mb-2">
                    Rs. {product?.price.toLocaleString()}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(rating.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({rating.reviews} reviews)
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleProductSelect(productId)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          {/* Add Product Dropdown */}
          {selectedProducts.length < 3 && (
            <Card>
              <CardContent className="p-4 flex items-center justify-center min-h-[200px]">
                <Select onValueChange={(value) => handleProductSelect(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add product to compare" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProducts.length > 1 && (
        <Card>
          <CardContent className="p-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h4 className="text-xl font-semibold mb-4">{section.title}</h4>
                <div className="space-y-4">
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {selectedProducts.map((productId) => {
                        const product = [...cartItems, ...allProducts].find(
                          (p) => p._id === productId
                        );
                        return product ? (
                          <div key={productId} className="space-y-2">
                            <p className="font-medium text-sm text-gray-500">
                              {row.label}
                            </p>
                            <p className="text-gray-900">
                              {row.getValue(product)}
                            </p>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Comparison;
