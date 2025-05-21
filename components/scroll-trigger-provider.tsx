"use client"

import type React from "react"

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// スクロールトリガーコンテキストの型定義を拡張
type ScrollTriggerContextType = {
  scroller: string | null;
  scrollTop: (value: number) => void;
  getScrollTop: () => number;
}

// ScrollTriggerのコンテキストを作成
const ScrollTriggerContext = createContext<ScrollTriggerContextType>({
  scroller: null,
  scrollTop: () => {},
  getScrollTop: () => 0,
})

// ScrollTriggerのコンテキストを使用するためのフック
export const useScrollTrigger = () => useContext(ScrollTriggerContext)

// ScrollTriggerの設定を提供するプロバイダーコンポーネント
export default function ScrollTriggerProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)
  
  // スクロール位置を設定する関数
  const scrollTop = useCallback((value: number) => {
    const scrollElement = document.querySelector("#content-scroll")
    if (scrollElement) {
      scrollElement.scrollTop = value
    }
  }, [])
  
  // 現在のスクロール位置を取得する関数
  const getScrollTop = useCallback(() => {
    const scrollElement = document.querySelector("#content-scroll")
    return scrollElement ? scrollElement.scrollTop : 0
  }, [])

  useEffect(() => {
    if (!initialized.current) {
      // GSAPとScrollTriggerを登録
      gsap.registerPlugin(ScrollTrigger)

      // スクロールコンテナを設定
      ScrollTrigger.defaults({ scroller: "#content-scroll" })

      // スクロールコンテナの更新を監視
      ScrollTrigger.scrollerProxy("#content-scroll", {
        scrollTop(value) {
          if (arguments.length) {
            const scrollElement = document.querySelector("#content-scroll")
            if (scrollElement) {
              scrollElement.scrollTop = value as number
            }
          }
          const scrollElement = document.querySelector("#content-scroll")
          return scrollElement ? scrollElement.scrollTop : 0
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            right: window.innerWidth,
            bottom: window.innerHeight,
          }
        },
      })

      // リサイズ時にScrollTriggerを更新
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })

      const scrollElement = document.querySelector("#content-scroll")
      if (scrollElement) {
        resizeObserver.observe(scrollElement)
      }

      initialized.current = true

      // クリーンアップ
      return () => {
        resizeObserver.disconnect()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        ScrollTrigger.clearScrollMemory()
      }
    }
  }, [])

  return (
    <ScrollTriggerContext.Provider value={{ 
      scroller: "#content-scroll",
      scrollTop,
      getScrollTop 
    }}>
      {children}
    </ScrollTriggerContext.Provider>
  )
}
