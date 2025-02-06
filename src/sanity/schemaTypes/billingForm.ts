import { defineType } from "sanity";

export const checkout = defineType({
  name: "checkout",
  title: "Checkout",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(50)
          .error("First name must be 2-50 characters."),
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(50)
          .error("Last name must be 2-50 characters."),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
          .error("Invalid email address."),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[0-9]{10,15}$/, { name: "phone" })
          .error("Phone number must be 10-15 digits."),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (rule) => rule.required().error("Address is required."),
    },
    {
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required().error("City is required."),
    },
    {
      name: "province",
      title: "Province",
      type: "string",
      validation: (rule) => rule.required().error("Province is required."),
    },
    {
      name: "zipCode",
      title: "ZIP Code",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-zA-Z0-9]{5,10}$/, { name: "zip code" })
          .error("ZIP code must be 5-10 alphanumeric characters."),
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.required().error("Country is required."),
    },
    {
      name: "additionalInfo",
      title: "Additional Information",
      type: "text",
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Product Title", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Price", type: "number" },
            {
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
            },
            { name: "isNew", title: "New Badge", type: "boolean" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "discountPercentage",
              title: "Discount Percentage",
              type: "number",
            },
            { name: "originalPrice", title: "Original Price", type: "number" },
            {
              name: "productImage",
              title: "Product Image",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Direct Bank Transfer", value: "bank-transfer" },
          { title: "Cash on Delivery", value: "cash-on-delivery" },
        ],
      },
      validation: (rule) =>
        rule.required().error("Payment method is required."),
    },
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
      validation: (rule) => rule.required().error("Order ID is required."),
    },
  ],
});
