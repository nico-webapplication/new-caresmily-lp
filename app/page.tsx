"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import ServiceSection from "@/components/service-section"
import PointsSection from "@/components/points-section"
import ServiceContentSection from "@/components/service-content-section"
import FeaturesSection from "@/components/features-section"
import InterviewSection from "@/components/interview-section"
import FAQSection from "@/components/faq-section"
import ServiceCountSection from "@/components/service-count-section"
import SlideInPopup from "@/components/slide-in-popup"

import { DocumentScatter } from "@/components/document-scatter-component"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const documentsRef = useRef<HTMLElement[]>([])
  const frameLogoRef = useRef<HTMLAnchorElement>(null)
  const messageImageRef = useRef<HTMLImageElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [scrollDisabled, setScrollDisabled] = useState(false)
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(() => {
    // サーバーサイドレンダリング時はfalseを返す
    if (typeof window === 'undefined') return false
    // sessionStorageから初回アニメーション再生状態を取得（セッション中のみ保持）
    return sessionStorage.getItem('hasPlayedInitialAnimation') === 'true'
  })

  // Register GSAP plugins
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  // Frame logo animation
  useEffect(() => {
    if (!frameLogoRef.current || !contentRef.current) return

    // Create scroll trigger for frame logo animation
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "top -100px",
      scrub: true,
      onUpdate: (self) => {
        // Animate frame logo based on scroll progress
        if (frameLogoRef.current) {
          gsap.to(frameLogoRef.current, {
            opacity: 1 - self.progress,
            scale: 1 - self.progress * 0.2,
            duration: 0.1,
            overwrite: true,
          })
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const playAnimation = () => {
    if (containerRef.current && contentRef.current) {
      // 必ずページの先頭に戻す
      window.scrollTo(0, 0)
      
      // スクロールを無効化
      setScrollDisabled(true)
      
      const documents = containerRef.current.querySelectorAll(".document")

      // Store documents for later use
      documentsRef.current = Array.from(documents) as HTMLElement[]

      // Hide content initially for animation
      gsap.set(contentRef.current, {
        opacity: 0,
        y: "100%", // Start from bottom
        display: "block",
      })

      // Hide message image initially
      if (messageImageRef.current) {
        gsap.set(messageImageRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 20,
        })
      }

      setAnimationComplete(false)

      // Reset positions to top of screen with random X positions
      gsap.to(documents, {
        x: () => gsap.utils.random(-window.innerWidth / 2 + 100, window.innerWidth / 2 - 100),
        y: -window.innerHeight,
        rotation: () => gsap.utils.random(-30, 30),
        scale: () => gsap.utils.random(0.7, 1.2),
        opacity: 1,
        duration: 0.3,
        stagger: 0.005,
        ease: "power2.in",
        onComplete: () => {
          // Fall down and pile up in center
          gsap.to(documents, {
            y: 0,
            x: (i) => gsap.utils.random(-30, 30),
            rotation: (i) => gsap.utils.random(-15, 15),
            duration: () => gsap.utils.random(0.7, 1.5),
            stagger: 0.01,
            ease: "bounce.out",
            onComplete: () => {
              // Wait a moment then scatter
              gsap.delayedCall(0.2, () => {
                // Scatter documents widely but keep them more in the center/bottom area
                // so they can be pushed by the rising LP
                gsap.to(documents, {
                  x: () => gsap.utils.random(-window.innerWidth * 0.6, window.innerWidth * 0.6),
                  y: () => gsap.utils.random(-window.innerHeight * 0.3, window.innerHeight * 0.5), // More documents in lower half
                  rotation: () => gsap.utils.random(-180, 180),
                  scale: () => gsap.utils.random(0.6, 1.3),
                  opacity: () => gsap.utils.random(0.8, 1),
                  duration: 1,
                  stagger: 0.005,
                  ease: "power3.out",
                  onComplete: () => {
                    // After documents are scattered, show the message image with fade-in
                    if (messageImageRef.current) {
                      gsap.to(messageImageRef.current, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        onComplete: () => {
                          // Wait a moment to let user read the message, then start LP animation
                          gsap.delayedCall(1.2, () => {
                            // Fade out the message image before LP animation
                            gsap.to(messageImageRef.current, {
                              opacity: 0,
                              scale: 0.9,
                              duration: 0.8,
                              ease: "power2.in",
                              onComplete: () => {
                                // After message fades out, animate the content coming up
                                animateContentAndPushDocuments()
                              },
                            })
                          })
                        },
                      })
                    } else {
                      // Fallback if message image is not available
                      animateContentAndPushDocuments()
                    }
                  },
                })
              })
            },
          })
        },
      })
    }
  }

  // Improved function to animate content and push documents
  const animateContentAndPushDocuments = () => {
    if (!contentRef.current || documentsRef.current.length === 0) return

    // Create timeline for coordinated animation
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true)
        setScrollDisabled(false) // アニメーション完了時にスクロールを有効にする
        setHasPlayedInitialAnimation(true) // 初回アニメーション完了フラグを設定
        // sessionStorageに状態を保存（セッション中のみ保持）
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('hasPlayedInitialAnimation', 'true')
        }
      },
    })

    // Animate content coming up from bottom - SLOWER SPEED
    tl.to(
      contentRef.current,
      {
        y: "0%",
        opacity: 1,
        duration: 3.0, // Much slower for more elegant effect
        ease: "power1.out", // Gentler easing
      },
      0,
    )

    // Prepare documents for more realistic physics
    // Group documents by their vertical position
    const bottomDocs: HTMLElement[] = []
    const middleDocs: HTMLElement[] = []
    const topDocs: HTMLElement[] = []

    documentsRef.current.forEach((doc) => {
      const rect = doc.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const windowHeight = window.innerHeight

      if (centerY > windowHeight * 0.7) {
        bottomDocs.push(doc) // Bottom 30%
      } else if (centerY > windowHeight * 0.4) {
        middleDocs.push(doc) // Middle 30%
      } else {
        topDocs.push(doc) // Top 40%
      }
    })

    // Bottom documents - pushed up first and fastest
    tl.to(
      bottomDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          // Push up and slightly to sides
          return centerY - window.innerHeight * 1.2
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(100, 300)}`
        },
        rotation: () => gsap.utils.random(-720, 720),
        scale: () => gsap.utils.random(0.4, 0.8),
        opacity: 0.4,
        duration: 2.5,
        stagger: {
          amount: 0.8,
          from: "center",
        },
        ease: "power1.out",
      },
      1.0, // Start when LP content is about 1/3 up
    )

    // Middle documents - pushed up with slight delay
    tl.to(
      middleDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          return centerY - window.innerHeight * 1
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(150, 350)}`
        },
        rotation: () => gsap.utils.random(-540, 540),
        scale: () => gsap.utils.random(0.4, 0.7),
        opacity: 0.3,
        duration: 2.2,
        stagger: {
          amount: 0.7,
          from: "center",
        },
        ease: "power1.out",
      },
      1.5, // Start when LP is about halfway up
    )

    // Top documents - pushed up last and least
    tl.to(
      topDocs,
      {
        y: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          return centerY - window.innerHeight * 0.7
        },
        x: (i, el) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const direction = centerX > window.innerWidth / 2 ? 1 : -1
          return `+=${direction * gsap.utils.random(100, 250)}`
        },
        rotation: () => gsap.utils.random(-360, 360),
        scale: () => gsap.utils.random(0.3, 0.6),
        opacity: 0.2,
        duration: 2.0,
        stagger: {
          amount: 0.6,
          from: "center",
        },
        ease: "power1.out",
      },
      2.0, // Start when LP is almost at the top
    )
  }

  // スクロール無効化のためのイベントハンドラー
  useEffect(() => {
    if (scrollDisabled) {
      // 現在のスクロール位置を記録（常に0,0にリセット）
      const savedScrollX = 0
      const savedScrollY = 0

      // スクロールを無効にする関数
      const preventScroll = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        // 強制的にページトップに戻す
        window.scrollTo(0, 0)
        return false
      }

      const preventTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        // タッチ後も強制的にページトップに戻す
        setTimeout(() => window.scrollTo(0, 0), 0)
      }

      const preventKeyScroll = (e: KeyboardEvent) => {
        // スペース、ページアップ/ダウン、矢印キーなどのスクロールキーを無効化
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault()
          // キー操作後も強制的にページトップに戻す
          setTimeout(() => window.scrollTo(0, 0), 0)
          return false
        }
      }

      // 強制的にスクロール位置をリセットする関数
      const forceScrollReset = () => {
        window.scrollTo(0, 0)
      }

      // document.bodyとhtmlのスクロールを無効化
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '0'
      document.body.style.left = '0'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      
      // 各種スクロールイベントを無効化
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventTouchMove, { passive: false })
      window.addEventListener('keydown', preventKeyScroll, false)
      document.addEventListener('scroll', preventScroll, { passive: false })
      
      // 定期的にスクロール位置をリセット
      const scrollResetInterval = setInterval(forceScrollReset, 16) // 60fps
      
      // 初回も強制リセット
      forceScrollReset()

      return () => {
        // クリーンアップ
        clearInterval(scrollResetInterval)
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.width = ''
        document.body.style.height = ''
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventTouchMove)
        window.removeEventListener('keydown', preventKeyScroll)
        document.removeEventListener('scroll', preventScroll)
        
        // 最終的にページトップに戻す
        window.scrollTo(0, 0)
      }
    }
  }, [scrollDisabled])

  useEffect(() => {
    // 初回アクセス時のみアニメーションを再生
    if (!hasPlayedInitialAnimation) {
      playAnimation()
    } else {
      // 既にアニメーションが再生済みの場合、コンテンツを即座に表示
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          opacity: 1,
          y: "0%",
          display: "block",
        })
      }
      setAnimationComplete(true)
      setScrollDisabled(false)
    }

    // ウィンドウリサイズ時はアニメーションを再生しない（レイアウト調整のみ）
    const handleResize = () => {
      if (containerRef.current && hasPlayedInitialAnimation) {
        // アニメーション再生済みの場合は、ドキュメントの位置をリセットするだけ
        const documents = containerRef.current.querySelectorAll(".document")
        gsap.killTweensOf(documents)
        // ドキュメントを非表示にしてコンテンツを表示状態に保つ
        gsap.set(documents, { opacity: 0 })
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            opacity: 1,
            y: "0%",
            display: "block",
          })
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [hasPlayedInitialAnimation])

  return (
    <main className="min-h-screen bg-blue-50">
      
      {/* Animation container - always visible */}
      <div
        ref={containerRef}
        className={`w-full h-screen flex items-center justify-center fixed top-0 left-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          animationComplete ? "opacity-30" : "opacity-100"
        }`}
      >
        <DocumentScatter />
        
        {/* Message Image - appears after documents scatter */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <img
            ref={messageImageRef}
            src="/images/message.png"
            alt="介護現場の大量の書類作業、困っていませんか？"
            className="max-w-[80%] max-h-[80%] md:max-w-[60%] md:max-h-[60%] object-contain opacity-0"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>
      </div>

      {/* Landing page content */}
      <div 
        ref={contentRef} 
        className={`relative z-20 ${!hasPlayedInitialAnimation ? 'opacity-0' : ''}`}
      >
        <HeroSection />
        <ServiceSection />
        <PointsSection />
        {/* <FeaturesSection /> */}
        <ServiceContentSection />
        <InterviewSection />
        <ServiceCountSection />
        <FAQSection />
      </div>

      {/* SlideInPopup - ヒーローセクションを出るとスライドイン */}
      <SlideInPopup />
    </main>
  )
}
