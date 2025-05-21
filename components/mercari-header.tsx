"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const MercariHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)

  // ナビゲーションアイテム
  const navItems = [
    { id: "hero", label: "トップ", href: "#hero" },
    { id: "service", label: "サービス", href: "#service" },
    { id: "features", label: "特徴", href: "#features" },
    { id: "content", label: "コンテンツ", href: "#content" },
    { id: "faq", label: "よくある質問", href: "#faq" },
  ]

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // 各セクションの位置を検出して、アクティブなセクションを設定
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section, index) => {
        if (!section) return
        
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(navItems[index].id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // メニュークリック時の処理
  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    
    // スクロール
    const section = document.getElementById(id)
    const contentScroll = document.getElementById("content-scroll")
    
    if (section && contentScroll) {
      contentScroll.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      {/* ヘッダー */}
      <header 
        className={`fixed top-0 left-0 w-full h-16 md:h-18 px-6 z-[1000] flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {/* ロゴ */}
        <div className="mix-blend-difference pointer-events-none">
          <Link href="/" className="pointer-events-auto block">
            <img 
              src="/images/CareSmily_ロゴ.png" 
              alt="CareSmily" 
              className="h-7 md:h-8 w-auto"
            />
          </Link>
        </div>
        
        {/* デスクトップナビゲーション */}
        <nav 
          className="hidden md:flex items-center gap-8 mix-blend-difference pointer-events-none"
          role="navigation"
          aria-label="グローバルナビゲーション"
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
              className={`text-white font-medium text-sm relative py-1 pointer-events-auto ${
                activeSection === item.id ? 'font-bold' : ''
              }`}
            >
              {item.label}
              <span 
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : ''
                }`} 
              />
            </Link>
          ))}
        </nav>
        
        {/* モバイルメニューボタン */}
        <button
          className="md:hidden mix-blend-difference text-white w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white z-[1001] pt-20 px-6 shadow-lg transition-transform duration-300 ${
          mobileMenuOpen ? 'transform-none' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
              className={`text-gray-800 text-lg font-medium ${
                activeSection === item.id ? 'text-blue-500 font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

export default MercariHeader