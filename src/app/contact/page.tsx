import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-20 md:pt-24">
        <Contact />
      </div>
    </main>
  );
} 