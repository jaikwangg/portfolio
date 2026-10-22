import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = { title: "Projects | Jaikwang" };

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <Projects variant="index" />
        <Contact />
      </main>
    </>
  );
}
