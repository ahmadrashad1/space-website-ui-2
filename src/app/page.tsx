import Hero from "@/components/Hero";
import Satellite from "@/components/Satellite";
import Mission from "@/components/Mission";
import SectionReveal from "@/components/SectionReveal";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Orbit360 from "@/components/Orbit360";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SectionReveal />
      <Hero />
      <Satellite />
      <Mission />
      <Stats />
      <About />
      <Programs />
      <Orbit360 />
      <CTA />
      <Footer />
    </>
  );
}
