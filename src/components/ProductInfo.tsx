import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Colorway } from "@/data/colorways";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { useColorwayStore } from "@/store/colorwayStore";
import { useCartStore } from "@/store/cartStore";

type Props = { colorway: Colorway };

export function ProductInfo({ colorway }: Props) {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lastId = useRef(colorway.id);

  const selectedSize = useColorwayStore((s) => s.selectedSize);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  // Crossfade name + price on colorway change
  useEffect(() => {
    if (lastId.current === colorway.id) return;
    lastId.current = colorway.id;
    gsap.fromTo(
      [nameRef.current, priceRef.current],
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.25,
      },
    );
  }, [colorway.id]);

  // CTA hover/press
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onEnter = () =>
      gsap.to(btn, {
        scale: 1.03,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.2 });
    const onDown = () =>
      gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mousedown", onDown);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mousedown", onDown);
    };
  }, []);

  const handleAdd = () => {
    addItem(colorway, selectedSize ?? 9, 1);
    openCart();
  };

  return (
    <div className="info-stack flex max-w-[320px] flex-col gap-7">
      <div>
        <p
          ref={nameRef}
          data-anim="name"
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white"
        >
          {colorway.name}
        </p>
        <p
          ref={priceRef}
          data-anim="price"
          className="mt-2 text-[32px] font-bold leading-none text-white"
        >
          ${colorway.price}
        </p>
      </div>

      <div data-anim="sizes">
        <SizeSelector />
      </div>

      <div data-anim="swatches">
        <ColorSelector />
      </div>

      <button
        ref={ctaRef}
        data-anim="cta"
        onClick={handleAdd}
        className="focus-ring group flex h-12 w-full max-w-[260px] items-center justify-between rounded-full bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-black"
      >
        <span>Add to Bag</span>
        <span className="text-base leading-none">+</span>
      </button>
    </div>
  );
}
