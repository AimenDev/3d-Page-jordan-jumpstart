import { forwardRef } from "react";

export const Wordmark = forwardRef<HTMLDivElement>(function Wordmark(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "clamp(120px, 18vw, 220px)",
        lineHeight: 0.85,
        letterSpacing: "-0.02em",
        color: "rgba(255,255,255,0.38)",
        whiteSpace: "nowrap",
      }}
    >
      JORDAN
    </div>
  );
});
