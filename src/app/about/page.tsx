import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = { title: "About | Jaikwang" };

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip pt-16 md:pt-20">
        <About titleAs="h1" />
        <Contact />
      </main>
    </>
  );
}
