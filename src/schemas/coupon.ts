import { z } from "zod";

export const CouponResponseSchema = z.object({
  coupon: z.object({
    name: z.string().default(''),
    percentage: z.coerce.number().min(0).max(100),
  }).default({
    name: '',
    percentage: 0
  }),
  message: z.string(),
});


// Types

export type TCoupon = z.infer<typeof CouponResponseSchema>;
