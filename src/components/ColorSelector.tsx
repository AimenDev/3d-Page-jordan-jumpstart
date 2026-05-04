import { useEffect, useRef } from "react";
import gsap from "gsap";
import { colorways } from "@/data/colorways";
import { useColorwayStore } from "@/store/colorwayStore";

export function ColorSelector() {
  const wrap = useRef<HTMLDivElement>(null);
  const activeId = useColorwayStore((s) => s.activeId);
  const setActive = useColorwayStore((s) => s.setActive);
  const isTransitioning = useColorwayStore((s) => s.isTransitioning);

  useEffect(() => {
    const ring = wrap.current?.querySelector(
      `[data-ring="${activeId}"]`,
    ) as HTMLElement | null;
    if (!ring) return;
    gsap.fromTo(
      ring,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
    );
  }, [activeId]);

  return (
    <div ref={wrap}>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
        Select Color
      </p>
      <div className="flex items-center gap-4">
        {colorways.map((c) => {
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              aria-label={`Select ${c.name}`}
              disabled={isTransitioning}
              onClick={() => !active && setActive(c.id)}
              className="swatch-btn focus-ring relative flex h-9 w-9 items-center justify-center rounded-full"
            >
              <span
                className="block h-7 w-7 rounded-full"
                style={{ background: c.swatch }}
              />
              {active && (
                <span
                  data-ring={c.id}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 0 2px var(--bg), 0 0 0 3.5px ${c.swatch}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
