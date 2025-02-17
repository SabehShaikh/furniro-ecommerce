import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
  display: "swap",
  variable: "--font-poppins", 
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
