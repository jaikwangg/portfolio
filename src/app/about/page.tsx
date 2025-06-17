import About from "@/components/About";
import Navigation from "@/components/Navigation";

export default function AboutPage() {
  return (
    <main className="hidden md:block">
      <Navigation />
      <div className="pt-16">
        <About />
      </div>
    </main>
  );
} 