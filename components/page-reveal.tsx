"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const PageReveal = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const characterRefs = useRef<(HTMLDivElement | null)[]>([])
  const miniLogoRef = useRef<HTMLDivElement>(null)

  // Expose the containerRef to parent components
  useImperativeHandle(ref, () => containerRef.current!)

  useEffect(() => {
    // Only run animations on the client side
    if (containerRef.current && typeof window !== 'undefined') {
      // Initial state - page container is small and centered
      gsap.set(containerRef.current, {
        scale: 0.1,
        opacity: 0,
        y: 0,
      })

      // Create timeline for page reveal animation
      const tl = gsap.timeline({
        onStart: () => {
          // Dispatch custom event when animation starts
          window.dispatchEvent(new Event("pageRevealStart"))
        },
        onComplete: () => {
          // Dispatch custom event when animation completes
          window.dispatchEvent(new Event("pageRevealComplete"))
        },
      })

      // Page container appears with a smooth effect
      tl.to(containerRef.current, {
        scale: 0.3, // Start with a smaller size
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      })

        // Grow slightly - more smoothly
        .to(containerRef.current, {
          scale: 0.4,
          duration: 0.6,
          ease: "power1.inOut",
        })

        // Pause briefly
        .to(containerRef.current, {
          scale: 0.4,
          duration: 0.3,
        })

        // Expand smoothly to cover the screen
        .to(containerRef.current, {
          scale: 1,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: 1.2,
          ease: "power2.inOut",
        })

        // Fade out
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        })
    }

    // ミニチュアの3Dアニメーション
    if (characterRefs.current.length === 4 && miniLogoRef.current) {
      // 小さな円を描くアニメーション
      const radius = 40 // 小さな半径
      const centerX = 0
      const centerY = 0
      const duration = 8 // 一周の時間（秒）

      // ロゴの脈動アニメーション
      gsap.fromTo(
        miniLogoRef.current,
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" },
      )

      // 各キャラクターを回転させる
      characterRefs.current.forEach((char, index) => {
        if (!char) return

        // 各キャラクターの開始角度（90度ずつずらす）
        const startAngle = index * 90

        // 回転アニメーション
        gsap.to(char, {
          duration: duration,
          repeat: -1,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress()
            const angle = startAngle + progress * 360
            const radian = (angle * Math.PI) / 180

            const newX = centerX + Math.cos(radian) * radius
            const newY = centerY + Math.sin(radian) * radius

            gsap.set(char, { x: newX, y: newY })

            // 奥行き感（ミニチュアなので控えめに）
            const scale = 0.9 + 0.1 * Math.sin(radian)
            const zIndex = Math.sin(radian) > 0 ? 20 : 10

            gsap.set(char, {
              scale: scale,
              zIndex: zIndex,
              opacity: 0.9 + 0.1 * Math.sin(radian),
            })
          },
        })
      })
    }

    return () => {
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current)
      }
      characterRefs.current.forEach((char) => {
        if (char) gsap.killTweensOf(char)
      })
      if (miniLogoRef.current) gsap.killTweensOf(miniLogoRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute z-50 bg-[#a8e0ff] shadow-xl rounded-xl overflow-hidden"
      style={{
        width: "90vw",
        height: "80vh",
        maxWidth: "1200px",
        maxHeight: "800px",
      }}
    >
      {/* ミニチュアのランディングページコンテンツ */}
      <div
        ref={contentRef}
        className="w-full h-full overflow-hidden"
        style={{ transform: "scale(1)", transformOrigin: "center top" }}
      >
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20">
          <div className="absolute top-4 left-4">
            <div className="relative w-20 h-6 bg-sky-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">CareSmily</span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center mt-8">
            <div className="text-center mb-2">
              <div className="inline-block relative">
                <span className="text-sm font-medium text-[#0a2540]">専門スタッフのサポートで</span>
                <div className="absolute -top-2 right-0 transform translate-x-[105%] bg-white rounded-full px-2 py-0.5 border border-[#0a2540] text-xs">
                  あんしん＆らくらく
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-3 text-[#0a2540]">おまかせケアサポート</h1>
          </div>

          <div className="relative w-full max-w-xs mx-auto h-32 mb-4">
            {/* ミニチュアの3Dアニメーション */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full">
              {/* 中央のロゴ */}
              <div
                ref={miniLogoRef}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full shadow-sm flex items-center justify-center z-30"
              >
                <div className="relative w-[80%] h-[80%]">
                  <Image src="/images/CareSmily_logo.png" alt="CareSmily Logo" fill style={{ objectFit: "contain" }} />
                </div>
              </div>

              {/* 背景の円 */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[#42a5d5]/10 z-0"></div>

              {/* キャラクター */}
              {[
                "/images/nurse-tablet.png",
                "/images/elderly-man-wheelchair.png",
                "/images/caregiver-pink.png",
                "/images/elderly-woman-cane.png",
              ].map((src, index) => (
                <div
                  key={index}
                  ref={(el) => (characterRefs.current[index] = el)}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[50px]"
                  style={{ transformOrigin: "center center" }}
                >
                  <div
                    className="w-full h-full bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#0a2540] mb-4 max-w-xs mx-auto">
            CareSmily は、ケアの現場に笑顔をもたらす革新的なサービスです。
          </p>

          <div className="flex flex-row gap-2 justify-center">
            <Button size="sm" className="bg-[#42a5d5] hover:bg-[#3890bd] text-white text-xs">
              今すぐ始める
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#42a5d5] text-[#42a5d5] hover:bg-[#e6f4fa] text-xs bg-white"
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              アニメーション
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

PageReveal.displayName = "PageReveal"

export default PageReveal
