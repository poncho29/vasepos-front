import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TProduct, TShoppingCart } from "@/schemas";

interface Store {
  total: number;
  contents: TShoppingCart;
  addToCart: (product: TProduct) => void;
  updateQuantity: (id: TProduct["id"], quantity: number) => void;
  removeFromCart: (id: TProduct["id"]) => void;
  calculteTotal: () => void;
}

export const useStore = create<Store>()(devtools((set, get) => ({
  total: 0,
  contents: [],
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
    get().calculteTotal();
  },
  calculteTotal: () => {
    const total =  get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);

    set({ total });
  }
})));
