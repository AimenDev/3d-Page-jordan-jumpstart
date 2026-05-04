import { forwardRef } from "react";
import type { Colorway } from "@/data/colorways";

type Props = { colorway: Colorway };

export const ShoeStage = forwardRef<HTMLImageElement, Props>(function ShoeStage(
  { colorway },
  ref,
) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <img
        ref={ref}
        src={colorway.image}
        alt={colorway.name}
        className="h-auto w-[55%] max-w-[640px] -translate-y-2 select-none md:w-[48%]"
        style={{ transform: "rotate(15deg)" }}
        draggable={false}
      />
    </div>
  );
});
