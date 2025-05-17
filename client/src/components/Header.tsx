import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Github } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-4 border-b sticky top-0 z-10 backdrop-blur-sm bg-background/80">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="animate-spin size-6 rounded-full border-2 border-primary border-r-transparent gsap-logo"></div>
          <h1 className="text-xl font-semibold">React Tech Demo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
