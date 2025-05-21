"use client"

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { id: "hero", label: "トップ", href: "#hero" },
  { id: "service", label: "サービス", href: "#service" },
  { id: "features", label: "特徴", href: "#features" },
  { id: "content", label: "コンテンツ", href: "#content" },
  { id: "faq", label: "よくある質問", href: "#faq" }
]

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      {/* Main Header */}
      <header 
        className="fixed top-0 left-0 w-full h-16 md:h-18 z-[1000] flex justify-between items-center px-6"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {/* Logo */}
        <div className="mix-blend-difference">
          <Link href="/">
            <img 
              src="/images/CareSmily_ロゴ.png" 
              alt="CareSmily"
              className="h-7 md:h-8" 
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mix-blend-difference">
          {navItems.map(item => (
            <Link 
              key={item.id}
              href={item.href}
              className="text-white font-medium hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mix-blend-difference text-white"
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-[1001] pt-20 px-6 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map(item => (
            <Link 
              key={item.id}
              href={item.href}
              className="text-gray-800 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1000]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}