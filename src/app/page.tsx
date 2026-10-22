import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

// Section ids (#home #projects #about #contact) live on the sections.
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
