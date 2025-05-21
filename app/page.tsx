"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GlobalHeader from "@/components/global-header"
import HeroSection from "@/components/hero-section"
import ServiceSection from "@/components/service-section"
import PointsSection from "@/components/points-section"
import ServiceContentSection from "@/components/service-content-section"
import FeaturesSection from "@/components/features-section"
import FAQSection from "@/components/faq-section"
import ServiceCountSection from "@/components/service-count-section"
import Footer from "@/components/footer"
import { DocumentScatter } from "@/components/document-scatter-component"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const documentsRef = useRef<HTMLElement[]>([])
  const frameLogoRef = useRef<HTMLAnchorElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Register GSAP plugins
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  // Frame logo animation
  useEffect(() => {
    if (!frameLogoRef.current || !contentRef.current) return

    // Create scroll trigger for frame logo animation
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "top -100px",
      scrub: true,
      onUpdate: (self) => {
        // Animate frame logo based on scroll progress
        if (frameLogoRef.current) {
          gsap.to(frameLogoRef.current, {
            opacity: 1 - self.progress,
            scale: 1 - self.progress * 0.2,
            duration: 0.1,
            overwrite: true,
          })
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const playAnimation = () => {
    if (containerRef.current && contentRef.current) {
      const documents = containerRef.current.querySelectorAll(".document")

      // Store documents for later use
      documentsRef.current = Array.from(documents) as HTMLElement[]

      // Hide content initially
      gsap.set(contentRef.current, {
        opacity: 0,
        y: "100%", // Start from bottom
        display: "block",
      })

      setAnimationComplete(false)

      // Reset positions to top of screen with random X positions
      gsap.to(documents, {
        x: () => gsap.utils.random(-window.innerWidth / 2 + 100, window.innerWidth / 2 - 100),
        y: -window.innerHeight,
        rotation: () => gsap.utils.random(-30, 30),
        scale: () => gsap.utils.random(0.7, 1.2),
        opacity: 1,
        duration: 0.3,
        stagger: 0.005,
        ease: "power2.in",
        onComplete: () => {
          // Fall down and pile up in center
          gsap.to(documents, {
            y: 0,
            x: (i) => gsap.utils.random(-30, 30),
            rotation: (i) => gsap.utils.random(-15, 15),
            duration: () => gsap.utils.random(0.7, 1.5),
            stagger: 0.01,
            ease: "bounce.out",
            onComplete: () => {
              // Wait a moment then scatter
              gsap.delayedCall(0.2, () => {
                // Scatter documents widely but keep them more in the center/bottom area
                // so they can be pushed by the rising LP
                gsap.to(documents, {
                  x: () => gsap.utils.random(-window.innerWidth * 0.6, window.innerWidth * 0.6),
                  y: () => gsap.utils.random(-window.innerHeight * 0.3, window.innerHeight * 0.5), // More documents in lower half
                  rotation: () => gsap.utils.random(-180, 180),
                  scale: () => gsap.utils.random(0.6, 1.3),
                  opacity: () => gsap.utils.random(0.8, 1),
                  duration: 1,
                  stagger: 0.005,
                  ease: "power3.out",
                  onComplete: () => {
                    // After documents are scattered, animate the content coming up
                    // and pushing documents away
                    animateContentAndPushDocuments()
                  },
                })
              })
            },
          })
        },
      })
    }
  }

  // Improved function to animate content and push documents
  const animateContentAndPushDocuments = () => {
    if (!contentRef.current || documentsRef.current.length === 0) return

    // Create timeline for coordinated animation
    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true),
    })

    // Animate content coming up from bottom - SLOWER
    tl.to(
      contentRef.current,
      {
        y: "0%",
        opacity: 1,
        duration: 2.5, // Much slower rise (was 1.2)
        ease: "power1.inOut", // Smoother easing
      },
      0,
    )

    // Prepare documents for more realistic physics
    // Group documents by their vertical position
    const bottomDocs = []
    const middleDocs = []
    const topDocs = []

    documentsRef.current.forEach((doc) => {
      const rect = doc.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const windowHeight = window.innerHeight

      if (centerY > windowHeight * 0.7) {
        bottomDocs.push(doc) // Bottom 30%
      } else if (centerY > windowHeight * 0.4) {
        middleDocs.push(doc) // Middle 30%
      } else {
        topDocs.push(doc) // Top 40%
      }
    })

    // Bottom documents - pushed up first and fastest
    tl.to(
      bottomDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          // Push up and slightly to sides
          return centerY - window.innerHeight * 1.2
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(100, 300)}`
        },
        rotation: () => gsap.utils.random(-720, 720),
        scale: () => gsap.utils.random(0.4, 0.8),
        opacity: 0.4,
        duration: 2,
        stagger: {
          amount: 0.5,
          from: "center",
        },
        ease: "power2.out",
      },
      0.1, // Start slightly after content begins rising
    )

    // Middle documents - pushed up with slight delay
    tl.to(
      middleDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          return centerY - window.innerHeight * 1
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(150, 350)}`
        },
        rotation: () => gsap.utils.random(-540, 540),
        scale: () => gsap.utils.random(0.4, 0.7),
        opacity: 0.3,
        duration: 1.8,
        stagger: {
          amount: 0.6,
          from: "center",
        },
        ease: "power2.out",
      },
      0.4, // Delayed start
    )

    // Top documents - pushed up last and least
    tl.to(
      topDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          return centerY - window.innerHeight * 0.7
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(100, 250)}`
        },
        rotation: () => gsap.utils.random(-360, 360),
        scale: () => gsap.utils.random(0.3, 0.6),
        opacity: 0.2,
        duration: 1.5,
        stagger: {
          amount: 0.7,
          from: "center",
        },
        ease: "power1.out",
      },
      0.7, // Even more delayed
    )
  }

  useEffect(() => {
    // Play animation on initial load
    playAnimation()

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        const documents = containerRef.current.querySelectorAll(".document")
        gsap.killTweensOf(documents)
        playAnimation()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* 固定された枠 */}
      <div className="fixed inset-0 border-[12px] border-[rgb(10,37,64)] rounded-[15px] pointer-events-none z-30"></div>
      
      {/* グローバルヘッダー */}
      <GlobalHeader />

      {/* Animation container - always visible */}
      <div
        ref={containerRef}
        className={`w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          animationComplete ? "opacity-30" : "opacity-100"
        }`}
      >
        <DocumentScatter />
      </div>

      {/* Landing page content - スクロール可能 */}
      <div ref={contentRef} id="content-scroll" className="relative z-20 h-screen overflow-auto">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="service">
          <ServiceSection />
        </div>
        <div id="points">
          <PointsSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="content">
          <ServiceContentSection />
        </div>
        <div id="count">
          <ServiceCountSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <Footer />
      </div>
    </main>
  )
}
