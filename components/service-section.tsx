"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ScrollTriggerを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // マーキーアニメーション（右から左へ流れるテキスト）
      if (marqueeRef.current) {
        const marqueeElements = marqueeRef.current.querySelectorAll(".marquee-content")

        gsap.to(marqueeElements, {
          xPercent: -100, // 左に100%移動（右から左へ流れる効果）
          repeat: -1, // 無限に繰り返す
          duration: 40, // アニメーションの時間（秒）- ゆっくり流す
          ease: "linear", // 一定速度で移動
        })
      }

      // 画像のアニメーション
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            })
          },
        })
      }

      // コンテンツのアニメーション
      if (contentRef.current) {
        const contentElements = contentRef.current.querySelectorAll(".animate-item")

        gsap.set(contentElements, { opacity: 0, y: 30 })

        ScrollTrigger.batch(contentElements, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
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

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-6 bg-white overflow-hidden">
      {/* マーキーアニメーション部分 */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden mb-12">
        <div className="flex whitespace-nowrap">
          {/* 2つのコンテンツを並べて無限ループのように見せる */}
          <div className="marquee-content flex-shrink-0">
            <div className="flex items-center">
              {/* 多くのテキストを配置して途切れないようにする */}
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className="text-[#0a2540] text-4xl md:text-5xl font-bold font-serif italic mr-12">
                  About Our SERVICE?
                </span>
              ))}
            </div>
          </div>
          <div className="marquee-content flex-shrink-0">
            <div className="flex items-center">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className="text-[#0a2540] text-4xl md:text-5xl font-bold font-serif italic mr-12">
                  About Our SERVICE?
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* より大きな破線 */}
        <div className="w-full h-8 mt-6 border-b-8 border-dashed border-[#0a2540] border-spacing-4"></div>
      </div>

      {/* メインコンテンツ */}
      <div ref={contentRef} className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 左側：イラスト */}
          <div ref={imageRef} className="relative animate-item">
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                <Image
                  src="/images/care-service-illustration.png"
                  alt="CareSmily サービスイラスト"
                  fill
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-xl"
                  priority
                />
              </div>

              {/* 装飾的な要素 - 背景の円 */}
              <div className="absolute w-[90%] h-[90%] rounded-full bg-sky-100/50 -z-10"></div>

              {/* 装飾的な要素 - 点線の円 */}
              <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-sky-300/50 -z-10 animate-spin-slow"></div>
            </div>
          </div>

          {/* 右側：テキストコンテンツ */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] animate-item">
              おまかせケアサポート<span className="text-2xl md:text-3xl ml-2">とは？</span>
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 animate-item">介護現場での書類作成や記録管理の負担を、</p>
              <p className="text-lg text-gray-700 animate-item">AIと専門スタッフがサポートすることで、</p>
              <p className="text-lg text-gray-700 animate-item">より質の高いケアの時間を生み出すサービスです。</p>
            </div>
            <div className="pt-4 animate-item">
              <button className="bg-[#42a5d5] hover:bg-[#3890bd] text-white px-6 py-3 rounded-md font-medium transition-colors">
                詳しく見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
