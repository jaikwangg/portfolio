import About from "@/components/About";
import Navigation from "@/components/Navigation";

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-20 md:pt-24">
        <About />
      </div>
    </main>
  );
} 