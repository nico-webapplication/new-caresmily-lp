"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  FileText,
  Clock,
  Smile,
  BarChart4,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState<any>(null)

  // 特徴カードの配列
  const features = [
    {
      icon: <FileText className="h-12 w-12 text-white" />,
      title: "書類作成の自動化",
      description: "AIが介護記録を自動で作成し、書類作成の時間を大幅に削減します。",
      color: "bg-sky-600",
    },
    {
      icon: <Clock className="h-12 w-12 text-white" />,
      title: "時間の節約",
      description: "管理業務の効率化により、より多くの時間を利用者様のケアに使えるようになります。",
      color: "bg-indigo-600",
    },
    {
      icon: <Smile className="h-12 w-12 text-white" />,
      title: "利用者満足度の向上",
      description: "より質の高いケアを提供することで、利用者様とその家族の満足度が向上します。",
      color: "bg-green-600",
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-white" />,
      title: "データ分析と改善",
      description: "蓄積されたデータを分析し、サービスの質を継続的に改善します。",
      color: "bg-amber-600",
    },
    {
      icon: <Calendar className="h-12 w-12 text-white" />,
      title: "スケジュール管理",
      description: "ケアスタッフのシフトやサービス提供時間を最適化し、効率的な運営をサポートします。",
      color: "bg-rose-600",
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-white" />,
      title: "コミュニケーション強化",
      description: "スタッフ間や家族との情報共有をスムーズにし、連携を強化します。",
      color: "bg-blue-600",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-white" />,
      title: "安全管理システム",
      description: "利用者様の安全を守るためのリスク管理と事故防止機能を提供します。",
      color: "bg-purple-600",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-white" />,
      title: "ケアプラン提案",
      description: "AIが個々の利用者様に最適なケアプランを提案し、パーソナライズされたサービスを実現します。",
      color: "bg-yellow-600",
    },
  ]

  // 前のカードに移動
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)

      // ScrollTriggerの位置も更新
      if (scrollTriggerInstance) {
        const progress = (activeIndex - 1) / (features.length - 1)
        scrollTriggerInstance.scroll(
          scrollTriggerInstance.start + (scrollTriggerInstance.end - scrollTriggerInstance.start) * progress,
        )
      }
    }
  }

  // 次のカードに移動
  const handleNext = () => {
    if (activeIndex < features.length - 1) {
      setActiveIndex(activeIndex + 1)

      // ScrollTriggerの位置も更新
      if (scrollTriggerInstance) {
        const progress = (activeIndex + 1) / (features.length - 1)
        scrollTriggerInstance.scroll(
          scrollTriggerInstance.start + (scrollTriggerInstance.end - scrollTriggerInstance.start) * progress,
        )
      }
    }
  }

  // 特定のカードに移動
  const goToCard = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)

    // ScrollTriggerの位置も更新
    if (scrollTriggerInstance) {
      const progress = index / (features.length - 1)
      scrollTriggerInstance.scroll(
        scrollTriggerInstance.start + (scrollTriggerInstance.end - scrollTriggerInstance.start) * progress,
      )
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Create a GSAP context specific to this component
    const ctx = gsap.context(() => {
      // Clean up existing ScrollTrigger instances with these IDs
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "featuresScroll" || trigger.vars.id === "featuresPinning") {
          trigger.kill()
        }
      })

      if (sectionRef.current && cardsContainerRef.current) {
        // Get valid card elements
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

        // Function to update card appearance
        const updateCardsAppearance = (currentIndex: number, progress: number) => {
          cards.forEach((card, i) => {
            // Distance from current card
            const position = i - currentIndex

            // Animate each card
            gsap.to(card, {
              xPercent: position * 60,
              z: position === 0 ? 0 : -100,
              rotationY: position * 15,
              opacity: position === 0 ? 1 : 0.7,
              zIndex: features.length - Math.abs(position),
              duration: 0.5,
              ease: "power2.out",
              id: `featureCard${i}`, // Add unique identifier
            })
          })
        }

        // Create ScrollTrigger for card switching
        const trigger = ScrollTrigger.create({
          id: "featuresScroll",
          trigger: sectionRef.current,
          start: "top center", // Start when top of section reaches center of viewport
          end: () => `+=${window.innerHeight * 1.5}`, // Scroll distance = 1.5x viewport height
          pin: true, // Pin the section
          pinSpacing: true, // Maintain space for pinned element
          scrub: 1, // Smooth scrolling effect
          onUpdate: (self) => {
            // Update active card based on scroll position
            const newIndex = Math.min(features.length - 1, Math.max(0, Math.round(self.progress * (features.length - 1))))

            if (newIndex !== activeIndex) {
              setActiveIndex(newIndex)
            }

            // Update card positions and rotations
            updateCardsAppearance(newIndex, self.progress)
          },
          onEnter: () => {
            // When section enters viewport
            gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.5 })
          },
          onLeave: () => {
            // When section leaves viewport
            gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.5 })
          },
          onEnterBack: () => {
            // When section re-enters viewport from below
            gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.5 })
          },
          onLeaveBack: () => {
            // When section leaves viewport from above
            gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.5 })
          },
        })

        setScrollTriggerInstance(trigger)

        // Set initial state
        updateCardsAppearance(0, 0)

        // Add scroll indicator
        const scrollIndicator = document.createElement("div")
        scrollIndicator.className = "scroll-indicator"
        scrollIndicator.style.cssText = `
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 4px;
          background-color: rgba(0,0,0,0.1);
          border-radius: 2px;
          overflow: hidden;
          z-index: 100;
        `

        const scrollProgress = document.createElement("div")
        scrollProgress.style.cssText = `
          height: 100%;
          width: 0%;
          background-color: #0ea5e9;
          transition: width 0.3s;
        `

        scrollIndicator.appendChild(scrollProgress)
        sectionRef.current.appendChild(scrollIndicator)

        // Update scroll progress
        trigger.vars.onUpdate = (self: any) => {
          const newIndex = Math.min(features.length - 1, Math.max(0, Math.round(self.progress * (features.length - 1))))

          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex)
          }

          // Update card positions and rotations
          updateCardsAppearance(newIndex, self.progress)

          // Update scroll indicator
          scrollProgress.style.width = `${self.progress * 100}%`
        }

        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "ArrowLeft") {
            handlePrev()
          } else if (e.key === "ArrowRight") {
            handleNext()
          }
        }

        window.addEventListener("keydown", handleKeyDown)

        // Return cleanup function
        return () => {
          window.removeEventListener("keydown", handleKeyDown)
          if (scrollIndicator.parentNode) {
            scrollIndicator.parentNode.removeChild(scrollIndicator)
          }
        }
      }
    }, sectionRef); // Scope GSAP context to section element

    // Return cleanup function for the entire effect
    return () => {
      ctx.revert(); // This automatically cleans up all animations created in this context
    }
  }, [activeIndex, features.length, handleNext, handlePrev])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
      style={{
        visibility: "visible",
        opacity: 1,
        zIndex: 1,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">CareSmily の特徴</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            介護現場の課題を解決し、より良いケアを実現するための機能を提供します
          </p>
        </div>

        {/* カードカルーセル */}
        <div className="relative max-w-4xl mx-auto">
          {/* カードコンテナ */}
          <div
            ref={cardsContainerRef}
            className="relative h-[450px] perspective-1000 mx-auto"
            style={{ perspective: "1000px" }}
          >
            {features.map((feature, index) => {
              // 表示するカードの範囲を制限（パフォーマンス向上のため）
              const position = index - activeIndex
              const isVisible = Math.abs(position) <= 2

              if (!isVisible) return null

              return (
                <div
                  key={index}
                  ref={(el) => { cardsRef.current[index] = el }}
                  className={`absolute top-0 left-0 right-0 mx-auto w-[300px] h-[400px] ${feature.color} rounded-xl shadow-xl transition-all duration-500 ease-out`}
                  style={{
                    transform: `
                      translateX(${position * 60}%) 
                      translateZ(${position === 0 ? 0 : -100}px) 
                      rotateY(${position * 15}deg)
                    `,
                    opacity: position === 0 ? 1 : 0.7,
                    zIndex: features.length - Math.abs(position),
                    WebkitBoxReflect: "below 10px linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2))",
                  }}
                >
                  {/* カード番号 */}
                  <span className="absolute top-4 right-4 text-white text-opacity-50 text-xl font-bold">
                    {index + 1}
                  </span>

                  {/* カード内容 */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white">
                    <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-full">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white text-opacity-90">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeIndex === 0}
              aria-label="前へ"
            >
              <ChevronLeft className="text-sky-600" />
            </button>

            {/* インジケーター */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-sky-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`特徴 ${index + 1} へ移動`}
                ></button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeIndex === features.length - 1}
              aria-label="次へ"
            >
              <ChevronRight className="text-sky-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
