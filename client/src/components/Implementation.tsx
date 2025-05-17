const Implementation = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto gsap-stagger-section">
          <h2 className="text-3xl font-bold text-center mb-8 gsap-fade-in">
            Implementation Steps
          </h2>

          <div className="space-y-4">
            <div className="bg-muted p-5 rounded-md overflow-x-auto">
              <p className="font-mono text-sm mb-2"># Create a new project</p>
              <p className="font-mono text-sm">
                npm create vite@latest my-app -- --template react-ts
              </p>
            </div>

            <div className="bg-muted p-5 rounded-md overflow-x-auto">
              <p className="font-mono text-sm mb-2"># Install Tailwind CSS</p>
              <p className="font-mono text-sm">
                npm install -D tailwindcss postcss autoprefixer
              </p>
              <p className="font-mono text-sm">npx tailwindcss init -p</p>
            </div>

            <div className="bg-muted p-5 rounded-md overflow-x-auto">
              <p className="font-mono text-sm mb-2"># Install Shadcn UI CLI</p>
              <p className="font-mono text-sm">npx shadcn-ui@latest init</p>
            </div>

            <div className="bg-muted p-5 rounded-md overflow-x-auto">
              <p className="font-mono text-sm mb-2"># Install GSAP</p>
              <p className="font-mono text-sm">npm install gsap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implementation;
