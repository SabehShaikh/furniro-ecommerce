"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { client } from "@/sanity/lib/client";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  province: z
    .string()
    .min(2, { message: "Province must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(5, { message: "ZIP code must be at least 5 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
});

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
  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      zipCode: "",
      country: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

    try {
      const orderDetails = {
        _type: "checkout",
        ...data,
        cartItems: cartItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          productImage: item.productImage,
        })),
        paymentMethod,
        orderId: Date.now().toString(),
      };

      const response = await client.create(orderDetails);

      if (response) {
        console.log("Order saved to Sanity:", response);
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new Event("cartUpdated"));

        toast.success("Order placed successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });

        router.push(`/order-confirmation/${orderDetails.orderId}`);
      } else {
        throw new Error("Failed to save order to Sanity.");
      }
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First Name
                  <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
                </label>
                <Input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-md p-4 py-5"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Last Name
                  <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
                </label>
                <Input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-md p-4 py-5"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("phone")}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Street Address
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("address")}
                placeholder="Street Address"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Town/City
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("city")}
                placeholder="Town/City"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Province
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("province")}
                placeholder="Province"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.province && (
                <p className="text-red-500 text-sm">
                  {errors.province.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                ZIP Code
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("zipCode")}
                placeholder="ZIP Code"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Country/Region
                <span className="text-red-600 ml-[2px] font-[0.8em]">*</span>
              </label>
              <Input
                type="text"
                {...register("country")}
                placeholder="Country/Region"
                className="w-full border border-gray-300 rounded-md p-4 py-5"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
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
            <Button
              type="submit"
              className="w-full bg-[#B88E2F] hover:bg-[#A57B1E] text-white"
            >
              <ShieldCheck className="mr-2 h-5 w-5" /> Place Order Securely
            </Button>
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
                    layout="fill"
                    objectFit="cover"
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
                  onChange={(e) => setPaymentMethod(e.target.value)}
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
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4"
                />
                <label htmlFor="cash-on-delivery" className="flex-1">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
