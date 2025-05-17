import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const initGSAP = () => {
  // Animate logo
  gsap.to(".gsap-logo", {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: "linear",
  });

  // Hero section animations
  gsap.from(".gsap-fade-in", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
  });

  // Staggered animations for cards
  gsap.from(".tech-card", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".gsap-stagger-section",
      start: "top 80%",
    },
  });

  // Set up the GSAP demo animation
  setupGSAPDemo();
};

// Set up the GSAP demo animation
const setupGSAPDemo = () => {
  // Wait for DOM to be ready
  setTimeout(() => {
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");

    if (box1 && box2 && box3 && box4) {
      // Set initial positions
      gsap.set(box1, { x: 20, y: 20 });
      gsap.set(box2, { x: 60, y: 60 });
      gsap.set(box3, { x: 150, y: 100 });
      gsap.set(box4, { x: 200, y: 180 });

      // Create timeline
      const tl = gsap.timeline({ paused: true });

      // Add animations
      tl.to(box1, {
        x: 240,
        rotation: 360,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
      })
        .to(
          box2,
          {
            y: 180,
            scale: 1.5,
            duration: 1,
            backgroundColor: "#22c55e",
          },
          "-=1.5"
        )
        .to(
          box3,
          {
            x: 50,
            rotation: -180,
            backgroundColor: "#ec4899",
            duration: 1.5,
          },
          "-=1"
        )
        .to(
          box4,
          {
            y: 50,
            scale: 0.5,
            backgroundColor: "#f59e0b",
            duration: 1,
          },
          "-=0.8"
        );

      // Control buttons
      const playButton = document.getElementById("play-animation");
      const resetButton = document.getElementById("reset-animation");

      if (playButton) {
        playButton.addEventListener("click", () => {
          tl.play();
        });
      }

      if (resetButton) {
        resetButton.addEventListener("click", () => {
          tl.pause(0);
        });
      }
    }
  }, 500);
};
