import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Providers from "../components/Providers";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import CustomCursor from "@/components/motion/CustomCursor";

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
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SmoothScroll>
            <PageTransition>
              <div id="main-content" className="min-h-screen">
                {children}
              </div>
            </PageTransition>
            <CustomCursor />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
