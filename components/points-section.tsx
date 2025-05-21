"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import Image from "next/image"
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// useScrollTriggerを使用する部分を修正
export default function PointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<HTMLDivElement>(null)
  const leftBorderRef = useRef<HTMLDivElement>(null)
  const rightBorderRef = useRef<HTMLDivElement>(null)
  const wheelchairRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const { scroller } = useScrollTrigger()

  useEffect(() => {
    // GSAPプラグインを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

      // タイトルのアニメーション
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: -30 })

        ScrollTrigger.create({
          trigger: titleRef.current,
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

      // ポイントカードのアニメーション
      if (pointsRef.current) {
        const points = pointsRef.current.querySelectorAll(".point-card")

        gsap.set(points, { opacity: 0, y: 50 })

        ScrollTrigger.batch(points, {
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
          scroller: scroller || undefined,
        })
      }

      // 左右の縁の文字アニメーション - 下から上へ流す
      if (leftBorderRef.current && rightBorderRef.current) {
        // 左側の文字コンテナ
        const leftContainer = leftBorderRef.current.querySelector(".text-loop-container")

        if (leftContainer) {
          // コンテナ内の高さを取得するために一時的に表示
          gsap.set(leftContainer, { visibility: "visible" })
          
          // 最初のコンテナを一番下に配置して、クローンを作成
          const leftContainerHeight = leftBorderRef.current.clientHeight
          const leftContentHeight = leftContainer.scrollHeight / 2  // 実際のコンテンツの高さ（重複を考慮）
          
          // 開始位置を設定（一番下から始まる）
          gsap.set(leftContainer, { y: 0 })
          
          // 下から上に流す無限ループアニメーション - 途切れないよう調整
          gsap.to(leftContainer, {
            y: -leftContentHeight,
            repeat: -1,
            duration: 30,
            ease: "linear",
            repeatDelay: 0, // 繰り返し時の遅延なし
          })
        }

        // 右側の文字コンテナ
        const rightContainer = rightBorderRef.current.querySelector(".text-loop-container")

        if (rightContainer) {
          // コンテナ内の高さを取得するために一時的に表示
          gsap.set(rightContainer, { visibility: "visible" })
          
          // 最初のコンテナを一番下に配置して、クローンを作成
          const rightContainerHeight = rightBorderRef.current.clientHeight
          const rightContentHeight = rightContainer.scrollHeight / 2  // 実際のコンテンツの高さ（重複を考慮）
          
          // 開始位置を設定（一番下から始まる）
          gsap.set(rightContainer, { y: 0 })
          
          // 下から上に流す無限ループアニメーション - 途切れないよう調整
          gsap.to(rightContainer, {
            y: -rightContentHeight,
            repeat: -1,
            duration: 30,
            ease: "linear",
            repeatDelay: 0, // 繰り返し時の遅延なし
          })
        }
      }

      // 車いすのスクロールアニメーション
      if (wheelchairRef.current && svgPathRef.current && sectionRef.current) {
        // 車いすの初期設定
        gsap.set(wheelchairRef.current, {
          opacity: 0.95,
          scale: 0.8,
          transformOrigin: "50% 50%",
        })

        // 車いすの回転を制御する関数
        let prevDirection = 0
        const rotateTo = gsap.quickTo(wheelchairRef.current, "rotation")

        // スクロールに連動した車いすのアニメーション
        gsap.to(wheelchairRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            scroller: scroller || undefined,
            onUpdate: (self) => {
              if (prevDirection !== self.direction) {
                // 方向が変わったときだけ実行
                rotateTo(self.direction === 1 ? 0 : -180)
                prevDirection = self.direction
              }
            },
          },
          ease: "none",
          immediateRender: true,
          motionPath: {
            path: svgPathRef.current,
            align: svgPathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
          },
        })
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        if (wheelchairRef.current) {
          gsap.killTweensOf(wheelchairRef.current)
        }
      }
    }
  }, [scroller])

  // 縁の中に表示する文字の配列（繰り返し表示用に複数回書く）
  const borderTexts = [
    "EASY",
    "SIMPLE",
    "SAFE",
    "RELIABLE",
    "FAST",
    "SECURE",
    "TRUSTED",
    "CONVENIENT",
    "EASY",
    "SIMPLE",
    "SAFE",
    "RELIABLE",
    "FAST",
    "SECURE",
    "TRUSTED",
    "CONVENIENT",
    "EASY",
    "SIMPLE",
    "SAFE",
    "RELIABLE",
    "FAST",
    "SECURE",
    "TRUSTED",
    "CONVENIENT",
    "EASY",
    "SIMPLE",
    "SAFE",
    "RELIABLE",
    "FAST",
    "SECURE",
    "TRUSTED",
    "CONVENIENT",
    "EASY",
    "SIMPLE",
    "SAFE",
    "RELIABLE",
    "FAST",
    "SECURE",
    "TRUSTED",
    "CONVENIENT",
  ]

  return (
    <section ref={sectionRef} className="w-full py-16 bg-[#a8e0ff] overflow-hidden relative">
      {/* SVGパス（非表示） */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={svgPathRef}
          d="M90,10 C75,30 25,40 10,50 C25,60 75,70 90,90"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      </svg>

      {/* 車いすのアニメーション - スクロールで動く */}
      <div
        ref={wheelchairRef}
        className="absolute z-0 pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        <div className="relative w-full h-full">
          <Image src="/images/wheelchair_no_background.png" alt="車いす" fill style={{ objectFit: "contain" }} />
          {/* 車いすの影 */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/6 bg-black opacity-20 rounded-full blur-md"
            style={{ filter: "blur(8px)" }}
          ></div>
        </div>
      </div>

      {/* 上部の縁 */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#0a2540] z-10"></div>

      {/* 下部の縁 */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0a2540] z-10"></div>

      {/* 左側の縁 */}
      <div ref={leftBorderRef} className="absolute left-0 top-12 bottom-12 w-16 bg-[#0a2540] overflow-hidden z-10">
        <div className="text-loop-container absolute left-0 w-full visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`left-${index}`}
              className="text-white text-base md:text-lg font-bold py-3 text-center writing-vertical"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* 右側の縁 */}
      <div ref={rightBorderRef} className="absolute right-0 top-12 bottom-12 w-16 bg-[#0a2540] overflow-hidden z-10">
        <div className="text-loop-container absolute left-0 w-full visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`right-${index}`}
              className="text-white text-base md:text-lg font-bold py-3 text-center writing-vertical"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-12 md:px-16 py-8 relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a2540]">
            <span className="inline-block text-2xl md:text-3xl font-normal mb-2">おまかせクルマ取引</span>
            <br />
            <span className="inline-block">3つのポイント</span>
          </h2>
        </div>

        <div ref={pointsRef} className="max-w-6xl mx-auto space-y-14">
          <TooltipProvider delayDuration={100}>
            {/* ポイント1 */}
            <div className="point-card bg-white rounded-[3rem] flex overflow-hidden shadow-lg h-80">
              <div className="flex-1 py-10 px-10 md:px-14 flex flex-col justify-center">
                <div className="flex items-start gap-5 mb-5">
                  <span className="text-7xl font-bold text-[#42a5d5] leading-none">01</span>
                  <span className="mt-5 text-yellow-400 italic font-light rotate-6 text-2xl">Leave it to us!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-4xl font-bold text-[#0a2540] mb-5 cursor-help leading-tight">
                      配送から
                      <br />
                      書類手続きをおまかせ
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-700 rounded-md shadow-lg border border-gray-200">
                    <p>
                      車の自宅集荷、自宅納車はもちろん、名義変更などの書類手続きまでを専門業者がまるっと代行します。
                    </p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-gray-600 max-w-md text-sm">
                  車の自宅集荷、自宅納車はもちろん、名義変更などの書類手続きまでを専門業者がまるっと代行します。
                </p>
              </div>
              <div className="relative w-44 md:w-96 bg-[#42a5d5] rounded-[3rem] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <div className="relative w-56 h-56 rounded-full bg-white flex items-center justify-center">
                      <div className="absolute w-24 h-24 rounded-full bg-[#ffec8a] -top-4 -right-4 flex items-center justify-center">
                        <Image
                          src="/images/car-service-points.png"
                          alt="車アイコン"
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                      <Image
                        src="/images/elderly-man-wheelchair.png"
                        alt="配送から書類手続きをおまかせ"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ポイント2 */}
            <div className="point-card bg-white rounded-[3rem] flex overflow-hidden shadow-lg flex-row-reverse h-80">
              <div className="flex-1 py-10 px-10 md:px-14 flex flex-col justify-center">
                <div className="flex items-start gap-5 mb-5">
                  <span className="text-7xl font-bold text-[#42a5d5] leading-none">02</span>
                  <span className="mt-5 text-yellow-400 italic font-light rotate-6 text-2xl">Higher price!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-4xl font-bold text-[#0a2540] mb-5 cursor-help leading-tight">
                      高価格での
                      <br />
                      買取保証
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-700 rounded-md shadow-lg border border-gray-200">
                    <p>
                      本サービスを通じて売却いただいた場合、買取専門店よりも必ず高い価格での売却を保証します。
                    </p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-gray-600 max-w-md text-sm">
                  本サービスを通じて売却いただいた場合、買取専門店よりも必ず高い価格での売却を保証します。
                </p>
              </div>
              <div className="relative w-44 md:w-96 bg-[#42a5d5] rounded-[3rem] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/search-document-icon.png"
                    alt="高価格での買取保証"
                    width={350}
                    height={350}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* ポイント3 */}
            <div className="point-card bg-white rounded-[3rem] flex overflow-hidden shadow-lg h-80">
              <div className="flex-1 py-10 px-10 md:px-14 flex flex-col justify-center">
                <div className="flex items-start gap-5 mb-5">
                  <span className="text-7xl font-bold text-[#42a5d5] leading-none">03</span>
                  <span className="mt-5 text-yellow-400 italic font-light rotate-6 text-2xl">Perfect match!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-4xl font-bold text-[#0a2540] mb-5 cursor-help leading-tight">
                      欲しいクルマが
                      <br />
                      必ず見つかる
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-700 rounded-md shadow-lg border border-gray-200">
                    <p>
                      全国の中古車から、あなたの予算・条件に合ったクルマを専門のコンシェルジュがご提案。好みのクルマが必ず見つかります。
                    </p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-gray-600 max-w-md text-sm">
                  全国の中古車から、あなたの予算・条件に合ったクルマを専門のコンシェルジュがご提案。好みのクルマが必ず見つかります。
                </p>
              </div>
              <div className="relative w-44 md:w-96 bg-[#42a5d5] rounded-[3rem] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/qa-form-icon.png"
                    alt="欲しいクルマが必ず見つかる"
                    width={350}
                    height={350}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}
