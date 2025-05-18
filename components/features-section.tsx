"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
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

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardTextRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  // カスタムイージングの設定
  useEffect(() => {
    if (typeof window === "undefined") return
    
    if (gsap.registerEase) {
      // カスタムイージングを登録
      gsap.registerEase("cubic", (progress) => {
        // 0.83, 0, 0.17, 1 のカスタムキュービックベジェの近似
        return gsap.parseEase("power3.out")(progress)
      })
    }
  }, [])

  // テキスト分割とアニメーション準備
  useEffect(() => {
    const splitTextInCards = () => {
      if (!cardTextRefs.current) return
      
      cardTextRefs.current.forEach((textEl, idx) => {
        if (!textEl) return
        
        const titleEl = textEl.querySelector('h3')
        const descEl = textEl.querySelector('p')
        
        if (titleEl) {
          const titleText = titleEl.textContent || ''
          titleEl.innerHTML = titleText
            .split('')
            .map(char => char === ' ' 
              ? '<span class="title-char">&nbsp;</span>' 
              : `<span class="title-char">${char}</span>`)
            .join('')
        }
        
        if (descEl) {
          const descText = descEl.textContent || ''
          descEl.innerHTML = descText
            .split(' ')
            .map(word => `<span class="desc-word">${word}&nbsp;</span>`)
            .join('')
        }
      })
    }
    
    // 初期カードのアニメーション
    const setupInitialCards = () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
      
      // 初期位置を設定
      cards.forEach((card, idx) => {
        if (idx === activeIndex) {
          // アクティブカードの文字アニメーション
          const titleChars = card.querySelectorAll('.title-char')
          const descWords = card.querySelectorAll('.desc-word')
          
          gsap.fromTo(titleChars, 
            { y: 40, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.7, 
              stagger: 0.03, 
              ease: "cubic" 
            }
          )
          
          gsap.fromTo(descWords,
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.5, 
              stagger: 0.02,
              delay: 0.3,
              ease: "cubic" 
            }
          )
        } else {
          // 非アクティブカードの文字は隠す
          const titleChars = card.querySelectorAll('.title-char')
          const descWords = card.querySelectorAll('.desc-word')
          
          gsap.set(titleChars, { y: 40, opacity: 0 })
          gsap.set(descWords, { y: 20, opacity: 0 })
        }
      })
    }
    
    splitTextInCards()
    setupInitialCards()
  }, [])

  // カードを前へ
  const handlePrev = () => {
    if (isAnimating || activeIndex === 0) return
    animateCardTransition(activeIndex - 1)
  }

  // カードを次へ
  const handleNext = () => {
    if (isAnimating || activeIndex === features.length - 1) return
    animateCardTransition(activeIndex + 1)
  }

  // 特定のカードに移動
  const goToCard = (index: number) => {
    if (isAnimating || index === activeIndex) return
    animateCardTransition(index)
  }

  // カード遷移のアニメーション
  const animateCardTransition = (nextIndex: number) => {
    setIsAnimating(true)
    
    const currentCard = cardsRef.current[activeIndex]
    const nextCard = cardsRef.current[nextIndex]
    
    if (!currentCard || !nextCard) {
      setActiveIndex(nextIndex)
      setIsAnimating(false)
      return
    }
    
    // 現在のカードのアニメーション（退場）
    const currentTitleChars = currentCard.querySelectorAll('.title-char')
    const currentDescWords = currentCard.querySelectorAll('.desc-word')
    
    gsap.to(currentTitleChars, {
      y: nextIndex > activeIndex ? -40 : 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "cubic"
    })
    
    gsap.to(currentDescWords, {
      y: nextIndex > activeIndex ? -20 : 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.01,
      ease: "cubic"
    })
    
    // 次のカードのアニメーション（登場）
    const nextTitleChars = nextCard.querySelectorAll('.title-char')
    const nextDescWords = nextCard.querySelectorAll('.desc-word')
    
    gsap.fromTo(nextTitleChars, 
      { y: nextIndex > activeIndex ? 40 : -40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.03, 
        delay: 0.2,
        ease: "cubic" 
      }
    )
    
    gsap.fromTo(nextDescWords,
      { y: nextIndex > activeIndex ? 20 : -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.02,
        delay: 0.4,
        ease: "cubic",
        onComplete: () => {
          setIsAnimating(false)
        }
      }
    )
    
    // インデックスを更新
    setActiveIndex(nextIndex)
  }

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">CareSmily の特徴</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            介護現場の課題を解決し、より良いケアを実現するための機能を提供します
          </p>
        </div>

        {/* カードカルーセル */}
        <div className="max-w-4xl mx-auto">
          {/* カードコンテナ */}
          <div className="relative h-[450px] overflow-hidden">
            <div 
              className="flex transition-transform duration-500 h-full"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                width: `${features.length * 100}%` 
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`w-full h-full flex items-center justify-center px-4`}
                  style={{ flex: `0 0 ${100 / features.length}%` }}
                  ref={el => cardsRef.current[index] = el}
                >
                  <div 
                    className={`w-[300px] h-[400px] ${feature.color} rounded-xl shadow-xl mx-auto transition-all duration-500`}
                  >
                    {/* カード番号 */}
                    <span className="absolute top-4 right-4 text-white text-opacity-50 text-xl font-bold">
                      {index + 1}
                    </span>

                    {/* カード内容 */}
                    <div 
                      className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white"
                      ref={el => cardTextRefs.current[index] = el}
                    >
                      <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-full">{feature.icon}</div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-white text-opacity-90">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeIndex === 0 || isAnimating}
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
                  disabled={isAnimating}
                  aria-label={`特徴 ${index + 1} へ移動`}
                ></button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeIndex === features.length - 1 || isAnimating}
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
