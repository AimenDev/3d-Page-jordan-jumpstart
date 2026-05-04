import shoeTeal from "@/assets/shoe-teal.png";
import shoeBlue from "@/assets/shoe-blue.png";
import shoeRed from "@/assets/shoe-red.png";

export type Colorway = {
  id: "teal" | "blue" | "red";
  name: string;
  price: number;
  bg: string;
  bgDark: string;
  swatch: string;
  image: string;
  description: string;
};

const description =
  "The Air Jordan I High has been engineered in a mind-blowing array of materials and colours—but this edition dresses the style in heritage-inspired shades like never before.";

export const colorways: Colorway[] = [
  {
    id: "teal",
    name: "JORDAN 1 GREEN",
    price: 155,
    bg: "#1A8A75",
    bgDark: "#0D6B5A",
    swatch: "#1A8A75",
    image: shoeTeal,
    description,
  },
  {
    id: "blue",
    name: "JORDAN 1 BLUE",
    price: 160,
    bg: "#1B4BFF",
    bgDark: "#0A2FD4",
    swatch: "#1B4BFF",
    image: shoeBlue,
    description,
  },
  {
    id: "red",
    name: "JORDAN 1 RED",
    price: 150,
    bg: "#C0182A",
    bgDark: "#8C1020",
    swatch: "#C0182A",
    image: shoeRed,
    description,
  },
];

export const SIZES = [6, 7, 7.5, 8, 9, 9.5, 10, 11, 11.5, 12] as const;
export const OUT_OF_STOCK: number[] = [9.5];
