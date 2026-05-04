import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SIZES, OUT_OF_STOCK } from "@/data/colorways";
import { useColorwayStore } from "@/store/colorwayStore";

export function SizeSelector() {
  const wrap = useRef<HTMLDivElement>(null);
  const selected = useColorwayStore((s) => s.selectedSize);
  const setSize = useColorwayStore((s) => s.setSize);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = wrap.current?.querySelectorAll(".size-btn");
      if (!els) return;
      const onEnter = (e: Event) =>
        gsap.to(e.currentTarget as Element, {
          scale: 1.08,
          duration: 0.15,
          ease: "power1.out",
        });
      const onLeave = (e: Event) =>
        gsap.to(e.currentTarget as Element, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      const onDown = (e: Event) =>
        gsap.to(e.currentTarget as Element, {
          scale: 0.92,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousedown", onDown);
      });
      return () => {
        els.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("mousedown", onDown);
        });
      };
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap}>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
        Select Size (US)
      </p>
      <div className="grid grid-cols-5 gap-2 max-w-[260px]">
        {SIZES.map((s) => {
          const out = OUT_OF_STOCK.includes(s);
          const active = selected === s;
          return (
            <button
              key={s}
              type="button"
              disabled={out}
              aria-pressed={active}
              aria-label={`Size ${s}`}
              onClick={() => !out && setSize(s)}
              className={[
                "size-btn focus-ring h-10 w-10 rounded-[6px] text-[12px] transition-colors",
                out
                  ? "cursor-not-allowed border border-white/30 text-white/35 line-through"
                  : active
                    ? "border-[1.5px] border-white bg-white/[0.18] font-semibold text-white"
                    : "border border-white/30 text-white hover:border-white/60",
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
