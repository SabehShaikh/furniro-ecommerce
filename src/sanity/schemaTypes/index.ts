import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { checkout } from "./billingForm";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, checkout],
};
