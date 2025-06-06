"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DocumentButtonProps {
  href: string;
  title: string;
  subtitle?: string;
  description: string;
  variant: "paper" | "folder" | "note" | "envelope";
  className?: string;
}

export function DocumentButton({ 
  href, 
  title, 
  subtitle, 
  description, 
  variant,
  className 
}: DocumentButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const shadow = shadowRef.current;
    
    if (!button || !shadow) return;

    // 初期状態を設定
    gsap.set(button, { y: 0, scale: 1, rotationX: 0, rotationY: 0 });
    gsap.set(shadow, { scale: 1, opacity: 0.15, blur: 8 });

    const handleMouseEnter = () => {
      // ボタンが浮かび上がる効果
      gsap.to(button, {
        y: -12,
        scale: 1.08,
        rotationX: 5,
        rotationY: 2,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // 影がより大きく、濃くなる
      gsap.to(shadow, {
        scale: 1.15,
        opacity: 0.4,
        blur: 16,
        x: 4,
        y: 6,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // 元の状態に戻る
      gsap.to(button, {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(shadow, {
        scale: 1,
        opacity: 0.15,
        blur: 8,
        x: 2,
        y: 2,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "paper":
        return {
          bg: "bg-white",
          border: "border-gray-300",
          accent: "bg-gray-200",
          textAccent: "text-gray-600",
          shadow: "shadow-md"
        };
      case "folder":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          accent: "bg-amber-200",
          textAccent: "text-amber-700",
          shadow: "shadow-lg"
        };
      case "note":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          accent: "bg-yellow-200",
          textAccent: "text-yellow-700",
          shadow: "shadow-md"
        };
      case "envelope":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          accent: "bg-blue-200",
          textAccent: "text-blue-700",
          shadow: "shadow-lg"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Link href={href} className="block">
      <div className={cn("relative cursor-pointer", className)}>
        {/* Shadow */}
        <div 
          ref={shadowRef}
          className="absolute inset-0 bg-black opacity-15 rounded-lg transform translate-y-2 translate-x-2 blur-sm"
          style={{ filter: 'blur(8px)' }}
        />
        
        {/* Document Button */}
        <div 
          ref={buttonRef}
          className={cn(
            "relative p-6 rounded-lg border-2 transition-all duration-200 transform-gpu",
            styles.bg,
            styles.border,
            styles.shadow,
            "hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
          )}
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Document Header */}
          <div className={cn("w-full h-4 rounded-sm mb-4", styles.accent)} />
          
          {/* Title */}
          <div className="mb-3">
            {subtitle && (
              <p className={cn("text-sm font-medium mb-1", styles.textAccent)}>
                {subtitle}
              </p>
            )}
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {title}
            </h3>
          </div>
          
          {/* Content Lines */}
          <div className="space-y-2 mb-4">
            {description.split('\n').map((line, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
          
          {/* Document Footer */}
          <div className="flex justify-between items-center mt-6">
            <div className={cn("w-16 h-3 rounded-sm", styles.accent)} />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </div>
          
          {/* Corner Fold Effect */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-200" />
        </div>
      </div>
    </Link>
  );
}