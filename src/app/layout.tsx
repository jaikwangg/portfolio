import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import CustomCursor from "@/components/motion/CustomCursor";
import SkipLink from "@/components/SkipLink";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jaikwang",
  description: "Full Stack Developer & UI/UX Designer",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="bg-ink font-sans text-paper antialiased">
        <SmoothScroll>
          <SkipLink />
          <PageTransition>
            <div className="min-h-screen">
              {children}
            </div>
          </PageTransition>
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
