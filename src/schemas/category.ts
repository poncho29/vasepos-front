import { z } from "zod";

import { ProductSchema } from ".";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});

export const CategoriesResponseSchema = z.array(CategorySchema);

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema)
});