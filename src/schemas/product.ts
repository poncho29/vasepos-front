import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  inventory: z.number(),
  // categoryId: z.number()
});

const ShoppingCartContentsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  inventory: true,
}).extend({
  productId: z.number(),
  quantity: z.number()
});

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

export type TProduct = z.infer<typeof ProductSchema>;

export type TShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type TShoppingCartItem = z.infer<typeof ShoppingCartContentsSchema>;
