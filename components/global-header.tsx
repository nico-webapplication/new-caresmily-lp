"use client"

import React, { useState, useEffect } from "react"
import { useScrollTrigger } from "@/components/scroll-trigger-provider"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const GlobalHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const scrollTrigger = useScrollTrigger()

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // 初期化
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  // Update active section based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observeScroll = () => {
      // スクロールコンテナからスクロール位置を取得
      const scrollElement = document.querySelector("#content-scroll")
      const scrollPosition = scrollElement ? scrollElement.scrollTop + 100 : 0
      
      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(index)
        }
      })
    }
    
    const scrollElement = document.querySelector("#content-scroll")
    if (scrollElement) {
      scrollElement.addEventListener('scroll', observeScroll)
      return () => scrollElement.removeEventListener('scroll', observeScroll)
    }
  }, [])

  // GSAP ScrollTriggerによるナビゲーションのハイライト設定
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    
    // 各セクションに対してScrollTriggerを作成
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: "#content-scroll",
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i)
      })
    })
    
    return () => {
      // クリーンアップ
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Scroll to section
  const scrollToSection = (id: string, index: number) => {
    const element = document.getElementById(id)
    if (element) {
      // ScrollTriggerProviderの関数を使用
      scrollTrigger.scrollTop(element.offsetTop - 80)
      setActiveSection(index)
    }
    setDrawerOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[72px] px-6 z-[1000] bg-white/70 backdrop-blur-md mix-blend-difference pointer-events-none">
        <div className="relative flex justify-between items-center h-full max-w-7xl mx-auto pointer-events-auto">
          <h1 className="relative">
            <Link href="/" className="block" aria-label="CareSmily">
              <Image 
                src="/images/caresmily-logo.png" 
                alt="CareSmily" 
                width={150} 
                height={40} 
                className="invert"
                priority
              />
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:block" 
            role="navigation" 
            aria-label="グローバルナビゲーション"
          >
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="#service" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('service', 0)
                  }}
                  className={`nav-link text-white hover:text-gray-200 font-medium transition-colors ${activeSection === 0 ? 'border-b-2 border-white' : ''}`}
                  data-index="0"
                >
                  サービス
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('features', 1)
                  }}
                  className={`nav-link text-white hover:text-gray-200 font-medium transition-colors ${activeSection === 1 ? 'border-b-2 border-white' : ''}`}
                  data-index="1"
                >
                  特長
                </a>
              </li>
              <li>
                <a 
                  href="#content" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('content', 2)
                  }}
                  className={`nav-link text-white hover:text-gray-200 font-medium transition-colors ${activeSection === 2 ? 'border-b-2 border-white' : ''}`}
                  data-index="2"
                >
                  コンテンツ
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('faq', 3)
                  }}
                  className={`nav-link text-white hover:text-gray-200 font-medium transition-colors ${activeSection === 3 ? 'border-b-2 border-white' : ''}`}
                  data-index="3"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="bg-white text-blue-500 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-gray-100 transition-colors" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('contact', 4)
                  }}
                  data-index="4"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center pointer-events-auto"
            onClick={toggleDrawer}
            aria-controls="globalDrawer"
            aria-expanded={drawerOpen}
          >
            <span className="sr-only">メニュー</span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform ${drawerOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity ${drawerOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${drawerOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="globalDrawer"
        className={`fixed inset-0 bg-blue-600 z-40 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full w-full flex flex-col items-center justify-center">
          <nav className="py-8">
            <ul className="flex flex-col items-center space-y-8">
              <li>
                <a 
                  href="#service" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('service', 0)
                  }}
                  className="text-white text-2xl font-bold hover:text-gray-200"
                >
                  サービス
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('features', 1)
                  }}
                  className="text-white text-2xl font-bold hover:text-gray-200"
                >
                  特長
                </a>
              </li>
              <li>
                <a 
                  href="#content" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('content', 2)
                  }}
                  className="text-white text-2xl font-bold hover:text-gray-200"
                >
                  コンテンツ
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('faq', 3)
                  }}
                  className="text-white text-2xl font-bold hover:text-gray-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('contact', 4)
                  }}
                  className="mt-4 bg-white text-blue-600 px-8 py-3 rounded-md text-xl font-bold shadow-lg hover:bg-gray-100 transition-colors"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default GlobalHeader