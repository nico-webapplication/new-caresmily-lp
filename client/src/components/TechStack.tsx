import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Tech stack information
const techItems = [
  {
    name: "React",
    version: "v18.3.1",
    description:
      "JavaScript library for building user interfaces with a component-based approach.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="white"
      >
        <circle cx="0" cy="0" r="2.05" fill="white" />
        <g stroke="white" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    color: "bg-[#61dafb]",
  },
  {
    name: "TypeScript",
    version: "v5.6.3",
    description:
      "Strongly typed programming language that builds on JavaScript, giving you better tooling.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="white"
      >
        <path d="M0 16v16h32V0H0v16zm25.786-3.96c1.05.574 1.85 1.49 2.27 2.66.22.506.297.9.338 1.735.065 1.303-.052 2.112-.462 3.223-.91 2.466-3.29 4.003-6.297 4.065-1.845.038-3.285-.448-4.58-1.544l-.167-.142.467-.605c.257-.333.478-.605.49-.605.01 0 .198.125.415.277 1.334.937 3.1 1.155 4.522.56 1.43-.597 2.23-1.936 2.35-3.933.037-.615-.01-1.03-.193-1.683-.36-1.292-1.32-2.222-2.676-2.598-.653-.18-1.94-.18-2.597 0-1.686.467-2.814 1.738-3.142 3.542-.063.359-.09.742-.063 1.025l.048.457h-4.802v-9.516h14.95l.052 3.086zm-16.552 5.59v5.35H3.558V7.48h5.677v10.15z" />
      </svg>
    ),
    color: "bg-blue-600",
  },
  {
    name: "Tailwind CSS",
    version: "v3.4.17",
    description:
      "Utility-first CSS framework packed with classes that can be composed to build any design.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="white"
      >
        <path d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z" />
      </svg>
    ),
    color: "bg-cyan-500",
  },
  {
    name: "Shadcn/UI",
    version: "Latest",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M165.6 128C165.6 184 184 202.4 240 202.4V128H165.6Z" fill="white" />
        <path d="M240 53.6V128H165.6C165.6 72 184 53.6 240 53.6Z" fill="white" />
        <path d="M53.6 128V202.4C109.6 202.4 128 184 128 128H53.6Z" fill="white" />
        <path d="M53.6 128V53.6C109.6 53.6 128 72 128 128H53.6Z" fill="white" />
      </svg>
    ),
    color: "bg-slate-900",
  },
];

const TechStack = () => {
  return (
    <section className="py-12 border-t border-b">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10 gsap-fade-in">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-stagger-section">
          {techItems.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow tech-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`size-14 flex items-center justify-center rounded-lg ${item.color}`}>
                    {item.icon}
                  </div>
                  <Badge variant="default" className="bg-primary">
                    {item.version}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
