import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import ComponentShowcase from "../components/ComponentShowcase";
import Implementation from "../components/Implementation";
import Footer from "../components/Footer";
import { initGSAP } from "../lib/gsap";

const Home = () => {
  useEffect(() => {
    // Initialize GSAP animations
    initGSAP();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TechStack />
        <ComponentShowcase />
        <Implementation />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
