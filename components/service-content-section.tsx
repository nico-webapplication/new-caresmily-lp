"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Calendar, Home, ClipboardList, Users } from "lucide-react"

export default function ServiceContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"dayservice" | "homecare" | "records" | "support">("dayservice")
  const [contentHeight, setContentHeight] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleTabChange = (tab: "dayservice" | "homecare" | "records" | "support") => {
    if (tab !== activeTab && !isTransitioning) {
      setIsTransitioning(true)

      // 現在のスクロール位置を保存
      const scrollPosition = window.scrollY

      // コンテンツをフェードアウト
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            // タブを変更
            setActiveTab(tab)

            // 次のフレームでコンテンツをフェードイン
            setTimeout(() => {
              if (contentRef.current) {
                gsap.to(contentRef.current, {
                  opacity: 1,
                  duration: 0.5,
                  onComplete: () => {
                    setIsTransitioning(false)
                  },
                })
              }

              // スクロール位置を復元
              window.scrollTo(0, scrollPosition)
            }, 50)
          },
        })
      }
    }
  }

  // コンテンツの高さを計算して設定
  useEffect(() => {
    if (contentContainerRef.current) {
      const updateHeight = () => {
        if (contentContainerRef.current) {
          const height = contentContainerRef.current.scrollHeight
          setContentHeight(height)
        }
      }

      // 初回レンダリング後と画面サイズ変更時に高さを更新
      updateHeight()
      window.addEventListener("resize", updateHeight)

      return () => {
        window.removeEventListener("resize", updateHeight)
      }
    }
  }, [activeTab])

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () =>
          gsap.to(sectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }),
      })
    }

    if (contentRef.current) {
      const icons = contentRef.current.querySelectorAll(".service-icon")
      gsap.set(icons, { scale: 0.9, opacity: 0 })
      ScrollTrigger.batch(icons, {
        onEnter: (els) =>
          gsap.to(els, {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power1.out",
          }),
        start: "top 80%",
      })
    }

    // タブ選択時のアニメーション
    const animateTabs = () => {
      const tabKeys = ["dayservice", "homecare", "records", "support"]
      tabRefs.current.forEach((tabRef, index) => {
        if (tabRef) {
          const isActive = tabKeys[index] === activeTab
          gsap.to(tabRef, {
            width: isActive ? "40%" : "20%",
            duration: 0.6, // アニメーション時間を長くして滑らかに
            ease: "power2.inOut",
          })
        }
      })
    }

    animateTabs()

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [activeTab])

  // サービス内容データ
  const serviceContents = {
    dayservice: [
      {
        title: "送迎サービス",
        description: [
          "ご自宅から施設までの送迎を行います。",
          "安全で快適な送迎車両で、ご利用者様の",
          "負担を軽減します。",
        ],
        image: "/elderly-transport-service.png",
      },
      {
        title: "食事サービス",
        description: ["栄養バランスの取れた食事を提供します。", "嚥下状態に合わせた食事形態にも", "対応可能です。"],
        image: "/elderly-meal-service.png",
      },
      {
        title: "レクリエーション",
        description: [
          "季節の行事や体操、創作活動など",
          "様々なアクティビティを通じて",
          "楽しく過ごせる環境を提供します。",
        ],
        image: "/elderly-recreation.png",
      },
    ],
    homecare: [
      {
        title: "身体介護",
        description: ["入浴、排泄、食事などの介助を", "ご利用者様の状態に合わせて", "丁寧に行います。"],
        image: "/elderly-care.png",
      },
      {
        title: "生活援助",
        description: ["掃除、洗濯、調理など日常生活の", "サポートを行い、ご利用者様の", "自立した生活を支援します。"],
        image: "/home-cleaning-service.png",
      },
      {
        title: "通院介助",
        description: [
          "医療機関への通院の付き添いや",
          "院内での介助を行い、安心して",
          "医療サービスを受けられるよう支援します。",
        ],
        image: "/medical-appointment-assistance.png",
      },
    ],
    records: [
      {
        title: "デジタル記録",
        description: ["タブレットやスマートフォンで", "簡単に介護記録を入力できる", "システムを提供します。"],
        image: "/placeholder-yt6v0.png",
      },
      {
        title: "AI分析",
        description: ["蓄積された介護データをAIが分析し、", "ケアの質向上や業務効率化に", "役立つ情報を提供します。"],
        image: "/ai-data-analysis.png",
      },
      {
        title: "情報共有",
        description: ["スタッフ間や家族との情報共有が", "リアルタイムで行え、連携を", "スムーズにします。"],
        image: "/team-communication.png",
      },
    ],
    support: [
      {
        title: "ケアプラン作成",
        description: ["ご利用者様一人ひとりの状態や", "ニーズに合わせた最適な", "ケアプランを作成します。"],
        image: "/placeholder-uyse6.png",
      },
      {
        title: "サービス調整",
        description: ["様々な介護サービスの調整を行い、", "ご利用者様の生活をトータルで", "サポートします。"],
        image: "/placeholder-bi7v8.png",
      },
      {
        title: "相談支援",
        description: ["介護に関する様々な悩みや", "疑問にケアマネジャーが", "丁寧に対応します。"],
        image: "/consultation-support.png",
      },
    ],
  }

  // 料金情報
  const priceInfo = {
    dayservice: {
      title: "デイサービス料金",
      price: "¥8,500",
      note: "※要介護度や利用時間により変動します。介護保険適用で自己負担は1〜3割となります。",
    },
    homecare: {
      title: "訪問介護料金",
      price: "¥4,200",
      note: "※サービス内容や時間により変動します。介護保険適用で自己負担は1〜3割となります。",
    },
    records: {
      title: "介護記録システム",
      price: "¥25,000",
      note: "※月額料金です。ユーザー数やオプション機能により変動します。初期設定費用が別途必要です。",
    },
    support: {
      title: "居宅支援料金",
      price: "¥10,700",
      note: "※要介護度により変動します。介護保険適用で自己負担はありません（一部例外あり）。",
    },
  }

  // タブ情報
  const tabs = {
    dayservice: {
      label: "CareSmily デイサービス",
      icon: <Calendar className="h-5 w-5 mr-2" />,
      color: "#81d9ff",
      hoverColor: "#9ae2ff",
      activeColor: "linear-gradient(to right, #81d9ff, #9ae2ff)",
      pointerColor: "#9ae2ff",
      bgColor: "#e6f7ff", // 薄い青色の背景
    },
    homecare: {
      label: "CareSmily 訪問介護",
      icon: <Home className="h-5 w-5 mr-2" />,
      color: "#ff5a5a",
      hoverColor: "#ff7575",
      activeColor: "linear-gradient(to right, #ff5a5a, #ff7575)",
      pointerColor: "#ff7575",
      bgColor: "#fff0f0", // 薄い赤色の背景
    },
    records: {
      label: "CareSmily 介護記録",
      icon: <ClipboardList className="h-5 w-5 mr-2" />,
      color: "#50c878", // 明るい緑色（エメラルドグリーン）
      hoverColor: "#6ad890",
      activeColor: "linear-gradient(to right, #50c878, #6ad890)",
      pointerColor: "#6ad890",
      bgColor: "#e6f9ee", // 薄い緑色の背景
    },
    support: {
      label: "CareSmily 居宅支援",
      icon: <Users className="h-5 w-5 mr-2" />,
      color: "#ffb347", // 明るいオレンジ色
      hoverColor: "#ffc168",
      activeColor: "linear-gradient(to right, #ffb347, #ffc168)",
      pointerColor: "#ffc168",
      bgColor: "#fff8e6", // 薄いオレンジ色の背景
    },
  }

  return (
    <section ref={sectionRef} className="w-full">
      {/* タブコンテナ - 固定高さと位置 */}
      <div className="flex w-full relative h-[100px] overflow-hidden">
        {(Object.keys(tabs) as Array<keyof typeof tabs>).map((tabKey, index) => {
          const isActive = activeTab === tabKey
          const tab = tabs[tabKey]
          return (
            <div
              key={tabKey}
              ref={(el) => (tabRefs.current[index] = el)}
              className="h-[80px] md:h-[100px] flex items-center justify-center cursor-pointer relative transition-all duration-300"
              style={{
                width: isActive ? "40%" : "20%", // 初期幅設定
              }}
              onClick={() => handleTabChange(tabKey)}
            >
              <div
                className="absolute inset-0 rounded-t-[20px] transition-all duration-300"
                style={{
                  background: isActive ? tab.activeColor : tab.color,
                  boxShadow: isActive ? "0 8px 16px rgba(0,0,0,0.15)" : "0 4px 8px rgba(0,0,0,0.06)",
                  height: isActive ? "100%" : "95%",
                  top: isActive ? "0" : "5%",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[20%] rounded-t-[20px]"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
              </div>
              <div className="relative flex items-center justify-center">
                <div className="flex items-center text-white font-bold text-sm md:text-base lg:text-lg">
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </div>
              </div>
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[99%] w-0 h-0 z-20"
                  style={{
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderTop: `12px solid ${tab.pointerColor}`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* コンテンツコンテナ - 固定高さと位置を維持 */}
      <div
        ref={contentContainerRef}
        className="relative overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: tabs[activeTab].bgColor,
          minHeight: contentHeight > 0 ? `${contentHeight}px` : "auto",
        }}
      >
        <div ref={contentRef} className="py-16 px-4 md:px-8 relative z-10 transition-opacity duration-500">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="mb-8 md:mb-0 md:mr-12">
                <div className="flex md:flex-col items-center">
                  <div
                    className="writing-vertical hidden md:block text-[#1A2B4A] font-bold text-4xl md:text-5xl"
                    style={{ writingMode: "vertical-rl", letterSpacing: "0.1em" }}
                  >
                    サービス内容
                  </div>
                  <div
                    className="writing-vertical hidden md:block text-[#1A2B4A] text-base mt-4"
                    style={{ writingMode: "vertical-rl", letterSpacing: "0.05em" }}
                  >
                    CareSmily が提供するサービス
                  </div>
                  <div className="block md:hidden text-[#1A2B4A] font-bold text-2xl text-center">
                    サービス内容
                    <div className="text-[#1A2B4A] text-sm mt-1">CareSmily が提供するサービス</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {serviceContents[activeTab].map((svc, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="service-icon rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] flex items-center justify-center mb-6 relative overflow-hidden"
                        style={{
                          background: tabs[activeTab].color,
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent h-1/2 bottom-0"></div>
                        <Image
                          src={svc.image || "/placeholder.svg"}
                          alt={svc.title}
                          width={120}
                          height={120}
                          className="object-contain relative z-10"
                        />
                      </div>
                      <h3 className="text-center font-bold text-xl mb-3 text-[#1A2B4A]">{svc.title}</h3>
                      <div className="text-sm text-center text-[#1A2B4A] leading-tight">
                        {svc.description.map((line, j) => (
                          <p key={j} className="mb-1">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-16 max-w-3xl mx-auto">
                  <div className="border rounded-md overflow-hidden" style={{ borderColor: tabs[activeTab].color }}>
                    <div className="py-3 px-6 flex items-center" style={{ background: tabs[activeTab].color }}>
                      <div className="bg-white/30 rounded-full px-4 py-1 mr-3">
                        <span className="text-white font-bold text-sm">{priceInfo[activeTab].title}</span>
                      </div>
                      <span className="text-white font-bold">基本料金</span>
                    </div>
                    <div className="bg-white p-6 text-center">
                      <span className="text-3xl font-bold text-[#1A2B4A]">{priceInfo[activeTab].price}</span>
                      <span className="text-sm ml-1">(税込)</span>
                      <p className="text-xs text-gray-500 mt-3">{priceInfo[activeTab].note}</p>
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
