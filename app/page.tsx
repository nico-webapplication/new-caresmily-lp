"use client"

import HeroSection from "@/components/hero-section"
import ServiceSection from "@/components/service-section"
import PointsSection from "@/components/points-section"
import ServiceContentSection from "@/components/service-content-section"
import FeaturesSection from "@/components/features-section"
import FAQSection from "@/components/faq-section"
import ServiceCountSection from "@/components/service-count-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 固定された枠 */}
      <div className="fixed inset-0 border-[12px] border-[rgb(10,37,64)] pointer-events-none z-30"></div>

      {/* Landing page content - スクロール可能 */}
      <div className="relative z-20 h-screen overflow-auto">
        <HeroSection />
        <ServiceSection />
        <PointsSection />
        <FeaturesSection />
        <ServiceContentSection />
        <ServiceCountSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  )
}
