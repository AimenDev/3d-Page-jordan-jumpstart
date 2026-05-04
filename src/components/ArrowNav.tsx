import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useColorwayStore } from "@/store/colorwayStore";

export function ArrowNav() {
  const wrap = useRef<HTMLDivElement>(null);
  const next = useColorwayStore((s) => s.next);
  const prev = useColorwayStore((s) => s.prev);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const buttons = wrap.current?.querySelectorAll(".arrow-btn");
      buttons?.forEach((btn) => {
        const icon = btn.querySelector(".arrow-icon");
        const dir = (btn as HTMLElement).dataset.dir === "next" ? 3 : -3;
        btn.addEventListener("mouseenter", () => {
          gsap.to(icon, { x: dir, duration: 0.2, ease: "power2.out" });
          gsap.to(btn, { backgroundColor: "rgba(255,255,255,0.15)", duration: 0.2 });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(icon, { x: 0, duration: 0.25, ease: "power2.out" });
          gsap.to(btn, { backgroundColor: "rgba(255,255,255,0)", duration: 0.25 });
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="flex items-center gap-3">
      <button
        type="button"
        data-dir="prev"
        aria-label="Previous colorway"
        onClick={prev}
        className="arrow-btn focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white"
      >
        <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        data-dir="next"
        aria-label="Next colorway"
        onClick={next}
        className="arrow-btn focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white"
      >
        <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
