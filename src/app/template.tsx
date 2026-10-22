"use client";

import { usePageReveal } from "@/components/motion/PageTransition";

// Remounts on every navigation; wipes the page-transition curtain away.
export default function Template({ children }: { children: React.ReactNode }) {
  usePageReveal();
  return <>{children}</>;
}
