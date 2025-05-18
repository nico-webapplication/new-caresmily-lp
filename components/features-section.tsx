"use client"

import { useState } from "react"
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

  // シンプルな関数でカードの移動
  const handlePrev = () => activeIndex > 0 && setActiveIndex(activeIndex - 1)
  const handleNext = () => activeIndex < features.length - 1 && setActiveIndex(activeIndex + 1)
  const goToCard = (index: number) => index !== activeIndex && setActiveIndex(index)

  return (
    <section className="py-20 bg-white">
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
          <div
            className="relative h-[450px] overflow-hidden"
          >
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
                >
                  <div 
                    className={`w-[300px] h-[400px] ${feature.color} rounded-xl shadow-xl mx-auto`}
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
                </div>
              ))}
            </div>
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
