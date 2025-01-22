import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  cartOpen: boolean;
  toggleCart: () => void;
  cartItems: {
    _id: string;
    title: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function Sidebar({
  cartOpen,
  toggleCart,
  cartItems,
  removeItem,
  updateQuantity,
}: SidebarProps) {
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrease = (id: string) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleCart = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleComparision = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };


  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-full sm:w-96`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <span className="text-sm text-gray-500">({totalItems} items)</span>
          </div>
          <button
            onClick={toggleCart}
            className="hover:bg-gray-200 rounded-full p-2 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-6 py-4 flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 pb-4 border-b last:border-b-0 relative group"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.productImage}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Rs. {item.price?.toLocaleString()}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2 bg-gray-50 w-fit rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-200 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors mt-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t bg-white px-6 py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/cart"
                onClick={handleCart}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cart
              </Link>
              <Link
                href="/checkout"
                onClick={handleCheckout}
                className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium gap-1"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
onClick={handleComparision}
                href="/productcomparision"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Compare
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}