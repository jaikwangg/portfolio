import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";

export default function ProjectsPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-20 md:pt-24">
        <Projects />
      </div>
    </main>
  );
} 