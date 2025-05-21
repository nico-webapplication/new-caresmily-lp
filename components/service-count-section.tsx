"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider"

interface CounterProps {
  label: string
  sublabel1: string
  sublabel2: string
  count?: number
  isCalculating?: boolean
}

const Counter = ({ label, sublabel1, sublabel2, count = 0, isCalculating = true }: CounterProps) => {
  const [displayCount, setDisplayCount] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || isCalculating) return

    // GSAPを使用せずに直接JavaScriptでカウントアップを実装
    let startTimestamp: number | null = null
    const duration = 2000 // 2秒間
    const startValue = 0
    const endValue = count

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = Math.floor(startValue + progress * (endValue - startValue))

      setDisplayCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(step)
          observer.disconnect() // 一度だけ実行
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [count, isCalculating])

  return (
    <div ref={elementRef} className="flex flex-col items-center p-6 bg-[#29a9e0]/20 rounded-lg shadow-md text-white">
      {isCalculating ? (
        <div className="text-3xl font-bold mb-2">集計中</div>
      ) : (
        <div className="text-3xl font-bold mb-2">{displayCount.toLocaleString()}</div>
      )}
      <div className="text-xl font-medium mb-1">{label}</div>
      <div className="text-sm text-center">
        <div>{sublabel1}</div>
        <div>{sublabel2}</div>
      </div>
    </div>
  )
}

// useScrollTriggerを使用する部分を修正
export default function ServiceCountSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [totalCount, setTotalCount] = useState(0)
  const totalCountRef = useRef<HTMLDivElement>(null)
  const { scroller } = useScrollTrigger()

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && titleRef.current) {
      // タイトルのアニメーション
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        scroller: scroller || undefined,
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          })
        },
      })
    }

    // 総文例数のカウントアップアニメーション - GSAPを使わずに実装
    let startTimestamp: number | null = null
    const duration = 3000 // 3秒間
    const startValue = 0
    const endValue = 100000

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = Math.floor(startValue + progress * (endValue - startValue))

      setTotalCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(step)
          observer.disconnect() // 一度だけ実行
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      root: document.querySelector(scroller || null),
    })

    if (totalCountRef.current) {
      observer.observe(totalCountRef.current)
    }

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [scroller])

  // サービスごとのデータ
  const serviceData = [
    {
      label: "デイサービス",
      sublabel1: "通所介護計画書・送迎",
      sublabel2: "様子",
      count: 32450,
      isCalculating: false,
    },
    {
      label: "訪問介護",
      sublabel1: "訪問介護計画書・サー",
      sublabel2: "ビス提供記録",
      count: 28750,
      isCalculating: false,
    },
    {
      label: "介護記録",
      sublabel1: "日常生活記録・ケース",
      sublabel2: "記録",
      isCalculating: true,
    },
    {
      label: "居宅支援",
      sublabel1: "アセスメント・ケアプラ",
      sublabel2: "ン",
      isCalculating: true,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-[#29a9e0]">
      <div className="container mx-auto">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">業界最大級の文例データベース</h2>
          <p className="text-xl text-white max-w-4xl mx-auto">
            専門家監修による高品質な文例を豊富に取り揃え、介護現場のあらゆるニーズに対応いたします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {serviceData.map((service, index) => (
            <Counter
              key={index}
              label={service.label}
              sublabel1={service.sublabel1}
              sublabel2={service.sublabel2}
              count={service.count}
              isCalculating={service.isCalculating}
            />
          ))}
        </div>

        <div className="bg-[#29a9e0]/30 rounded-full py-6 px-12 max-w-2xl mx-auto text-center mb-12">
          <div className="text-white text-2xl mb-2">総文例数</div>
          <div ref={totalCountRef} className="text-white text-6xl md:text-7xl font-bold">
            {totalCount.toLocaleString()} <span className="text-3xl">件</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white text-xl">専門家監修による高品質な文例を、日々のケアに合わせて最適化しています</p>
        </div>
      </div>
    </section>
  )
}
