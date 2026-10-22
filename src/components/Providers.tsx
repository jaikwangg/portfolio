"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {/* Existing framer-motion components honour prefers-reduced-motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
