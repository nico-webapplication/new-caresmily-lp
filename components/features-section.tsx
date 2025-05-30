"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FeaturesSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    // Set initial state - make SVG visible
    gsap.set(svgRef.current, {
      opacity: 1,
      rotation: -20,
      transformOrigin: "center center"
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Create simple floating animation for the background elements
    tl.to(".animated-bg-rect", {
      y: "+=20",
      rotation: "+=5",
      duration: 2,
      ease: "sine.inOut",
      stagger: 0.2
    })
    .to(".animated-bg-circle", {
      scale: 1.1,
      opacity: 0.8,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.1
    }, 0)
    .to(".animated-bg-cross", {
      rotation: "+=180",
      duration: 3,
      ease: "power2.inOut"
    }, 0)
    .to(".animated-bg-rect", {
      y: "-=20",
      rotation: "-=5",
      duration: 2,
      ease: "sine.inOut",
      stagger: 0.2
    })
    .to(".animated-bg-circle", {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.1
    });

    // Click to restart
    const handleClick = () => {
      tl.restart();
    };

    sectionRef.current.addEventListener("click", handleClick);

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener("click", handleClick);
      }
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gray-50 py-20 overflow-hidden">
      {/* Animated SVG Background */}
      <svg 
        ref={svgRef}
        className="absolute -left-1/2 -top-2/5 w-[250vw] opacity-100 pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 2000 600" 
        fill="none"
      >
        <rect className="animated-bg-rect" x="200" y="100" width="80" height="300" fill="#0AE448" opacity="0.2" />
        <rect className="animated-bg-rect" x="400" y="150" width="60" height="250" fill="#0AE448" opacity="0.3" />
        <rect className="animated-bg-rect" x="600" y="80" width="90" height="320" fill="#0AE448" opacity="0.25" />
        
        <circle className="animated-bg-circle" cx="300" cy="200" r="40" fill="#146EF5" opacity="0.3" />
        <circle className="animated-bg-circle" cx="500" cy="250" r="30" fill="#146EF5" opacity="0.4" />
        <circle className="animated-bg-circle" cx="700" cy="180" r="50" fill="#146EF5" opacity="0.25" />
        
        <g className="animated-bg-cross" stroke="#E5E7EB" strokeWidth="4" opacity="0.3">
          <path d="M350 100v300" />
          <path d="M200 250h300" />
        </g>
        
        <rect className="animated-bg-rect" x="1200" y="120" width="70" height="280" fill="#0AE448" opacity="0.2" />
        <rect className="animated-bg-rect" x="1400" y="90" width="85" height="310" fill="#0AE448" opacity="0.3" />
        <rect className="animated-bg-rect" x="1600" y="160" width="75" height="240" fill="#0AE448" opacity="0.25" />
        
        <circle className="animated-bg-circle" cx="1300" cy="220" r="35" fill="#146EF5" opacity="0.3" />
        <circle className="animated-bg-circle" cx="1500" cy="270" r="45" fill="#146EF5" opacity="0.4" />
        <circle className="animated-bg-circle" cx="1700" cy="190" r="40" fill="#146EF5" opacity="0.25" />
        
        <g className="animated-bg-cross" stroke="#E5E7EB" strokeWidth="4" opacity="0.3">
          <path d="M1350 120v280" />
          <path d="M1200 260h400" />
        </g>
      </svg>

      {/* Vertical side text (desktop only) */}
      <div className="hidden xl:block absolute top-0 left-0 h-full pointer-events-none select-none z-10">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-800 rotate-90 origin-top-left ml-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>
      <div className="hidden xl:block absolute top-0 right-0 h-full pointer-events-none select-none z-10">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-800 rotate-90 origin-top-right mr-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2列3行グリッドレイアウト */}
        <div className="relative w-full max-w-4xl mx-auto hidden md:block">
          
          {/* 6つのカードのグリッド配置 */}
          <div className="grid grid-cols-2 gap-x-1">
            
            {/* 左列 */}
            <div className="space-y-1">
              {/* 左上 - 就職率 */}
              <FeatureCard
                color="orange"
                icon={() => <span className="text-3xl">😊</span>}
                headerLines={[
                  "個性を仕事に。",
                  "就職率 <span class='text-[48px] leading-none font-extrabold text-orange-500'>95.2%</span>",
                  "徹底した就職サポート",
                ]}
                footnote="2025年3月 卒業生実績"
              />

              {/* 左中 - 創立49年 */}
              <FeatureCard
                color="red"
                icon={() => <span className="text-3xl">❤️</span>}
                headerLines={[
                  "創立",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>49</span> 年",
                  "地元に根付き、地域の人々に愛される場所であること",
                ]}
              />

              {/* 左下 - 卒業生 */}
              <FeatureCard
                color="indigo"
                icon={() => <span className="text-3xl">👨‍🎓</span>}
                headerLines={[
                  "各業界の最前線で頼れる卒業生が活躍中!!",
                  "卒業生のべ",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
                ]}
                footnote="2024年3月 卒業生実績"
              />
            </div>

            {/* 右列 */}
            <div className="space-y-1">
              {/* 右上 - 授業料免除 */}
              <FeatureCard
                color="yellow"
                icon={() => <span className="text-3xl">📚</span>}
                headerLines={[
                  "2年間の授業料",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
                  "独自の学費サポートで進学を応援します!!",
                ]}
              />

              {/* 右中 - 産学官連携 */}
              <FeatureCard
                color="blue"
                icon={() => <span className="text-3xl">🏆</span>}
                headerLines={[
                  "産学官連携で現場がわかる!",
                  "企業コラボ数 年間",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>100</span> 件",
                ]}
              />

              {/* 右下 - 国家資格合格率 */}
              <FeatureCard
                color="pink"
                icon={() => <span className="text-3xl">🎉</span>}
                headerLines={[
                  "少人数ならではのサポート体制!",
                  "国家資格2級建築士製図試験",
                  "資格合格率 <span class='text-[48px] leading-none font-extrabold text-orange-500'>100%</span>",
                ]}
                footnote="2024年3月 卒業生実績"
              />
            </div>
          </div>

          {/* 中央 - About Us （楕円形、テキストに重ならない位置） */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <AboutCard />
          </div>

        </div>

        {/* モバイル用の縦積みレイアウト */}
        <div className="md:hidden space-y-6">
          <div className="mx-auto max-w-sm">
            <AboutCard />
          </div>
          
          <FeatureCard
            color="orange"
            icon={() => <span className="text-3xl">😊</span>}
            headerLines={[
              "個性を仕事に。",
              "就職率 <span class='text-[64px] leading-none font-extrabold text-orange-500'>95.2%</span>",
              "徹底した就職サポート",
            ]}
            footnote="2025年3月 卒業生実績"
          />

          <FeatureCard
            color="yellow"
            icon={() => <span className="text-3xl">📚</span>}
            headerLines={[
              "2年間の授業料",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
              "独自の学費サポートで進学を応援します!!",
            ]}
          />

          <FeatureCard
            color="blue"
            icon={() => <span className="text-3xl">🏆</span>}
            headerLines={[
              "産学官連携で現場がわかる!",
              "企業コラボ数 年間",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>100</span> 件",
            ]}
          />

          <FeatureCard
            color="red"
            icon={() => <span className="text-3xl">❤️</span>}
            headerLines={[
              "創立",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>49</span> 年",
              "地元に根付き、地域の人々に愛される場所であること",
            ]}
          />

          <FeatureCard
            color="pink"
            icon={() => <span className="text-3xl">🎉</span>}
            headerLines={[
              "少人数ならではのサポート体制!",
              "国家資格2級建築士製図試験",
              "資格合格率 <span class='text-[64px] leading-none font-extrabold text-orange-500'>100%</span>",
            ]}
            footnote="2024年3月 卒業生実績"
          />

          <FeatureCard
            color="indigo"
            icon={() => <span className="text-3xl">👨‍🎓</span>}
            headerLines={[
              "各業界の最前線で頼れる卒業生が活躍中!!",
              "卒業生のべ",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
            ]}
            footnote="2024年3月 卒業生実績"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */

interface FeatureCardProps {
  color: "orange" | "yellow" | "red" | "blue" | "pink" | "indigo";
  icon: () => React.ReactNode;
  headerLines: string[]; // Strings can include basic HTML span for inline sizes/colours.
  footnote?: string;
}

function FeatureCard({ color, icon: Icon, headerLines, footnote }: FeatureCardProps) {
  const bg = {
    orange: "bg-white/95 backdrop-blur-sm border border-orange-200",
    yellow: "bg-white/95 backdrop-blur-sm border border-yellow-200",
    red: "bg-white/95 backdrop-blur-sm border border-red-200",
    blue: "bg-white/95 backdrop-blur-sm border border-blue-200",
    pink: "bg-white/95 backdrop-blur-sm border border-pink-200",
    indigo: "bg-white/95 backdrop-blur-sm border border-indigo-200",
  }[color];

  const iconBg = {
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500",
    indigo: "bg-indigo-500",
  }[color];

  return (
    <div className={`relative rounded-2xl p-6 ${bg} flex flex-col justify-between w-full min-h-[340px] shadow-lg hover:shadow-xl transition-all duration-300`}>
      {/* floating icon */}
      <div className={`absolute -top-3 -left-3 ${iconBg} shadow-md rounded-full p-2`}>
        {Icon()}
      </div>

      {/* body */}
      <div className="space-y-2">
        {headerLines.map((line, idx) => (
          <p
            key={idx}
            className="text-gray-900 font-bold leading-tight text-sm"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {footnote && (
        <p className="text-xs text-gray-500 mt-3" dangerouslySetInnerHTML={{ __html: footnote }} />
      )}
    </div>
  );
}

function AboutCard() {
  return (
    <div className="relative w-72 h-[640px] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full flex flex-col items-center justify-top shadow-2xl">

      {/* Central image with orange background */}
      <div className="relative w-40 h-40 rounded-full bg-orange-500 flex items-center justify-center mb-8 overflow-hidden mt-8">     
          <Image 
            src="/about-us-boy.png" 
            alt="Student with laptop" 
            width={40} 
            height={40}
            className="object-contain"
          />
        {/* Speech bubble */}
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[8px] px-1.5 py-1 rounded-full font-bold leading-tight whitespace-nowrap">
          設備が<br/>整ってる
        </div>
      </div>

      {/* Title */}
      <h3 className="text-4xl font-extrabold text-gray-900 mb-1">Advantages </h3>
      <h3 className="text-4xl font-extrabold text-gray-900 mb-1">of</h3>
      <h3 className="text-4xl font-extrabold text-gray-900 mb-1">Introduction</h3>
      
      {/* Subtitle */}
      <p className="text-xl text-orange-500 mb-8 font-medium">導入メリット</p>
      
      {/* Description text */}
      <p className="text-center text-gray-700 text-base max-w-48 leading-relaxed px-4 mb-4">
        CareSmilyを導入することは、介護現場にたくさんのメリットをもたらします。
      </p>
      
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}