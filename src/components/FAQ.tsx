"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have the shadcn Input component in this path
import { Search } from "lucide-react"; // Importing Search icon from lucide-react

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order using the tracking link sent to your email after purchase.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be unused and in original packaging.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact us via the contact form above or at support@example.com.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping charges may apply.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-8 py-12">
      <h2 className="text-4xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="mb-8 flex items-center">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <Search size={24} className="ml-2 text-gray-500" />{" "}
        {/* Adding search icon */}
      </div>
      <div className="space-y-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h4 className="text-lg font-medium">{faq.question}</h4>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No FAQs match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
