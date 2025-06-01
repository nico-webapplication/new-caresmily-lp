"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// CareSmilyポップアップ画像のパス
const careSmilyPopupImageSrc = "/caresmily-popup.png";

export default function SlideInPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ページ読み込み時は常にポップアップを表示可能にする
    // sessionStorageは使用せず、ページ更新で再度表示される

    // Create scroll trigger to show popup slightly before leaving hero section
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top -50vh", // Show popup when scrolled about half the viewport height
      onEnter: () => {
        if (!isDismissed) {
          setIsVisible(true);
          // Animate slide in from right
          if (popupRef.current) {
            gsap.fromTo(
              popupRef.current,
              { x: "100%", opacity: 0 },
              { x: "0%", opacity: 1, duration: 0.6, ease: "power2.out" },
            );
          }
        }
      },
      onLeaveBack: () => {
        // Hide when scrolling back to hero section
        if (isVisible && !isDismissed) {
          if (popupRef.current) {
            gsap.to(popupRef.current, {
              x: "100%",
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => setIsVisible(false),
            });
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDismissed]);

  const handleClose = () => {
    if (popupRef.current) {
      // Animate slide out to right
      gsap.to(popupRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIsVisible(false);
          setIsDismissed(true);
          // sessionStorageは使用しない（ページ更新で再表示される）
        },
      });
    }
  };

  const handleClick = () => {
    router.push("/contact");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      ref={popupRef}
      className="fixed bottom-6 right-6 z-50 cursor-pointer transition-opacity duration-300 hover:opacity-70"
      onClick={handleClick}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10 shadow-lg"
        aria-label="ポップアップを閉じる"
      >
        <X size={14} />
      </button>

      {/* CareSmilyポップアップ画像 */}
      <div className="relative">
        <img
          src={careSmilyPopupImageSrc}
          alt="CareSmily 文例数100,000例以上！介護ドキュメントDX No.1 無料ご紹介資料はこちら"
          className="w-52 h-auto rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        />
        {/* ホバー時の透明度調整のためのオーバーレイ */}
        <div className="absolute inset-0 bg-transparent rounded-lg"></div>
      </div>
    </div>
  );
}
