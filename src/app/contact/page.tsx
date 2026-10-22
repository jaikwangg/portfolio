import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = { title: "Contact | Jaikwang" };

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip pt-16 md:pt-20">
        <Contact titleAs="h1" />
      </main>
    </>
  );
}
