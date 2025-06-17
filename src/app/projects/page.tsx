import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";

export default function ProjectsPage() {
  return (
    <main className="hidden md:block">
      <Navigation />
      <div className="pt-16">
        <Projects />
      </div>
    </main>
  );
} 