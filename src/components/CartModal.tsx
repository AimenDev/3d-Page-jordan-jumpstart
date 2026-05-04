import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCartStore } from "@/store/cartStore";

export function CartModal() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeItem);

  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;
    if (isOpen) {
      gsap.set([overlayRef.current, panelRef.current], { display: "block" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "cubic-bezier(0.22,1,0.36,1)" },
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          if (panelRef.current) panelRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-[80] bg-black/60"
        style={{ display: "none" }}
        aria-hidden={!isOpen}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-[90] h-full w-full max-w-[420px] bg-[#0f0f0f] text-white shadow-2xl"
        style={{ display: "none" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em]">
            Your Bag ({items.length})
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="focus-ring rounded-full p-1 text-white/70 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex max-h-[calc(100%-180px)] flex-col gap-4 overflow-y-auto px-6 py-5">
          {items.length === 0 && (
            <p className="text-sm text-white/60">Your bag is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 rounded-md border border-white/10 p-3">
              {it.image && (
                <img src={it.image} alt={it.name} className="h-16 w-16 rounded object-contain" />
              )}
              <div className="flex flex-1 flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                  {it.name}
                </span>
                <span className="mt-1 text-xs text-white/60">Size {it.size}</span>
                <span className="mt-auto text-sm font-bold">${it.price}</span>
              </div>
              <button
                onClick={() => remove(it.id)}
                aria-label={`Remove ${it.name}`}
                className="focus-ring text-xs text-white/50 hover:text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0f0f0f] px-6 py-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="uppercase tracking-[0.12em] text-white/60">Total</span>
            <span className="text-lg font-bold">${total}</span>
          </div>
          <button className="focus-ring w-full rounded-full bg-white py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.02]">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
