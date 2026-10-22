"use client";

import { useEffect } from "react";
import { usePageReveal } from "@/components/motion/PageTransition";

// The first mount is the initial page load; focus stays where the browser put it.
let initialLoad = true;

// Remounts on every navigation; wipes the page-transition curtain away and
// moves keyboard / screen-reader focus to the new page's <main>.
export default function Template({ children }: { children: React.ReactNode }) {
  usePageReveal();
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, []);
  return <>{children}</>;
}
