"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./CartSideBar";
import { Icon } from "@iconify/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
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

const Product = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product"]{
            _id,
            title,
            "productImage": productImage.asset->url,
            price,
            originalPrice,
            discountPercentage, 
            isNew,
            tags,
            description
          }
        `;
        const data: Product[] = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Dispatch custom event
      window.dispatchEvent(new Event("cartUpdated"));

      return updatedCart;
    });

    setIsSidebarOpen(true);

    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 2500,
    });
  };

  const addToWishlist = (product: Product) => {
    const isAlreadyInWishlist = wishlist.some(
      (item) => item._id === product._id
    );

    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Dispatch custom event
      window.dispatchEvent(new Event("wishlistUpdated"));

      toast.dismiss();
      toast.success(`${product.title} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 2500,
      });
    } else {
      toast.info(`${product.title} is already in your wishlist!`);
    }
  };

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Dispatch custom event
    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Product removed from wishlist!", {
      position: "bottom-right",
      autoClose: 2500,
    });
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item._id !== id);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      return updatedCart;
    });

    toast.error("Item removed from cart", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleCart = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filtered products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#3A3A3A]">
        Our Products
      </h2>
      {/* Search Bar */}
      <div className="mb-6 mt-6 px-8">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Search by name or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>{" "}
      {/* Loading Indicator */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
          <p className="text-gray-500 text-lg ml-4">Loading products...</p>
        </div>
      ) : (
        // Product Grid
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <div
                key={product._id}
                className="cursor-pointer bg-[#F4F5F7] rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group relative"
              >
                <div className="relative">
                  <Image
                    src={urlFor(product.productImage).url()}
                    alt={product.title}
                    width={300}
                    height={225}
                    className="w-full h-64 object-cover"
                    loading="lazy" // Add lazy loading
                  />

                  {product.discountPercentage && (
                    <span className="absolute top-2 right-2 bg-[#E97171] text-white px-2 py-1 rounded-lg text-sm">
                      -{product.discountPercentage}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-[#2EC1AC] text-white px-2 py-1 rounded-lg text-sm">
                      New
                    </span>
                  )}

                  <div className="h-full absolute bottom-0 w-full flex flex-col gap-6 items-center justify-center bg-opacity-0 opacity-0 group-hover:bg-opacity-70 group-hover:opacity-100 bg-[#3A3A3A] transition-opacity duration-300">
                    {/* Add to Cart Button */}
                    <button
                      className="text-[16px] font-medium text-[#B88E2F] bg-white px-8 py-3 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the product click
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>

                    <div className="absolute top-2 right-2 flex items-center">
                      <Icon
                        icon="mdi:heart"
                        className={`text-2xl cursor-pointer ${
                          wishlist.some((item) => item._id === product._id)
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            wishlist.some((item) => item._id === product._id)
                          ) {
                            removeFromWishlist(product._id);
                          } else {
                            addToWishlist(product);
                          }
                        }}
                      />
                    </div>

                    {/* Share and Compare Buttons */}
                    <div className="flex gap-4 text-white text-sm mt-2">
                      <button className="flex items-center gap-1 text-[16px] font-semibold">
                        <Icon icon="gridicons:share" /> Share
                      </button>
                      <button className="flex items-center gap-1 text-[16px] font-semibold">
                        <Icon icon="fluent:arrow-swap-20-regular" /> Compare
                      </button>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  className="bg-[#B88E2F] text-white py-2 px-4 w-full rounded-b-lg hover:bg-[#9e7a28] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click
                    router.push(`/product/${product._id}`);
                  }}
                >
                  View Details
                </button>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.description && product.description.length > 120
                      ? `${product.description.slice(0, 120)}...`
                      : product.description}
                  </p>
                  <div className="mt-2">
                    {product.discountPercentage ? (
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-gray-900">
                          Rs {product.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-gray-900">
                        Rs {product.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      )}
      <Sidebar
        updateQuantity={updateQuantity}
        cartOpen={isSidebarOpen}
        toggleCart={toggleCart}
        cartItems={cartItems}
        removeItem={removeItem}
      />
      <button className="mt-8 mx-auto block bg-white border border-[#B88E2F] text-[#B88E2F] py-2 px-6 rounded-md font-poppins font-semibold text-base leading-[150%]">
        Show More
      </button>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Product;
