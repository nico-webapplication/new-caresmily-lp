"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { FileText, Car } from "lucide-react"
import Image from "next/image"

export default function PointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<HTMLDivElement>(null)
  const leftBorderRef = useRef<HTMLDivElement>(null)
  const rightBorderRef = useRef<HTMLDivElement>(null)
  const wheelchairRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)

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

        // カスタムイージング関数（パスに沿って均等に動くため）
        const pathEase = (path: SVGPathElement) => {
          const rawPath = MotionPathPlugin.getRawPath(path)
          const measurements = MotionPathPlugin.cacheRawPathMeasurements(rawPath, 12)
          const axis = "y"
          const precision = 1
          const useX = axis === "x"
          const start = rawPath[0][useX ? 0 : 1]
          const end = rawPath[rawPath.length - 1][rawPath[rawPath.length - 1].length - (useX ? 2 : 1)]
          const range = end - start
          const l = Math.round(precision * 200)
          const inc = 1 / l
          const positions = [0]
          const a = [0]
          let minIndex = 0
          const smooth = [0]
          const minChange = (1 / l) * 0.6
          const smoothRange = 7
          const fullSmoothRange = smoothRange * 2

          const getClosest = (p: number) => {
            while (positions[minIndex] <= p && minIndex++ < l) {}
            a.push(
              ((p - positions[minIndex - 1]) / (positions[minIndex] - positions[minIndex - 1])) * inc + minIndex * inc,
            )
            smoothRange &&
              a.length > smoothRange &&
              a[a.length - 1] - a[a.length - 2] < minChange &&
              smooth.push(a.length - smoothRange)
          }

          for (let i = 1; i < l; i++) {
            positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range
          }
          positions[l] = 1

          for (let i = 0; i < l; i++) {
            getClosest(i / l)
          }
          a.push(1) // must end at 1.

          if (smoothRange) {
            smooth.push(l - fullSmoothRange + 1)
            smooth.forEach((i) => {
              const start = a[i]
              const j = Math.min(i + fullSmoothRange, l)
              const inc = (a[j] - start) / (j - i)
              let c = 1
              i++
              for (; i < j; i++) {
                a[i] = start + inc * c++
              }
            })
          }

          const aLength = a.length - 1
          return (p: number) => {
            const i = p * aLength
            const s = a[i | 0]
            return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0
          }
        }

        // スクロールに連動した車いすのアニメーション
        gsap.to(wheelchairRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            onUpdate: (self) => {
              if (prevDirection !== self.direction) {
                // 方向が変わったときだけ実行
                rotateTo(self.direction === 1 ? 0 : -180)
                prevDirection = self.direction
              }
            },
          },
          ease: pathEase(svgPathRef.current),
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
  }, [])

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

        <div ref={pointsRef} className="max-w-3xl mx-auto space-y-8">
          {/* ポイント1 */}
          <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg">
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <span className="text-5xl font-bold text-[#42a5d5]">01</span>
                <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Leave it to us!</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3">
                配送から
                <br />
                書類手続きをおまかせ
              </h3>
              <p className="text-sm text-gray-600 max-w-md">
                車の保管場所、自宅駐車場などから、名義変更などの書類手続きまで専門業者がまるっとお任せします。
              </p>
            </div>
            <div className="relative w-32 md:w-64 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                  {/* スタッフのイラスト */}
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <div className="relative w-24 h-32 md:w-32 md:h-40">
                      <div className="absolute top-0 w-full h-full flex flex-col items-center">
                        {/* 頭 */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFD8B9] rounded-full relative">
                          {/* 帽子 */}
                          <div className="absolute top-0 w-full h-1/2 bg-[#1E3A8A] rounded-t-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-[#1E3A8A]"></div>
                          {/* 顔 */}
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-[#FF6B6B] rounded-full"></div>
                          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-black rounded-full"></div>
                          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-black rounded-full"></div>
                        </div>
                        {/* 体 */}
                        <div className="w-12 h-16 md:w-16 md:h-20 bg-white relative mt-1">
                          {/* 青いエプロン */}
                          <div className="absolute top-0 left-0 w-full h-full bg-[#1E3A8A] rounded-md"></div>
                          {/* 白いシャツ */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 書類アイコン */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white p-2 rounded-full shadow-md">
                    <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#1E3A8A]" />
                  </div>

                  {/* 車アイコン */}
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white p-2 rounded-full shadow-md">
                    <Car className="w-6 h-6 md:w-8 md:h-8 text-[#1E3A8A]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ポイント2 */}
          <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse">
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <span className="text-5xl font-bold text-[#42a5d5]">02</span>
                <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">
                  Professional Inspection!
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3">
                プロのチェックで
                <br />
                あんしん
              </h3>
              <p className="text-sm text-gray-600 max-w-md">
                購入したい車を専門業者がチェックすることで、自分では確認しきれない細かな部分も確認した上で購入できます。
              </p>
            </div>
            <div className="relative w-32 md:w-64 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 整備士と車のイラスト */}
                <div className="relative w-4/5 h-4/5">
                  {/* 整備士 */}
                  <div className="absolute left-2 bottom-8 md:left-4 md:bottom-12 w-12 h-20 md:w-16 md:h-24">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFD8B9] rounded-full relative">
                      {/* 帽子 */}
                      <div className="absolute top-0 w-full h-1/2 bg-[#1E3A8A] rounded-t-full"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-[#1E3A8A]"></div>
                      {/* 顔 */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-[#FF6B6B] rounded-full"></div>
                      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-black rounded-full"></div>
                      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-black rounded-full"></div>
                    </div>
                    {/* 体 */}
                    <div className="w-8 h-12 md:w-10 md:h-14 bg-[#1E3A8A] mt-1 relative">
                      {/* 白いシャツ */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-white"></div>
                    </div>
                  </div>

                  {/* 赤い車 */}
                  <div className="absolute right-0 bottom-4 md:bottom-8 w-16 h-12 md:w-24 md:h-16">
                    <div className="w-full h-full bg-[#FF4136] rounded-md relative">
                      {/* ボンネット（開いている） */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 origin-bottom w-10 h-6 md:w-14 md:h-8 bg-[#FF4136] rounded-t-lg"></div>
                      {/* ウィンドウ */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 md:w-12 md:h-6 bg-[#B3DCFF] rounded-t-sm"></div>
                      {/* タイヤ */}
                      <div className="absolute bottom-0 left-2 w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"></div>
                      <div className="absolute bottom-0 right-2 w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"></div>
                    </div>
                  </div>

                  {/* Professional Inspection! テキスト */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 italic font-light rotate-6 text-xs md:text-sm">
                    Professional!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ポイント3 */}
          <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg">
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <span className="text-5xl font-bold text-[#42a5d5]">03</span>
                <span className="ml-6 text-yellow-400 italic font-light rotate-6 text-xl">Anonymous Transaction!</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-3">匿名で取引OK</h3>
              <p className="text-sm text-gray-600 max-w-md">
                個人情報に関わる手続きは専門業者がすべて代行するので、お互いに住所や名前を明かさなくても取引できます。
              </p>
            </div>
            <div className="relative w-32 md:w-64 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                  {/* スマートフォン間の取引イラスト */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* 左のスマートフォン */}
                    <div className="absolute left-4 md:left-8 w-8 h-14 md:w-12 md:h-20 bg-[#0A4B78] rounded-md border-2 border-[#0A3A5E]">
                      <div className="w-full h-2/3 bg-[#B3DCFF] rounded-t-sm"></div>
                    </div>

                    {/* 右のスマートフォン */}
                    <div className="absolute right-4 md:right-8 w-8 h-14 md:w-12 md:h-20 bg-[#0A4B78] rounded-md border-2 border-[#0A3A5E]">
                      <div className="w-full h-2/3 bg-[#B3DCFF] rounded-t-sm"></div>
                    </div>

                    {/* 手と鍵 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 md:w-20 md:h-10">
                      {/* 左の手 */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#FFD8B9] rounded-md"></div>

                      {/* 鍵 */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-3 md:w-8 md:h-4">
                        <div className="w-2/3 h-full bg-[#FFD700] rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform translate-y-1/2 w-1/3 h-1/2 bg-[#FFD700]"></div>
                      </div>

                      {/* 右の手 */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#FFD8B9] rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
