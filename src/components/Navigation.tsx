"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/hooks";
import MagneticButton from "@/components/motion/MagneticButton";
import { useLenis } from "@/components/motion/SmoothScroll";

const navItems = [
  { name: "Home", path: "/", id: "home" },
  { name: "Projects", path: "/projects", id: "projects" },
  { name: "About", path: "/about", id: "about" },
  { name: "Contact", path: "/contact", id: "contact" },
];

// Same links the Contact section already shows.
const socials = [
  { name: "GitHub", href: "https://github.com/jaikwangg" },
  { name: "Instagram", href: "https://instagram.com/Worajai_" },
  { name: "Email", href: "mailto:Worakij.W@gmail.com" },
];

const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/**
 * Minimal fixed top bar (logo + menu button) with a full-screen overlay menu.
 * On the home page, Projects/About/Contact scroll to their sections; on other
 * pages they navigate to the routes (with the page transition).
 */
const Navigation = () => {
  const pathname = strip(usePathname() || "/");
  const isHome = pathname === "/";
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pendingScroll = useRef<string | null>(null);

  // Build the open/close timeline once.
  useIsomorphicLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" });
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }, 0)
        .from(".menu-link-inner", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.35)
        .from(".menu-foot", { autoAlpha: 0, y: 20, duration: 0.6, ease: "power3.out" }, 0.6);
    }, overlay);
    return () => ctx.revert();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Play / reverse, lock scroll, manage focus.
  useEffect(() => {
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;
    const reduced = prefersReducedMotion();

    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      tl.eventCallback("onReverseComplete", null);
      tl.timeScale(1);
      gsap.set(overlay, { autoAlpha: 1 }); // visible (and focusable) right away
      if (reduced) tl.progress(1);
      else tl.play();
      requestAnimationFrame(() => overlay.querySelector<HTMLElement>("a[href]")?.focus());
    } else if (tl.progress() > 0) {
      const finish = () => {
        gsap.set(overlay, { autoAlpha: 0 });
        lenis?.start();
        document.documentElement.style.overflow = "";
        const id = pendingScroll.current;
        pendingScroll.current = null;
        if (!id) return;
        const target = id === "home" ? 0 : document.getElementById(id);
        if (lenis && target !== null) lenis.scrollTo(target);
        else if (target === 0) window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        else target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      };
      if (reduced) {
        tl.progress(0);
        finish();
      } else {
        tl.eventCallback("onReverseComplete", () => {
          tl.eventCallback("onReverseComplete", null);
          finish();
        });
        tl.timeScale(1.6).reverse();
      }
      buttonRef.current?.focus();
    }
  }, [open, lenis]);

  // Restore scroll if unmounted while open (route change from the menu).
  useEffect(
    () => () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    },
    [lenis],
  );

  // Escape closes; Tab cycles between the menu button and the menu items.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current || !buttonRef.current) return;
      const items = [buttonRef.current, ...overlayRef.current.querySelectorAll<HTMLElement>("a[href], button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onItemClick = (e: React.MouseEvent, item: (typeof navItems)[number]) => {
    if (isHome) {
      // Stay on the page: scroll to the section once the menu has closed.
      e.preventDefault();
      pendingScroll.current = item.id;
      close();
    } else if (strip(item.path) === pathname) {
      e.preventDefault();
      close();
    }
    // Otherwise let the link navigate (PageTransition covers the swap).
  };

  const onLogoClick = (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    if (open) {
      pendingScroll.current = "home";
      close();
    } else if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-[60]">
        <nav aria-label="Primary" className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <MagneticButton strength={0.25}>
            <Link
              href="/"
              onClick={onLogoClick}
              data-no-transition={isHome ? "" : undefined}
              className="font-display text-2xl uppercase tracking-tight text-paper md:text-3xl"
              aria-label="Jaikwang, home"
            >
              JK<span className="text-accent">.</span>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="menu-button flex items-center gap-3 rounded-full border border-line bg-ink/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-paper backdrop-blur-md transition-colors hover:border-accent hover:text-accent md:text-sm"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-expo ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-expo ${
                    open ? "top-1/2 -rotate-45" : "top-full"
                  }`}
                />
              </span>
            </button>
          </MagneticButton>
        </nav>
      </header>

      <div
        ref={overlayRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="menu-overlay fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-ink-2 px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32"
        style={{ visibility: "hidden" }}
        data-lenis-prevent
      >
        <ul className="flex flex-col">
          {navItems.map((item, i) => {
            const current = isHome ? item.id === "home" : strip(item.path) === pathname;
            return (
              <li key={item.id} className="border-b border-line first:border-t">
                <Link
                  href={isHome && item.id !== "home" ? `/#${item.id}` : item.path}
                  onClick={(e) => onItemClick(e, item)}
                  data-no-transition={isHome ? "" : undefined}
                  aria-current={current ? "page" : undefined}
                  className="menu-link group flex items-baseline gap-4 py-2 md:gap-8"
                >
                  <span className="w-8 shrink-0 text-xs tabular-nums text-mute md:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <span
                      className={`menu-link-inner block font-display text-display-lg uppercase transition-colors duration-300 group-hover:text-accent ${
                        current ? "text-accent" : "text-paper"
                      }`}
                    >
                      {item.name}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="menu-foot mt-10 flex flex-col gap-4 text-sm text-mute md:flex-row md:items-end md:justify-between">
          <p>Ladkrabang, Bangkok, Thailand</p>
          <ul className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="uppercase tracking-[0.18em] text-paper transition-colors hover:text-accent"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
