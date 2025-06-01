"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-20 px-6 flex items-center justify-between"
        style={{ backgroundColor: "rgb(194,237,255)" }}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="h-10 relative">
              <Image 
                src="/images/caresmily-logo.png" 
                alt="CareSmily" 
                width={120} 
                height={40} 
                priority
                style={{ width: 'auto', height: '100%' }}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* デスクトップナビゲーション */}
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/column" 
                  className="text-black hover:text-gray-300 transition-colors"
                >
                  コラム
                </Link>
              </li>
              <li>
                <Link 
                  href="/media" 
                  className="text-black hover:text-gray-300 transition-colors"
                >
                  メディア情報
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-black hover:text-gray-300 transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            onClick={() =>
              (window.open("https://app.caresmily.com", '_blank'))
            }
            variant="outline"
            className="font-bold px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-in"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
            ログイン
          </Button>
        </div>

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
          className="md:hidden absolute top-full left-0 right-0 shadow-lg py-4"
          style={{ backgroundColor: "rgb(10,37,64)" }}
        >
          <ul className="flex flex-col space-y-3 px-6">
            <li>
              <Link 
                href="/column" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                コラム
              </Link>
            </li>
            <li>
              <Link 
                href="/media" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                メディア情報
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
          <div className="px-6 pt-4">
            <Button            
              onClick={() => {
                setIsOpen(false);
              }}
              variant="outline"
              className="w-full font-bold px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              <Link href="https://app.caresmily.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
              ログイン
                </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}