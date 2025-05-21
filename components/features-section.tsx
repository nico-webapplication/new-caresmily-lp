"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Clock, Users, BookOpen, Share2, TrendingDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useScrollTrigger } from "@/components/scroll-trigger-provider"

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { scroller } = useScrollTrigger()

  // メリットデータ
  const benefits = [
    {
      icon: <Clock className="h-12 w-12 text-white" />,
      title: "書類作成時間60%削減",
      subtitle: "現場へリソースを再集中",
      description:
        "キーワード検索と文例活用で計画書の約70%が完成。時間のかかる作成プロセスを一気に短縮し、スタッフは利用者に寄り添うケアへスムーズに戻れます。",
      color: "bg-gradient-to-r from-sky-500 to-blue-600",
      image: "/time-saving-document.png",
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "初心者もプロ級×個別ケア",
      subtitle: "高品質プランを迅速作成",
      description:
        "専門家が監修した文章を活用し、最も利用者に近いスタッフでも気軽に計画書を作成可能。個々の背景や希望を的確に反映し、より質の高いケアを実現します。",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      image: "/placeholder-82q5d.png",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-white" />,
      title: "学びながら作る",
      subtitle: "計画書がそのまま教育教材に",
      description:
        "ケアマネジメントサイクルを意識した文例に触れるだけで、実務をこなしながら専門知識を身に付けられます。新人スタッフの育成にも効果的です。",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      image: "/learning-at-work.png",
    },
    {
      icon: <Share2 className="h-12 w-12 text-white" />,
      title: "チーム連携強化",
      subtitle: "業務時間を有効活用",
      description:
        "計画書作成の時間短縮により、利用者の書類管理にかける負担を軽減。浮いたリソースを多職種や家族との連携に注力できるため、情報共有が深まり、より質の高いケアを実現します。",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      image: "/team-collaboration.png",
    },
    {
      icon: <TrendingDown className="h-12 w-12 text-white" />,
      title: "人件費の最適化",
      subtitle: "業務効率アップでコストダウン",
      description:
        "作成作業の効率化でスタッフ配置を柔軟に調整でき、無駄な残業や重複業務を削減。結果として人件費の圧縮につながり、組織の経営基盤を強化します。",
      color: "bg-gradient-to-r from-rose-500 to-red-600",
      image: "/placeholder-gqo9l.png",
    },
  ]

  // 自動再生タイマーをクリア
  const clearAutoPlayTimer = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }

  // 自動再生タイマーをセット
  const startAutoPlayTimer = () => {
    clearAutoPlayTimer()
    autoPlayTimerRef.current = setTimeout(() => {
      if (!isAnimating) {
        goToNextCard()
      }
    }, 5000)
  }

  // 次のカードへ移動する関数
  const goToNextCard = () => {
    if (isAnimating) return

    setIsAnimating(true)
    clearAutoPlayTimer()

    const newIndex = (activeIndex + 1) % benefits.length
    setActiveIndex(newIndex)

    // アニメーション完了後に自動再生を再開
    setTimeout(() => {
      setIsAnimating(false)
      startAutoPlayTimer()
    }, 800) // アニメーション時間と同じにする
  }

  // 前のカードへ移動する関数
  const goToPrevCard = () => {
    if (isAnimating) return

    setIsAnimating(true)
    clearAutoPlayTimer()

    const newIndex = (activeIndex - 1 + benefits.length) % benefits.length
    setActiveIndex(newIndex)

    // アニメーション完了後に自動再生を再開
    setTimeout(() => {
      setIsAnimating(false)
      startAutoPlayTimer()
    }, 800) // アニメーション時間と同じにする
  }

  // 特定のカードへ移動する関数
  const goToCard = (index: number) => {
    if (isAnimating || index === activeIndex) return

    setIsAnimating(true)
    clearAutoPlayTimer()

    setActiveIndex(index)

    // アニメーション完了後に自動再生を再開
    setTimeout(() => {
      setIsAnimating(false)
      startAutoPlayTimer()
    }, 800) // アニメーション時間と同じにする
  }

  // タイトルのアニメーション
  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            scroller: scroller || undefined,
          },
        },
      )
    }

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      clearAutoPlayTimer()
    }
  }, [scroller])

  // カードアニメーションの更新
  useEffect(() => {
    if (typeof window === "undefined" || !cardsContainerRef.current) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return

    // 全てのカードのアニメーションをキル
    gsap.killTweensOf(cards)

    // カードの初期表示設定
    cards.forEach((card) => {
      gsap.set(card, { display: "block" })
    })

    // 楕円形の軌道に沿ったカードの配置
    const radiusX = 400 // X軸方向の半径（横方向）を大きく
    const radiusZ = 200 // Z軸方向の半径（奥行き）を小さく
    const totalCards = benefits.length
    const angleStep = (2 * Math.PI) / totalCards // カード間の角度

    // 各カードのアニメーション
    cards.forEach((card, index) => {
      // アクティブインデックスからの相対位置を計算
      const relativeIndex = (index - activeIndex + totalCards) % totalCards

      // 円周上の角度を計算（アクティブカードが正面=0度）
      const angle = relativeIndex * angleStep

      // 楕円形の軌道上の座標を計算
      const x = Math.sin(angle) * radiusX
      const z = Math.cos(angle) * radiusZ - radiusZ // 奥行き（正面が最も手前）

      // 不透明度と表示順を計算
      const opacity = Math.cos(angle) * 0.5 + 0.5 // 正面が最も不透明
      const zIndex = Math.round(50 - relativeIndex * 10) // 正面が最も前面

      // カードの回転角度（楕円の接線に沿って回転）
      // 楕円の接線に基づいた回転角度の計算
      const rotationY = (angle * 180) / Math.PI // ラジアンから度に変換

      // 楕円の形状に合わせてスケールを調整
      // 側面のカードをより小さく表示
      const scale = 0.6 + Math.cos(angle) * 0.4

      // カードのアニメーション
      gsap.to(card, {
        x: x,
        z: z,
        rotationY: rotationY,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
      })
    })

    // 自動再生タイマーを開始
    startAutoPlayTimer()

    // クリーンアップ
    return () => {
      clearAutoPlayTimer()
      gsap.killTweensOf(cards)
    }
  }, [activeIndex, benefits.length, scroller])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">CareSmilyを導入するメリット</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            介護現場の課題を解決し、より良いケアを実現するための機能を提供します
          </p>
        </div>

        {/* 3Dカルーセル */}
        <div className="relative h-[600px] md:h-[500px] mb-8">
          <div
            ref={cardsContainerRef}
            className="cards-container w-full h-full flex items-center justify-center perspective-1500"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="feature-card absolute w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 opacity-0"
                style={{
                  display: "none",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                <div className={`p-6 ${benefit.color}`}>
                  <div className="flex justify-between items-start">
                    <div className="icon-container w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div className="w-24 h-24 relative card-image">
                      <Image
                        src={benefit.image || "/placeholder.svg"}
                        alt={benefit.title}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="card-title text-xl font-bold text-[#0a2540] mb-1">{benefit.title}</h3>
                  <p className="card-subtitle text-lg font-medium text-gray-600 mb-4">{benefit.subtitle}</p>
                  <p className="card-description text-gray-600 mb-6">{benefit.description}</p>
                  <button className="card-button flex items-center text-[#42a5d5] font-medium hover:text-[#2980b9] transition-colors">
                    詳細を見る <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ナビゲーションボタン */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 mt-8">
            <button
              className="prev-button h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-50"
              onClick={goToPrevCard}
              disabled={isAnimating}
              aria-label="前のカードを表示"
            >
              <ChevronLeft className="h-6 w-6 text-[#0a2540]" />
            </button>
            <button
              className="next-button h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-50"
              onClick={goToNextCard}
              disabled={isAnimating}
              aria-label="次のカードを表示"
            >
              <ChevronRight className="h-6 w-6 text-[#0a2540]" />
            </button>
          </div>
        </div>

        {/* インジケーター */}
        <div className="flex justify-center gap-2 mt-4">
          {benefits.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#42a5d5] w-6" : "bg-gray-300 w-2"
              }`}
              onClick={() => goToCard(index)}
              disabled={isAnimating}
              aria-label={`カード${index + 1}を表示`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1500 {
          perspective: 1500px;
          perspective-origin: 50% 50%;
        }

        .feature-card {
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  )
}
