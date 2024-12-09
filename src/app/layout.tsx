import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




// Use Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // You can specify the weights you need
  display: "swap",
  variable: "--font-poppins", // Set the CSS variable
});

export const metadata: Metadata = {
  title: "Furniro Ecommerce",
  description: "Shop the best products at Furniro Ecommerce store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {" "}
        <Navbar />
        {children}
 
        <Footer />
      </body>
    </html>
  );
}
