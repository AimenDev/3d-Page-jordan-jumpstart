import { create } from "zustand";
import type { Colorway } from "@/data/colorways";

export type CartItem = {
  id: string;
  colorwayId: Colorway["id"];
  name: string;
  price: number;
  size: number;
  qty: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (cw: Colorway, size: number, qty?: number) => void;
  removeItem: (id: string) => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [
    {
      id: "seed-1",
      colorwayId: "blue",
      name: "JORDAN 1 BLUE",
      price: 160,
      size: 10,
      qty: 1,
      image: "",
    },
  ],
  isOpen: false,
  addItem: (cw, size, qty = 1) =>
    set((s) => ({
      items: [
        ...s.items,
        {
          id: `${cw.id}-${size}-${Date.now()}`,
          colorwayId: cw.id,
          name: cw.name,
          price: cw.price,
          size,
          qty,
          image: cw.image,
        },
      ],
    })),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
