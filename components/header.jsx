"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { href: "#hero", label: "トップ" },
    { href: "#service", label: "サービス" },
    { href: "#features", label: "特徴" },
    { href: "#content", label: "コンテンツ" },
    { href: "#faq", label: "よくある質問" }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.getElementById(href.substring(1));
    const container = document.getElementById('content-scroll');
    
    if (element && container) {
      container.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full px-6 h-16 md:h-18 flex items-center justify-between z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {/* Logo */}
        <div className="mix-blend-difference">
          <Link href="/">
            <img src="/images/CareSmily_ロゴ.png" alt="CareSmily" className="h-7 md:h-8" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 mix-blend-difference">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden mix-blend-difference text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute right-0 top-0 w-64 h-full bg-white p-6 pt-20">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-2 text-gray-800 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}