"use client";

import React, { useState } from "react";
import { client } from "@/sanity/lib/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreditCard, Building2, Package, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

interface CheckoutFormProps {
  cartItems: {
    _id: string;
    title: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
}

const CheckoutForm = ({ cartItems }: CheckoutFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter(); 

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "province",
      "zipCode",
      "country",
    ];

    // Check for empty fields
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    // If any required field is empty, show an error
    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields!");
      return;
    }

    // If no payment method is selected, show an error
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

    try {
      // Create the order in Sanity CMS
      const order = await client.create({
        _type: "checkout",
        ...formData,
        cartItems,
        paymentMethod,
      });

      // Clear the cart from localStorage
      localStorage.setItem("cart", JSON.stringify([])); // Clear cart
      localStorage.setItem("cartItems", JSON.stringify([])); // Optional: Clear cartItems if you're using that too

      // Optionally, you can dispatch a custom event to update the cart count in the UI
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order placed successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order._id}`);

      // Clear form data after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
      });
      setPaymentMethod(null);
    } catch (error) {
      toast.error("Failed to place the order. Please try again.");
      console.error("Error placing order:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First Name
                  <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-md p-4 py-5"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Last Name
                  <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-md p-4 py-5"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Street Address
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Town/City
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Town/City"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Province
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Province"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                ZIP Code
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Country/Region
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country/Region"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Additional Information
              </label>
              <Textarea
                placeholder="Additional Information"
                className="w-full border border-gray-300 rounded-md p-4 resize-none py-5"
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cart Items with Images */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center space-x-4 py-4">
                <div className="h-24 w-24 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.productImage}
                    alt={item.title}
                    layout="fill" // Makes the image fill the parent container
                    objectFit="cover" // Ensures the image is cropped to fit
                    className="rounded-lg"
                  />
                  <div className="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 text-sm rounded-bl-lg">
                    {item.quantity}x
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>Rs. {subtotal}</span>
            </div>
          </div>
          {/* Payment Options */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <input
                  type="radio"
                  id="bank-transfer"
                  name="payment-method"
                  value="bank-transfer"
                  checked={paymentMethod === "bank-transfer"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4"
                />
                <label htmlFor="bank-transfer" className="flex-1">
                  Direct Bank Transfer
                </label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  name="payment-method"
                  value="cash-on-delivery"
                  checked={paymentMethod === "cash-on-delivery"}
                  onChange={handlePaymentMethodChange}
                  className="h-4 w-4"
                />
                <label htmlFor="cash-on-delivery" className="flex-1">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
          {/* Place Order Button */}{" "}
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-[#B88E2F] hover:bg-[#A57B1E] text-white"
          >
            {" "}
            <ShieldCheck className="mr-2 h-5 w-5" /> Place Order Securely{" "}
          </Button>
        </CardContent>
      </Card>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
