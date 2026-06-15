
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  foodName: string;
  foodImage: string;
  price: number;
  quantity: number;
  restaurantId: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (foodId: number) => void;
  updateQuantity: (foodId: number, type: "increase" | "decrease") => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const currentItems = get().cartItems;
        const existingItem = currentItems.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            cartItems: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cartItems: [...currentItems, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: (foodId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== foodId),
        });
      },
      updateQuantity: (foodId, type) => {
        const currentItems = get().cartItems;
        const targetItem = currentItems.find((item) => item.id === foodId);

        if (!targetItem) return;

        if (type === "decrease" && targetItem.quantity === 1) {
          get().removeFromCart(foodId);
        } else {
          set({
            cartItems: currentItems.map((item) =>
              item.id === foodId
                ? {
                    ...item,
                    quantity: item.quantity + (type === "increase" ? 1 : -1),
                  }
                : item
            ),
          });
        }
      },

      clearCart: () => set({ cartItems: [] }),
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "foody-cart-storage", 
    }
  )
);