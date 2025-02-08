"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Function to update counts from localStorage
  const updateCounts = () => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");

    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    const wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : [];

    setCartCount(cartItems.length);
    setWishlistCount(wishlistItems.length);
  };

  useEffect(() => {
    // Initial count
    updateCounts();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateCounts();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for cart and wishlist updates
    window.addEventListener("cartUpdated", handleStorageChange);
    window.addEventListener("wishlistUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleStorageChange);
    };
  }, []);

  return (
    <nav className="py-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo on the Left */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/furnirologo.png"
              alt="Logo"
              width={130} // Logo width (adjust as needed)
              height={41} // Logo height (adjust as needed)
              loading="lazy" // Lazy load image for better performance
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                <span className="text-2xl">&#9776;</span>
              </button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="flex flex-col items-center py-4 space-y-4">
                {/* Menu Links */}
                <SheetClose>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-800 text-lg"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/shop"
                    className="text-gray-600 hover:text-gray-800 text-lg"
                  >
                    Shop
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/analytics"
                    className="text-gray-600 hover:text-gray-800 text-lg"
                  >
                    Analytics
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-gray-800 text-lg"
                  >
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-800 text-lg"
                  >
                    Contact
                  </Link>
                </SheetClose>

                {/* Icons Section */}
                <div className="flex space-x-6 pt-4 border-t border-gray-300 w-full justify-center">
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <User size={24} className="hover:text-blue-500" />
                  </Link>
                  <Link href="/" className="text-gray-600 hover:text-gray-800">
                    <Search size={24} className="hover:text-red-500" />
                  </Link>

                  {/* Admin Panel Icon using Iconify */}
          <Link
            href="https://furniro-admin-panel-sabehshaikhs-projects.vercel.app/"
            target="_blank"
            className="text-gray-600 hover:text-gray-800"
          >
            <Icon
              icon="mdi:account-cog"
              width="24"
              className="hover:text-red-500 transition-colors duration-200"
            />
          </Link>


                  <Link
                    href="/wishlist"
                    className="text-gray-600 hover:text-gray-800 relative"
                  >
                    <Heart size={24} className="hover:text-red-500" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* Cart Icon */}
                  <Link
                    href="/cart"
                    className="relative text-gray-600 hover:text-gray-800"
                  >
                    <ShoppingCart size={24} className="hover:text-red-500" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Nav Links for Larger Screens */}
        <div className="hidden md:flex justify-evenly space-x-16 items-center">
          <Link
            href="/"
            className="text-black font-medium leading-6 text-[16px]"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-black font-medium leading-6 text-[16px]"
          >
            Shop
          </Link>
          <Link
            href="/analytics"
            className="text-black font-medium leading-6 text-[16px]"
          >
            Analytics
          </Link>
          <Link
            href="/blog"
            className="text-black font-medium leading-6 text-[16px]"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-black font-medium leading-6 text-[16px]"
          >
            Contact
          </Link>
        </div>

        {/* Right Section (Profile, Search, Heart, Cart Icons) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/profile" className="text-gray-600 hover:text-gray-800">
            <User size={24} className="hover:text-blue-500" />
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            <Search size={24} className="hover:text-red-500" />
          </Link>

          {/* Admin Panel Icon using Iconify */}
          <Link
            href="https://furniro-admin-panel-sabehshaikhs-projects.vercel.app/"
            target="_blank"
            className="text-gray-600 hover:text-gray-800"
          >
            <Icon
              icon="mdi:account-cog"
              width="24"
              className="hover:text-red-500 transition-colors duration-200"
            />
          </Link>

          <Link
            href="/wishlist"
            className="text-gray-600 hover:text-gray-800 relative"
          >
            <Heart size={24} className="hover:text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative text-gray-600 hover:text-gray-800"
          >
            <ShoppingCart size={24} className="hover:text-red-500" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
