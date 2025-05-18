"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import ServiceSection from "@/components/service-section"
import PointsSection from "@/components/points-section"
import ServiceContentSection from "@/components/service-content-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import AboutSection from "@/components/about-section"
import FAQSection from "@/components/faq-section" // 追加
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import PageReveal from "@/components/page-reveal"
import { DocumentScatter } from "@/components/document-scatter-component"

// ScrollTrigger をグローバルに登録
gsap.registerPlugin(ScrollTrigger)

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
      documentsRef.current = Array.from(documents) as HTMLElement[]

      if (contentRef.current) {
        // 非表示方法は display:none のままでも OK
        contentRef.current.style.display = "none"
        gsap.set(contentRef.current, { opacity: 0, scale: 0.8 })
      }

      setAnimationComplete(false)
      setShowPageReveal(false)

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
          gsap.to(documents, {
            y: 0,
            x: (i) => gsap.utils.random(-30, 30),
            rotation: (i) => gsap.utils.random(-15, 15),
            duration: () => gsap.utils.random(0.7, 1.5),
            stagger: 0.01,
            ease: "bounce.out",
            onComplete: () => {
              gsap.delayedCall(0.2, () => {
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

  // PageReveal イベントに合わせて ScrollTrigger をリフレッシュ
  useEffect(() => {
    if (showPageReveal && pageRevealRef.current && documentsRef.current.length > 0) {
      const handlePageRevealStart = () => {
        // 追加散らしなど
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

        // ScrollTrigger のレイアウト情報を再取得
        ScrollTrigger.refresh()

        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0.3,
            duration: 1,
          })
        }

        setAnimationComplete(true)
      }

      window.addEventListener("pageRevealStart", handlePageRevealStart)
      window.addEventListener("pageRevealComplete", handlePageRevealComplete)
      return () => {
        window.removeEventListener("pageRevealStart", handlePageRevealStart)
        window.removeEventListener("pageRevealComplete", handlePageRevealComplete)
      }
    }
  }, [showPageReveal])

  useEffect(() => {
    playAnimation()
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
      <div className="bg-[#1A2B4A] w-full h-8"></div>
      <div
        ref={containerRef}
        className={`w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          animationComplete ? "opacity-30" : "opacity-100"
        }`}
      >
        <DocumentScatter />
        {showPageReveal && <PageReveal ref={pageRevealRef} />}
      </div>

      <div ref={contentRef} className="relative z-20">
        <HeroSection onReplayAnimation={playAnimation} />
        <ServiceSection />
        <PointsSection />
        <ServiceContentSection />
        <FeaturesSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection /> {/* 追加 */}
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
