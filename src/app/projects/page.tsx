import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = { title: "Projects | Jaikwang" };

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip">
        <Projects variant="index" />
        <Contact />
      </main>
    </>
  );
}
