"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-5 left-5 right-5 z-50">
      <div 
        className="h-16 rounded-lg shadow-lg px-6 flex items-center justify-between"
        style={{ backgroundColor: "rgb(10,37,64)" }}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="text-white font-bold text-xl">
              CareSmily
            </div>
          </Link>
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="#about" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                サービス概要
              </Link>
            </li>
            <li>
              <Link 
                href="#features" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                特徴
              </Link>
            </li>
            <li>
              <Link 
                href="#services" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                サービス内容
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        {/* モバイルメニューボタン */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">メニュー</span>
        </button>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg py-4"
          style={{ backgroundColor: "rgb(10,37,64)" }}
        >
          <ul className="flex flex-col space-y-3 px-6">
            <li>
              <Link 
                href="#about" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                サービス概要
              </Link>
            </li>
            <li>
              <Link 
                href="#features" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                特徴
              </Link>
            </li>
            <li>
              <Link 
                href="#services" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                サービス内容
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}