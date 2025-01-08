import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { CouponResponseSchema, TCoupon, TProduct, TShoppingCart } from "@/schemas";

interface Store {
  total: number;
  discount: number;
  contents: TShoppingCart;
  coupon: TCoupon;
  addToCart: (product: TProduct) => void;
  updateQuantity: (id: TProduct["id"], quantity: number) => void;
  removeFromCart: (id: TProduct["id"]) => void;
  calculteTotal: () => void;
  applyCoupon: (couponName: string) => Promise<void>;
  applyDiscount: () => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  coupon: {
    coupon: {
      name: '',
      percentage: 0
    },
    message: ''
  }
}

export const useStore = create<Store>()(devtools((set, get) => ({
  ...initialState,
  addToCart: (product) => {
    const { id: productId, ...data } = product;

    let contents: TShoppingCart = [];

    const duplicated = get().contents.findIndex(item => item.productId === productId);

    if (duplicated >= 0) {
      if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return;

      contents = get().contents.map(
        item => item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      contents = [...get().contents, {
        ...data,
        productId,
        quantity: 1
      }];
    }

    set({ contents });
    get().calculteTotal();
  },
  updateQuantity: (id, quantity) => {
    const contents = get().contents.map(
      item => item.productId === id
        ? { ...item, quantity }
        : item);

    set({ contents });
    get().calculteTotal();
  },
  removeFromCart: (id) => {
    set((state) => ({
      contents: state.contents.filter(item => item.productId !== id)
    }));

    if (!get().contents.length) get().clearCart();

    get().calculteTotal();
  },
  calculteTotal: () => {
    const total =  get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);

    set({ total });

    if (get().coupon.coupon?.percentage) get().applyDiscount();
  },
  applyCoupon: async (couponName: string) => {
    const req = await fetch('/api/coupons', {
      method: 'POST',
      body: JSON.stringify({ name: couponName })
    });

    const json = await req.json();
    const coupon = CouponResponseSchema.parse(json);
    
    set({ coupon });

    if (coupon.coupon?.percentage) get().applyDiscount();
  },
  applyDiscount: () => {
    const subtotalAmount =  get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = (get().coupon.coupon.percentage / 100) * subtotalAmount;
    const total = subtotalAmount - discount;

    set({ total, discount });
  },
  removeCoupon: () => {
    set({ discount: 0, coupon: initialState.coupon });
    get().calculteTotal();
  },
  clearCart: () => {
    set({ ...initialState });
  },
})));
