import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export default function ContactPage() {
  return (
    <main className="hidden md:block">
      <Navigation />
      <div className="pt-16">
        <Contact />
      </div>
    </main>
  );
} 