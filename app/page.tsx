import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Tools from "@/components/Tools";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <Tools />
        <Showcase />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
