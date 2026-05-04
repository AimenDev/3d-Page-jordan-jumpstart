import { create } from "zustand";
import { colorways } from "@/data/colorways";

type ColorwayState = {
  activeId: "teal" | "blue" | "red";
  isTransitioning: boolean;
  selectedSize: number | null;
  setActive: (id: ColorwayState["activeId"]) => void;
  setTransitioning: (v: boolean) => void;
  setSize: (size: number) => void;
  next: () => void;
  prev: () => void;
};

export const useColorwayStore = create<ColorwayState>((set, get) => ({
  activeId: "blue",
  isTransitioning: false,
  selectedSize: null,
  setActive: (id) => set({ activeId: id }),
  setTransitioning: (v) => set({ isTransitioning: v }),
  setSize: (size) => set({ selectedSize: size }),
  next: () => {
    const i = colorways.findIndex((c) => c.id === get().activeId);
    set({ activeId: colorways[(i + 1) % colorways.length].id });
  },
  prev: () => {
    const i = colorways.findIndex((c) => c.id === get().activeId);
    set({
      activeId:
        colorways[(i - 1 + colorways.length) % colorways.length].id,
    });
  },
}));

export const getActiveColorway = (id: string) =>
  colorways.find((c) => c.id === id) ?? colorways[0];
