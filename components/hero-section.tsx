"use client"

import { useEffect, useRef } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { gsap } from "gsap"

interface HeroSectionProps {
  onReplayAnimation: () => void
}

export default function HeroSection({ onReplayAnimation }: HeroSectionProps) {
  const characterRefs = useRef<Array<HTMLDivElement | null>>([])
  const orbitRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return
    
    // Create a GSAP context specific to this component
    if (orbitRef.current && characterRefs.current.length === 4 && logoRef.current) {
      // Create a GSAP context for this component
      const ctx = gsap.context(() => {
        // Animation setup for 3D orbit
        const radius = 180 // orbit radius
        const centerX = 0
        const centerY = 0
        const duration = 15 // time for one full rotation
        
        // Set initial positions for each character (offset by 90 degrees)
        gsap.set(characterRefs.current[0], {
          x: centerX + radius,
          y: centerY,
          scale: 1,
          zIndex: 20,
        })
        gsap.set(characterRefs.current[1], {
          x: centerX,
          y: centerY + radius,
          scale: 0.8,
          zIndex: 10,
        })
        gsap.set(characterRefs.current[2], {
          x: centerX - radius,
          y: centerY,
          scale: 0.8,
          zIndex: 10,
        })
        gsap.set(characterRefs.current[3], {
          x: centerX,
          y: centerY - radius,
          scale: 0.8,
          zIndex: 10,
        })
        
        // Logo animation
        gsap.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0.5 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 2, 
            repeat: -1, 
            yoyo: true, 
            ease: "sine.inOut",
            id: "heroLogoAnimation" // Add identifier for this animation
          },
        )
        
        // Rotate each character around the orbit
        characterRefs.current.forEach((char, index) => {
          if (!char) return
          
          // Starting angle for each character (offset by 90 degrees)
          const startAngle = index * 90
          
          // Create rotation animation
          gsap.to(char, {
            duration: duration,
            repeat: -1,
            ease: "none",
            id: `heroCharAnimation${index}`, // Add identifier for this animation
            onUpdate: function () {
              // Current progress (0-1)
              const progress = this.progress()
              // Current angle (start angle + progress angle)
              const angle = startAngle + progress * 360
              // Convert to radians
              const radian = (angle * Math.PI) / 180
              
              // Calculate new position
              const newX = centerX + Math.cos(radian) * radius
              const newY = centerY + Math.sin(radian) * radius
              
              // Update position
              gsap.set(char, { x: newX, y: newY })
              
              // Adjust scale and opacity for depth effect
              // Closer (bottom half of circle) = larger, further (top half) = smaller
              const scale = 0.8 + 0.2 * Math.sin(radian) // Range: 0.8-1.0
              const zIndex = Math.sin(radian) > 0 ? 20 : 10 // Bottom half = front, top half = back
              
              gsap.set(char, {
                scale: scale,
                zIndex: zIndex,
                opacity: 0.8 + 0.2 * Math.sin(radian), // Range: 0.8-1.0
              })
            },
          })
        })
      }, orbitRef); // Scope to orbit element
      
      // Clean up when component unmounts
      return () => {
        // Revert all animations created in this context
        ctx.revert();
      }
    }
  }, [])

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 relative bg-[#a8e0ff]">
      <div className="absolute top-6 left-6">
        <div className="relative w-40 h-12">
          <Image src="/images/CareSmily_ロゴ.png" alt="CareSmily Logo" fill style={{ objectFit: "contain" }} />
        </div>
      </div>

      <div className="absolute top-6 right-6 bg-[#0a2540] text-white rounded-full p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-help-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-16">
        <div className="flex flex-col items-center mb-8">
          <div className="text-center mb-2">
            <div className="inline-block relative">
              <span className="text-lg font-medium text-[#0a2540]">専門スタッフのサポートで</span>
              <div className="absolute -top-3 right-0 transform translate-x-[105%] bg-white rounded-full px-3 py-1 border border-[#0a2540] text-sm">
                あんしん＆らくらく
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#0a2540]">おまかせケアサポート</h1>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-96 mb-8">
          {/* 3Dアニメーションのための軌道 */}
          <div
            ref={orbitRef}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* 中央のロゴマーク */}
            <div
              ref={logoRef}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-white rounded-full shadow-lg flex items-center justify-center z-30"
            >
              <div className="relative w-[80%] h-[80%]">
                <Image
                  src="/images/CareSmily_ロゴ.png"
                  alt="CareSmily Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* 接続線 - 中央の薄い円 */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-[#42a5d5]/10 z-0"></div>

            {/* 左側の介護士 */}
            <div
              ref={(el) => { characterRefs.current[0] = el }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[250px]"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/images/nurse-tablet.png"
                alt="Care staff with tablet"
                width={150}
                height={250}
                className="object-contain"
                priority
              />
            </div>

            {/* 上側の高齢男性（車椅子） */}
            <div
              ref={(el) => { characterRefs.current[1] = el }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[250px]"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/images/elderly-man-wheelchair.png"
                alt="Elderly man in wheelchair"
                width={150}
                height={250}
                className="object-contain"
                priority
              />
            </div>

            {/* 右側の介護士 */}
            <div
              ref={(el) => { characterRefs.current[2] = el }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[250px]"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/images/caregiver-pink.png"
                alt="Care staff in pink"
                width={150}
                height={250}
                className="object-contain"
                priority
              />
            </div>

            {/* 下側の高齢女性 */}
            <div
              ref={(el) => { characterRefs.current[3] = el }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[250px]"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/images/elderly-woman-cane.png"
                alt="高齢者"
                width={150}
                height={250}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-[#0a2540] mb-10 max-w-2xl mx-auto">
          CareSmily は、ケアの現場に笑顔をもたらす革新的なサービスです。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-[#42a5d5] hover:bg-[#3890bd] text-white px-8 py-6 text-lg">
            今すぐ始める
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-[#42a5d5] text-[#42a5d5] hover:bg-[#e6f4fa] px-8 py-6 text-lg bg-white"
            onClick={onReplayAnimation}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            アニメーションを再生
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-[#0a2540]">
        <button className="flex items-center gap-2 bg-[#0a2540] text-white px-4 py-2 rounded-md">
          GO NEXT
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
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
