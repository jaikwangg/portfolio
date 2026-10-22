import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = { title: "About | Jaikwang" };

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip pt-16 md:pt-20">
        <About />
        <Contact />
      </main>
    </>
  );
}
