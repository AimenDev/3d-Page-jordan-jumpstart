import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavBar } from "@/components/NavBar";
import { Wordmark } from "@/components/Wordmark";
import { ShoeStage } from "@/components/ShoeStage";
import { ProductInfo } from "@/components/ProductInfo";
import { ArrowNav } from "@/components/ArrowNav";
import { CartModal } from "@/components/CartModal";
import {
  useColorwayStore,
  getActiveColorway,
} from "@/store/colorwayStore";
import { colorways } from "@/data/colorways";

export const Route = createFileRoute("/")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "Air Jordan 1 High — Heritage Edition" },
      {
        name: "description",
        content:
          "Configure your Air Jordan 1 High in Green, Blue, or Red. Heritage-inspired colorways, premium materials, free shipping.",
      },
      { property: "og:title", content: "Air Jordan 1 High — Heritage Edition" },
      {
        property: "og:description",
        content: "Pick your Jordan 1 colorway and size in a tactile, animated configurator.",
      },
    ],
  }),
});

function ProductPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const activeId = useColorwayStore((s) => s.activeId);
  const setTransitioning = useColorwayStore((s) => s.setTransitioning);
  const colorway = getActiveColorway(activeId);

  // Apply initial bg vars synchronously
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", colorway.bg);
    root.style.setProperty("--bg-dark", colorway.bgDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial load timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(wordmarkRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.out",
        }, 0.2)
          .from(shoeRef.current, {
            x: 80,
            opacity: 0,
            rotate: -8,
            duration: 0.65,
            ease: "cubic-bezier(0.22,1,0.36,1)",
          }, 0.3)
          .from('[data-anim="name"], [data-anim="price"]', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
          }, 0.5)
          .from('.size-btn', {
            y: 20,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
          }, 0.65)
          .from('.swatch-btn', {
            scale: 0,
            opacity: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: "back.out(1.7)",
          }, 0.75)
          .from('[data-anim="cta"]', {
            y: 20,
            opacity: 0,
            duration: 0.4,
          }, 0.85)
          .from(descRef.current, {
            opacity: 0,
            duration: 0.5,
          }, 0.9);
      });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  // Colorway transition
  const lastIdRef = useRef(activeId);
  useEffect(() => {
    if (lastIdRef.current === activeId) return;
    lastIdRef.current = activeId;
    setTransitioning(true);

    const root = document.documentElement;
    const tl = gsap.timeline({
      onComplete: () => setTransitioning(false),
    });

    // Background tween via CSS vars
    tl.to(root, {
      "--bg": colorway.bg,
      "--bg-dark": colorway.bgDark,
      duration: 0.45,
      ease: "sine.inOut",
    }, 0);

    // Shoe exit
    tl.to(shoeRef.current, {
      x: -60,
      opacity: 0,
      rotate: 5,
      duration: 0.25,
      ease: "power2.in",
    }, 0.08);

    // Wordmark fade (re-entrance)
    tl.fromTo(
      wordmarkRef.current,
      { opacity: 0 },
      { opacity: 0.38, duration: 0.6 },
      0.3,
    );

    // Shoe entrance (image src already swapped via React render)
    tl.fromTo(
      shoeRef.current,
      { x: 80, opacity: 0, rotate: -8, scale: 0.92 },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.6,
        ease: "cubic-bezier(0.22,1,0.36,1)",
      },
      0.31,
    );
  }, [activeId, colorway.bg, colorway.bgDark, setTransitioning]);

  return (
    <main
      ref={stageRef}
      className="stage-bg relative h-screen w-screen overflow-hidden"
    >
      <NavBar />
      <Wordmark ref={wordmarkRef} />
      <ShoeStage ref={shoeRef} colorway={colorway} />

      {/* Left column — product info */}
      <section className="absolute left-0 top-0 z-30 flex h-full w-full items-end px-8 pb-20 md:w-[40%] md:items-center md:px-12 md:pb-0 lg:px-20">
        <ProductInfo colorway={colorway} />
      </section>

      {/* Right column — description + arrows + play */}
      <section className="pointer-events-none absolute right-0 top-0 z-30 hidden h-full w-[28%] flex-col items-end justify-center gap-8 px-8 pr-10 md:flex lg:px-12">
        <p
          ref={descRef}
          className="pointer-events-auto max-w-[220px] text-[12px] font-normal leading-[1.6] text-white/75"
        >
          {colorway.description}
        </p>
        <div className="pointer-events-auto">
          <ArrowNav />
        </div>
      </section>

      {/* Play video — bottom center */}
      <button
        type="button"
        className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-70 focus-ring"
        aria-label="Play product video"
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <path d="M2 1.5v9l8-4.5z" />
        </svg>
        Play Video
      </button>

      {/* Preload alt images so transitions are instant */}
      <div className="hidden">
        {colorways.map((c) => (
          <img key={c.id} src={c.image} alt="" />
        ))}
      </div>

      <CartModal />
    </main>
  );
}
