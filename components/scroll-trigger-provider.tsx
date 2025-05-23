"use client"

import type React from "react"

import { createContext, useContext, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// ScrollTriggerのコンテキストを作成
const ScrollTriggerContext = createContext<{ scroller: string | null }>({
  scroller: null,
})

// ScrollTriggerのコンテキストを使用するためのフック
export const useScrollTrigger = () => useContext(ScrollTriggerContext)

// ScrollTriggerの設定を提供するプロバイダーコンポーネント
export default function ScrollTriggerProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      // GSAPとScrollTriggerを登録
      gsap.registerPlugin(ScrollTrigger)

      // リサイズ時にScrollTriggerを更新
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })

      resizeObserver.observe(document.body)

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
    <ScrollTriggerContext.Provider value={{ scroller: null }}>{children}</ScrollTriggerContext.Provider>
  )
}
