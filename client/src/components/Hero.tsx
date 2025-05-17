import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 gsap-stagger-section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6 gsap-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            React Project with{" "}
            <span className="text-primary">Modern Tech Stack</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A demonstration of React with TypeScript, Tailwind CSS, Shadcn/UI, and GSAP animations
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <Button>Get Started</Button>
            <Button variant="outline">Documentation</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
