import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, DollarSign, User } from "lucide-react";

const ButtonsTab = () => (
  <div className="grid gap-8">
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Button Variants</h3>
      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Button States</h3>
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          Loading
        </Button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Button Sizes</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  </div>
);

const FormElementsTab = () => {
  const [progress, setProgress] = useState(65);

  const decreaseProgress = () => {
    setProgress((p) => Math.max(0, p - 10));
  };

  const increaseProgress = () => {
    setProgress((p) => Math.min(100, p + 10));
  };

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Text Inputs</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-input">Default Input</Label>
              <Input id="default-input" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input
                id="disabled-input"
                placeholder="Disabled input"
                disabled
                className="opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="with-icon">Input with Icon</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input id="with-icon" placeholder="Search..." className="pl-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Selection & Toggle</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Notification Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="check1" />
                  <Label htmlFor="check1">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check2" />
                  <Label htmlFor="check2">Push notifications</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Theme Preference</Label>
              <RadioGroup defaultValue="dark">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="radio1" />
                  <Label htmlFor="radio1">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="radio2" />
                  <Label htmlFor="radio2">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="radio3" />
                  <Label htmlFor="radio3">System</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Progress Indicators</h3>
        <div className="space-y-4">
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseProgress}
              id="decrease-progress"
            >
              Decrease
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseProgress}
              id="increase-progress"
            >
              Increase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Feature Card */}
    <Card className="p-6">
      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <DollarSign className="text-primary h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-2">TypeScript</h3>
      <p className="text-muted-foreground mb-4">
        Static type-checking along with the latest ECMAScript features.
      </p>
      <Button variant="outline" className="w-full">
        Learn More
      </Button>
    </Card>

    {/* Statistic Card */}
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold">Performance</h3>
        <Badge>+12%</Badge>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm text-muted-foreground">Page Load Time</span>
          <span className="text-2xl font-bold">0.4s</span>
        </div>
        <Progress value={85} className="h-2" />
      </div>
    </Card>

    {/* Profile Card */}
    <Card className="p-6">
      <div className="size-16 rounded-full mx-auto mb-4 border-4 border-background overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
          alt="Developer profile"
          className="size-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold">Alex Johnson</h3>
        <p className="text-muted-foreground mb-4">Senior Developer</p>
        <div className="flex justify-center space-x-2">
          <Button size="sm">Follow</Button>
          <Button variant="outline" size="sm">
            Message
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

const GSAPTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Animation Demo</h3>
      <div className="gsap-demo relative overflow-hidden w-full h-[300px] rounded-md bg-secondary">
        <div className="gsap-element size-16 rounded-full bg-primary absolute" id="box1"></div>
        <div className="gsap-element size-8 rounded-full bg-primary absolute" id="box2"></div>
        <div className="gsap-element size-12 rounded-full bg-primary absolute" id="box3"></div>
        <div className="gsap-element size-24 rounded-full bg-primary absolute" id="box4"></div>
      </div>
      <div className="flex space-x-4">
        <Button id="play-animation">Play Animation</Button>
        <Button variant="outline" id="reset-animation">
          Reset
        </Button>
      </div>
    </div>

    <div className="space-y-6">
      <h3 className="text-xl font-semibold">GSAP Code Example</h3>
      <div className="bg-muted p-5 rounded-md overflow-x-auto">
        <pre className="text-sm font-mono typewriter">
          <code>
{`// Sample GSAP animation code
import { gsap } from "gsap";

// Create a timeline
const tl = gsap.timeline();

// Add animations to the timeline
tl.to("#box1", { 
  x: 200, 
  rotation: 360, 
  duration: 2,
  ease: "elastic" 
})
.to("#box2", { 
  y: 100, 
  scale: 1.5,
  duration: 1 
}, "-=1.5")
.from("#box3", { 
  opacity: 0,
  y: -50,
  stagger: 0.2
});`}
          </code>
        </pre>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full" onClick={() => navigator.clipboard.writeText(`// Sample GSAP animation code
import { gsap } from "gsap";

// Create a timeline
const tl = gsap.timeline();

// Add animations to the timeline
tl.to("#box1", { 
  x: 200, 
  rotation: 360, 
  duration: 2,
  ease: "elastic" 
})
.to("#box2", { 
  y: 100, 
  scale: 1.5,
  duration: 1 
}, "-=1.5")
.from("#box3", { 
  opacity: 0,
  y: -50,
  stagger: 0.2
});`)}>
              Copy Code
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code copied to clipboard!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

const ComponentShowcase = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10 gsap-fade-in">
          Component Showcase
        </h2>

        <Tabs defaultValue="buttons" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Form Elements</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="gsap">GSAP Animations</TabsTrigger>
          </TabsList>
          <TabsContent value="buttons">
            <ButtonsTab />
          </TabsContent>
          <TabsContent value="inputs">
            <FormElementsTab />
          </TabsContent>
          <TabsContent value="cards">
            <CardsTab />
          </TabsContent>
          <TabsContent value="gsap">
            <GSAPTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ComponentShowcase;
