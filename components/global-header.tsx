"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"
import styled from "styled-components"

// スタイルコンポーネント
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 0 24px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    height: 72px;
  }
`;

const LogoContainer = styled.div`
  mix-blend-mode: difference;
  pointer-events: none;
  
  a {
    pointer-events: auto;
    display: block;
  }
  
  img {
    height: 28px;
    width: auto;
    
    @media (min-width: 768px) {
      height: 32px;
    }
  }
`;

const Navigation = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 32px;
    mix-blend-mode: difference;
    pointer-events: none;
    
    a {
      pointer-events: auto;
      color: #fff;
      font-weight: 500;
      text-decoration: none;
      position: relative;
      padding: 4px 0;
      font-size: 15px;
      
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
      }
      
      &:hover::after, &.is-active::after {
        width: 100%;
      }
      
      &.is-active {
        font-weight: 700;
      }
    }
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  mix-blend-mode: difference;
  color: #fff;
  padding: 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: #fff;
  z-index: 1001;
  padding: 80px 24px 24px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  
  &.is-open {
    transform: translateX(0);
  }
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 24px;
    
    a {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      text-decoration: none;
      
      &.is-active {
        color: #3b82f6;
        font-weight: 700;
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  &.is-open {
    opacity: 1;
    pointer-events: auto;
  }
`;

// ナビゲーションアイテム定義
const navItems = [
  { id: "hero", label: "トップ", href: "#hero" },
  { id: "service", label: "サービス", href: "#service" },
  { id: "features", label: "特徴", href: "#features" },
  { id: "content", label: "コンテンツ", href: "#content" },
  { id: "faq", label: "よくある質問", href: "#faq" },
];

const GlobalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const headerRef = useRef<HTMLElement>(null);

  // GSAPでスクロールトリガーを設定
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // 各セクションのスクロールトリガーを設定
    navItems.forEach(item => {
      const section = document.getElementById(item.id);
      if (!section) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // モバイルメニューの開閉
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // メニューを開いたときに背景スクロールを無効化
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // メニューリンクをクリックしたときの処理
  const handleNavLinkClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
    
    // スムーズスクロール
    const section = document.getElementById(id);
    const contentScroll = document.getElementById("content-scroll");
    if (section && contentScroll) {
      contentScroll.scrollTo({
        top: section.offsetTop - 70, // ヘッダーの高さを考慮
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <HeaderWrapper ref={headerRef}>
        <LogoContainer>
          <Link href="/">
            <img src="/images/CareSmily_ロゴ.png" alt="CareSmily" />
          </Link>
        </LogoContainer>
        
        <Navigation role="navigation" aria-label="グローバルナビゲーション">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(item.id);
              }}
              className={activeSection === item.id ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </Navigation>
        
        <HamburgerButton 
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </HamburgerButton>
      </HeaderWrapper>
      
      {/* モバイルメニュー */}
      <MobileDrawer id="mobile-menu" className={mobileMenuOpen ? "is-open" : ""}>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(item.id);
              }}
              className={activeSection === item.id ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </MobileDrawer>
      
      {/* オーバーレイ */}
      <Overlay 
        className={mobileMenuOpen ? "is-open" : ""} 
        onClick={() => {
          setMobileMenuOpen(false);
          document.body.style.overflow = "";
        }}
      />
    </>
  );
};

export default GlobalHeader;