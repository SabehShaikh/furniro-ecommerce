"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "@/sanity/lib/client";
import { CheckCircle, CreditCard, Truck, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
  additionalInfo?: string;
  cartItems: CartItem[];
  paymentMethod: "bank-transfer" | "cash-on-delivery";
}

interface OrderConfirmationPageProps {
  params: {
    id: string;
  };
}

const OrderConfirmationPage = ({ params }: OrderConfirmationPageProps) => {
  const { id } = params; // Get the order ID from the URL
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await client.fetch(
          `*[_type == "checkout" && _id == $id][0]`,
          { id }
        );
        setOrder(orderData);
      } catch (error) {
        toast.error("Failed to fetch order data.");
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="w-12 h-12" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center">
          Order Confirmation
        </h1>
        <div className="mt-6 text-center">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
          <h2 className="text-xl font-semibold mt-4">Order ID: {order._id}</h2>
          <p className="mt-2 text-lg">Thank you for your order!</p>
          <p className="mt-2">We will process your order shortly.</p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          {/* Billing Information */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" /> Billing Information
            </h3>
            <div className="space-y-2 mt-2">
              <p>
                Name: {order.firstName} {order.lastName}
              </p>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>
                Address: {order.address}, {order.city}, {order.province},{" "}
                {order.zipCode}, {order.country}
              </p>
              <p>Additional Info: {order.additionalInfo || "None"}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yellow-500" /> Order Items
            </h3>
            <div className="space-y-2 mt-2">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>
                    {item.quantity} x Rs. {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-500" /> Payment Method
            </h3>
            <p className="mt-2">
              {order.paymentMethod === "bank-transfer"
                ? "Direct Bank Transfer"
                : "Cash on Delivery"}
            </p>
          </div>

          {/* Total */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-500" /> Total
            </h3>
            <p className="mt-2">
              Rs.{" "}
              {order.cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <Link href="/" className="text-blue-500 underline">
            <Button
              className="bg-blue-500 text-white"
              onClick={() => toast.info("Redirecting to home...")}
            >
              Go to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;
