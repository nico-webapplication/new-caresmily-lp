"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SlideInPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Check if popup was already dismissed in this session
    const dismissed = sessionStorage.getItem('popupDismissed') === 'true'
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Create scroll trigger to show popup when leaving hero section
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top -100px", // When scrolled past hero section
      onEnter: () => {
        if (!isDismissed) {
          setIsVisible(true)
          // Animate slide in from right
          if (popupRef.current) {
            gsap.fromTo(popupRef.current, 
              { x: "100%", opacity: 0 },
              { x: "0%", opacity: 1, duration: 0.6, ease: "power2.out" }
            )
          }
        }
      },
      onLeaveBack: () => {
        // Optional: hide when scrolling back to top
        // setIsVisible(false)
      }
    })

    return () => {
      trigger.kill()
    }
  }, [isDismissed])

  const handleClose = () => {
    if (popupRef.current) {
      // Animate slide out to right
      gsap.to(popupRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIsVisible(false)
          setIsDismissed(true)
          sessionStorage.setItem('popupDismissed', 'true')
        }
      })
    }
  }

  const handleClick = () => {
    router.push('/document-request')
  }

  if (!isVisible || isDismissed) return null

  return (
    <div
      ref={popupRef}
      className="fixed bottom-6 right-6 z-50 cursor-pointer transition-opacity duration-300 hover:opacity-70"
      onClick={handleClick}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        aria-label="ポップアップを閉じる"
      >
        <X size={14} />
      </button>

      {/* Popup content */}
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          {/* Icon or image placeholder - you can replace this with your attached image */}
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            📋
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              資料請求はこちら
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              詳しい情報をお送りします
            </p>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-3 text-center">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
            今すぐ資料請求 →
          </div>
        </div>
      </div>
    </div>
  )
}