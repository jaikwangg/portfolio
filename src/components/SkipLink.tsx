"use client";

import { useLenis } from "@/components/motion/SmoothScroll";

/**
 * First focusable element on every page. Moves focus to the page's
 * <main id="main-content" tabIndex={-1}> and scrolls to it (through Lenis
 * when smooth scrolling is on, so the two never fight).
 */
export default function SkipLink() {
  const lenis = useLenis();
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main-content");
    if (!main) return;
    e.preventDefault();
    main.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(main, { immediate: true });
    else main.scrollIntoView();
  };
  return (
    <a href="#main-content" onClick={onClick} className="skip-link">
      Skip to content
    </a>
  );
}
