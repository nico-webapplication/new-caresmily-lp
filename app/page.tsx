"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import HeroSection from "@/components/hero-section"
import ServiceSection from "@/components/service-section"
import PointsSection from "@/components/points-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import PageReveal from "@/components/page-reveal"
import { DocumentScatter } from "@/components/document-scatter-component"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageRevealRef = useRef<HTMLDivElement>(null)
  const documentsRef = useRef<HTMLElement[]>([])
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showPageReveal, setShowPageReveal] = useState(false)

  const playAnimation = () => {
    if (containerRef.current) {
      const documents = containerRef.current.querySelectorAll(".document")

      // Store documents for later use
      documentsRef.current = Array.from(documents) as HTMLElement[]

      // Hide content during animation
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          opacity: 0,
          scale: 0.8,
          display: "none",
        })
      }

      setAnimationComplete(false)
      setShowPageReveal(false)

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
                // Scatter documents widely (including off-screen)
                gsap.to(documents, {
                  x: () => gsap.utils.random(-window.innerWidth * 1.2, window.innerWidth * 1.2),
                  y: () => gsap.utils.random(-window.innerHeight * 1.2, window.innerHeight * 1.2),
                  rotation: () => gsap.utils.random(-360, 360),
                  scale: () => gsap.utils.random(0.6, 1.3),
                  opacity: () => gsap.utils.random(0.7, 1),
                  duration: 1,
                  stagger: 0.005,
                  ease: "power3.out",
                  onComplete: () => {
                    // Show page reveal after documents scatter
                    setShowPageReveal(true)
                  },
                })
              })
            },
          })
        },
      })
    }
  }

  // Effect to handle page reveal animation
  useEffect(() => {
    if (showPageReveal && pageRevealRef.current && documentsRef.current.length > 0) {
      // When page reveal starts, scatter documents further
      const scatterDocumentsMore = () => {
        gsap.to(documentsRef.current, {
          x: (i) => {
            const currentX = gsap.getProperty(documentsRef.current[i], "x") as number
            const direction = currentX > 0 ? 1 : -1
            return currentX + direction * gsap.utils.random(100, 300)
          },
          y: (i) => {
            const currentY = gsap.getProperty(documentsRef.current[i], "y") as number
            const direction = currentY > 0 ? 1 : -1
            return currentY + direction * gsap.utils.random(100, 300)
          },
          rotation: (i) => {
            const currentRotation = gsap.getProperty(documentsRef.current[i], "rotation") as number
            return currentRotation + gsap.utils.random(-180, 180)
          },
          scale: () => gsap.utils.random(0.5, 1.4),
          duration: 1.5,
          stagger: 0.01,
          ease: "power2.out",
        })
      }

      // Listen for the pageRevealStart event
      const handlePageRevealStart = () => {
        scatterDocumentsMore()
      }

      // Listen for the pageRevealComplete event
      const handlePageRevealComplete = () => {
        if (contentRef.current) {
          contentRef.current.style.display = "block"
          gsap.to(contentRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          })
        }

        // Keep documents visible but fade them slightly
        gsap.to(containerRef.current, {
          opacity: 0.3,
          duration: 1,
        })

        setAnimationComplete(true)
      }

      // Add event listeners
      window.addEventListener("pageRevealStart", handlePageRevealStart)
      window.addEventListener("pageRevealComplete", handlePageRevealComplete)

      return () => {
        // Remove event listeners
        window.removeEventListener("pageRevealStart", handlePageRevealStart)
        window.removeEventListener("pageRevealComplete", handlePageRevealComplete)
      }
    }
  }, [showPageReveal])

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
    <main className="w-screen min-h-screen overflow-x-hidden bg-white">
      {/* Animation container - always visible */}
      <div
        ref={containerRef}
        className={`w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          animationComplete ? "opacity-30" : "opacity-100"
        }`}
      >
        <DocumentScatter />
        {showPageReveal && <PageReveal ref={pageRevealRef} />}
      </div>

      {/* Landing page content */}
      <div ref={contentRef} className="relative z-20">
        <HeroSection onReplayAnimation={playAnimation} />
        <ServiceSection />
        <PointsSection />
        {/* <FeaturesSection /> */}
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
