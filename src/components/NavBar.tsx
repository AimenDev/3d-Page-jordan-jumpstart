import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCartStore } from "@/store/cartStore";

const NAV = ["NEW IN", "MEN", "WOMEN", "KIDS", "COLLECTIONS"];

export function NavBar() {
  const ref = useRef<HTMLElement>(null);
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.qty, 0),
  );
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    // Ensure nav items are visible immediately as a fallback
    const items = ref.current?.querySelectorAll(".nav-item");
    if (items) {
      items.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".nav-item",
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.05,
            clearProps: "transform,opacity",
          },
        );
      });
    }, ref);
    return () => {
      ctx.revert();
      // After revert, ensure elements are visible so they don't get stuck hidden
      const navItems = ref.current?.querySelectorAll(".nav-item");
      if (navItems) {
        navItems.forEach((el) => {
          (el as HTMLElement).style.opacity = "";
          (el as HTMLElement).style.transform = "";
        });
      }
    };
  }, []);

  return (
    <header
      ref={ref}
      className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-6 md:px-12 md:py-7"
    >
      <a
        href="/"
        className="nav-item focus-ring rounded-sm"
        aria-label="Nike home"
      >
        <SwooshLogo className="h-5 w-12 text-white md:h-6 md:w-14" />
      </a>

      <nav className="hidden items-center gap-8 md:flex lg:gap-12">
        {NAV.map((label) => (
          <a
            key={label}
            href="#"
            className="nav-item focus-ring rounded-sm text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-opacity duration-150 hover:opacity-70"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5 md:gap-6">
        <button
          aria-label="Search"
          className="nav-item focus-ring rounded-full p-1 text-white transition-opacity hover:opacity-70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>

        <button
          aria-label={`Cart, ${cartCount} items`}
          onClick={openCart}
          className="nav-item focus-ring relative rounded-full p-1 text-white transition-opacity hover:opacity-70"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2A2 2 0 0 1 6.2 19L5 8Z" strokeLinejoin="round" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--color-badge-red)] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>

        <button
          aria-label="Account"
          className="nav-item focus-ring rounded-full p-1 text-white transition-opacity hover:opacity-70"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function SwooshLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 192 72" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M48.7 28.6 0 49.5C4 65.6 19.5 71 33 67.4l151-40.7c9-2.5 11-9.5 4-15.5C181 5.7 169.4 3 158.5 6L48.7 28.6Z"
      />
    </svg>
  );
}
