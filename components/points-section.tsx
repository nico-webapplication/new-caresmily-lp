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
          const leftHeight = leftContainer.scrollHeight
          const leftContainerHeight = leftBorderRef.current.clientHeight

          // 最初のコンテナを一番下に配置
          gsap.set(leftContainer, { y: leftContainerHeight })

          // 下から上に流す無限ループアニメーション
          gsap.to(leftContainer, {
            y: -leftHeight + leftContainerHeight,
            repeat: -1,
            duration: 20,
            ease: "linear",
            repeatDelay: 0, // 繰り返し時の遅延なし
          })
        }

        // 右側の文字コンテナ
        const rightContainer = rightBorderRef.current.querySelector(".text-loop-container")

        if (rightContainer) {
          // コンテナ内の高さを取得するために一時的に表示
          gsap.set(rightContainer, { visibility: "visible" })
          const rightHeight = rightContainer.scrollHeight
          const rightContainerHeight = rightBorderRef.current.clientHeight

          // 最初のコンテナを一番下に配置
          gsap.set(rightContainer, { y: rightContainerHeight })

          // 下から上に流す無限ループアニメーション
          gsap.to(rightContainer, {
            y: -rightHeight + rightContainerHeight,
            repeat: -1,
            duration: 20,
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
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#0a2540] z-10"></div>

      {/* 下部の縁 */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#0a2540] z-10"></div>

      {/* 左側の縁 */}
      <div ref={leftBorderRef} className="absolute left-0 top-8 bottom-8 w-8 bg-[#0a2540] overflow-hidden z-10">
        <div className="text-loop-container absolute left-0 w-full visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`left-${index}`}
              className="text-white text-xs font-bold py-4 text-center writing-vertical"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* 右側の縁 */}
      <div ref={rightBorderRef} className="absolute right-0 top-8 bottom-8 w-8 bg-[#0a2540] overflow-hidden z-10">
        <div className="text-loop-container absolute left-0 w-full visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`right-${index}`}
              className="text-white text-xs font-bold py-4 text-center writing-vertical"
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

        <div ref={pointsRef} className="max-w-4xl mx-auto space-y-12">
          <TooltipProvider delayDuration={100}>
            {/* ポイント1 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-64">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-[#42a5d5]">01</span>
                  <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Expert Database!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3 cursor-help">
                      10万件超の専門家監修
                      <br />
                      "文例データベース"
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-600 rounded-md shadow-lg border border-gray-200">
                    <p>
                      AI自動生成ではなく、法令・現場ニュアンスを踏まえた高品質文例を事前収録。デイサービス／訪問介護／ケアマネ業務など主要書類を網羅し、常に最新データへ更新される仕組みを採用しています。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative w-36 md:w-72 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <Image
                      src="/images/database-100k-icon.png"
                      alt="10万件超の専門家監修文例データベース"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ポイント2 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-64">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-[#42a5d5]">02</span>
                  <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Quick Copy & Paste!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3 cursor-help">
                      検索・カテゴリ選択 →
                      <br />
                      コピー＆ペーストで瞬時作成
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-600 rounded-md shadow-lg border border-gray-200">
                    <p>
                      書類種類を選んでからキーワード検索・分類フィルタで欲しい表現を絞り込み、そのままコピペ。文章を一から考える作業を大幅に省き、書類作成時間を最大60%削減します。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative w-36 md:w-72 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <Image
                      src="/images/search-document-icon.png"
                      alt="検索・カテゴリ選択"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ポイント3 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-64">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-[#42a5d5]">03</span>
                  <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Guided Builder!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3 cursor-help">
                      "質問形式ビルダー"による
                      <br />
                      レコメンド挿入
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-600 rounded-md shadow-lg border border-gray-200">
                    <p>
                      利用者の身体状況や目標をQ&A方式で入力すると、条件に合った文例が自動提案されるガイド機能を搭載。記入漏れや表現ブレを防ぎ、新人でもプロ水準の書類を短時間で完成できます。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative w-36 md:w-72 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <Image
                      src="/images/qa-form-icon.png"
                      alt="質問形式ビルダー"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ポイント4 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-64">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-[#42a5d5]">04</span>
                  <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">All-in-One Solution!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3 cursor-help">
                      書類テンプレ内での編集・
                      <br />
                      PDF／印刷までワンストップ
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-600 rounded-md shadow-lg border border-gray-200">
                    <p>
                      文例を差し込んだ後はアプリ内フォーマット上で微調整し、そのままPDF出力・印刷が可能。外部ソフトに書き出す手間なく、その場で紙提出用データまで完結します。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative w-36 md:w-72 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <Image
                      src="/images/document-pdf-print-icon.png"
                      alt="書類テンプレ内での編集・PDF／印刷"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ポイント5 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-64">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-[#42a5d5]">05</span>
                  <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Cloud Access!</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3 cursor-help">
                      どこからでもアクセス可能な
                      <br />
                      クラウド基盤のアプリケーション
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4 bg-white text-gray-600 rounded-md shadow-lg border border-gray-200">
                    <p>
                      PCからブラウザでログインするだけ。インストールや複雑な設定は不要です。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative w-36 md:w-72 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <Image
                      src="/images/cloud-computer-icon.png"
                      alt="どこからでもアクセス可能なクラウド基盤"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}
