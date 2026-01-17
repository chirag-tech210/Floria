'use client';

import { create } from 'zustand';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setLoading: (loading: boolean) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,

  setItems: (items) => set({ items }),

  addItem: (item) => {
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(
      (i) => i.product._id === item.product._id
    );

    if (existingIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex].quantity += item.quantity;
      set({ items: updatedItems });
    } else {
      set({ items: [...currentItems, item] });
    }
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.product._id !== productId),
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const items = get().items.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    set({ items });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
