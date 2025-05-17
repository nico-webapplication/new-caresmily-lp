"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ScrollTriggerを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current && testimonialsRef.current) {
        const testimonials = testimonialsRef.current.querySelectorAll(".testimonial-card")

        gsap.set(testimonials, { opacity: 0, y: 30 })

        ScrollTrigger.batch(testimonials, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
            })
          },
          start: "top 80%",
        })
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  const testimonials = [
    {
      quote:
        "CareSmily を導入してから、書類作成の時間が半分以下になりました。その分、利用者様とコミュニケーションを取る時間が増え、サービスの質が向上しました。",
      name: "田中 美咲",
      role: "介護施設管理者",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "直感的な操作性で、ITに詳しくないスタッフでもすぐに使いこなせるようになりました。記録の質も向上し、情報共有がスムーズになりました。",
      name: "佐藤 健太",
      role: "介護士",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "データ分析機能により、サービス改善のポイントが明確になりました。利用者様の満足度が大幅に向上し、新規問い合わせも増えています。",
      name: "鈴木 優子",
      role: "デイサービス経営者",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-6 bg-sky-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">お客様の声</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CareSmily を導入された施設様からいただいた声をご紹介します
          </p>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-700">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
