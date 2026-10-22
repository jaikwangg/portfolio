"use client";

import { MotionConfig } from "framer-motion";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // framer-motion is still used by the project detail page; make it honour
  // prefers-reduced-motion.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
