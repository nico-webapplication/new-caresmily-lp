"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FeaturesSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    // 参考コードと同じアニメーション設定
    gsap.set(svgRef.current, {
      opacity: 1,
      rotation: -20,
      transformOrigin: "center center"
    });

    let tl = gsap.timeline();

    let lines = gsap.utils.toArray("svg > g");

    tl.from(
      lines,
      {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.06
      },
      0
    )
      .from(
        ".cross",
        {
          rotation: -800,
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
          ease: "expo.out",
          stagger: 0.01
        },
        0
      )
      .from(
        ".left",
        {
          xPercent: -20,
          duration: 12,
          ease: "expo.out"
        },
        0
      )
      .from(
        ".right",
        {
          xPercent: 20,
          duration: 12,
          ease: "expo.out"
        },
        0
      )
      .to(
        ".cross",
        {
          rotation: 360,
          opacity: 0,
          transformOrigin: "center center",
          ease: "expo.out",
          stagger: {
            from: "center",
            amount: 0.3
          }
        },
        1.5
      )
      .to(
        ".webflow",
        {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "center",
          duration: 0.3,
          stagger: {
            from: "end",
            amount: 0.4
          }
        },
        1.5
      );
    tl.to(
      ".gsap",
      {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center",
        duration: 0.3,
        stagger: {
          from: "start",
          amount: 0.4
        }
      },
      1.5
    );

    // 参考コードと同じクリックイベント
    const handleClick = () => {
      tl.timeScale(0.7).play(0);
    };

    sectionRef.current.addEventListener("click", handleClick);

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gray-50 py-20 overflow-hidden">
      {/* Animated SVG Background */}
      <svg 
        ref={svgRef}
        className="fixed -left-1/2 -top-2/5 w-[250vw] opacity-0 pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 17664 6582" 
        fill="none"
      >
        <g className="left" id="Frame 3">
          <g id="Group 48096702">
            <g id="Logo">
              <g id="Logo" fill="#0AE448" className="gsap">
                <path id="Vector" d="M1184.85 215.776v.202l-16.38 71.85c-.89 4.064-4.9 7.043-9.54 7.043h-19.77c-1.47 0-2.78.985-3.18 2.399-18.26 62.584-42.97 105.603-75.61 131.43-27.78 21.989-62.009 32.239-107.729 32.239-41.1 0-68.795-13.355-92.299-39.712-31.053-34.839-43.903-91.87-36.127-160.589C838.252 131.631 904.447 1.464 1031.96 1.464c38.78-.354 69.23 11.739 90.41 35.874 22.39 25.524 33.78 63.973 33.83 114.288-.08 4.57-3.84 8.256-8.36 8.256h-93.41c-3.3 0-6.26-3.005-6.21-6.312-.76-34.789-10.98-51.754-31.28-51.754-35.796 0-56.927 49.129-68.136 76.369-15.653 38.045-23.605 79.348-22.04 120.499.732 19.161 3.787 46.099 21.787 57.257 15.956 9.897 38.727 3.333 52.509-7.624 13.79-10.957 24.87-29.916 29.54-47.21.66-2.398.71-4.266.08-5.099-.66-.859-2.48-1.061-3.87-1.061h-23.98c-2.58 0-5.125-1.186-6.665-3.105-1.288-1.616-1.793-3.61-1.338-5.579l16.413-71.976c.8-3.686 4.11-6.463 8.18-6.968v-.177h157.4c.38 0 .76 0 1.12.076 4.09.53 6.96 4.367 6.89 8.558h.02Z" />
                <path id="Vector_2" d="M1455.89 133.197c-.07 4.494-3.84 8.18-8.35 8.18h-86.04c-5.63 0-10.35-4.62-10.35-10.25 0-25.372-8.69-37.717-26.46-37.717-17.77 0-29.24 11.032-29.56 30.295-.38 21.484 11.63 40.999 45.87 74.551 45.06 42.716 63.11 80.56 62.25 130.572C1401.84 409.716 1347.41 462 1264.6 462c-42.28 0-74.6-11.436-96.08-33.981-21.81-22.898-31.81-56.5-29.72-99.873.1-4.494 3.84-8.154 8.36-8.154h88.99c2.43 0 4.82 1.186 6.44 3.206 1.39 1.742 1.97 3.888 1.62 5.908-.99 15.652 1.71 27.341 7.8 33.804 3.91 4.191 9.34 6.311 16.13 6.311 16.43 0 26.08-11.739 26.43-32.188.3-17.672-5.22-33.173-35.37-64.503-38.93-38.45-73.84-78.162-72.76-140.62.63-36.203 14.87-69.325 40.09-93.258C1253.19 13.354 1289.67 0 1332.01 0c42.41.303 74.55 12.522 95.53 36.329 19.87 22.57 29.44 55.162 28.38 96.868h-.03Z" />
              </g>
            </g>
            <g id="Mark">
              <path className="webflow" id="Webflow mark" fill="#146EF5" fillRule="evenodd" d="M721.406 5 491.215 455H275l96.335-186.499h-4.323C287.537 371.671 168.958 439.588 0 455V271.082s108.086-6.384 171.627-73.188H0V5.004h192.89v158.649l4.33-.018L276.041 5.004h145.878v157.643l4.33-.007L508.028 5h213.378Z" clipRule="evenodd" />
            </g>
            <g id="Group 48096699" stroke="#fff" className="cross inside" strokeWidth="11.985">
              <path id="Vector 1791" d="M747.005 5v450" />
              <path id="Vector 1792" d="M972 230H522" />
            </g>
          </g>
        </g>
        <g className="right">
          <g id="Group 48096703">
            <g id="Logo_2">
              <g id="Logo_2" fill="#0AE448" className="gsap">
                <path id="Vector_6" d="M3412.85 215.776v.202l-16.38 71.85c-.89 4.064-4.9 7.043-9.54 7.043h-19.77c-1.47 0-2.78.985-3.18 2.399-18.26 62.584-42.97 105.603-75.61 131.43-27.78 21.989-62.01 32.239-107.73 32.239-41.1 0-68.79-13.355-92.3-39.712-31.05-34.839-43.9-91.87-36.12-160.589 14.03-129.007 80.23-259.174 207.74-259.174 38.78-.354 69.23 11.739 90.41 35.874 22.39 25.524 33.78 63.973 33.83 114.288-.08 4.57-3.84 8.256-8.36 8.256h-93.41c-3.3 0-6.26-3.005-6.21-6.312-.76-34.789-10.98-51.754-31.28-51.754-35.8 0-56.93 49.129-68.14 76.369-15.65 38.045-23.6 79.348-22.04 120.499.74 19.161 3.79 46.099 21.79 57.257 15.96 9.897 38.73 3.333 52.51-7.624 13.79-10.957 24.87-29.916 29.54-47.21.66-2.398.71-4.266.08-5.099-.66-.859-2.48-1.061-3.87-1.061h-23.98c-2.58 0-5.13-1.186-6.67-3.105-1.28-1.616-1.79-3.61-1.33-5.579l16.41-71.976c.8-3.686 4.11-6.463 8.18-6.968v-.177h157.4c.38 0 .76 0 1.12.076 4.09.53 6.96 4.367 6.89 8.558h.02Z" />
                <path id="Vector_7" d="M3683.89 133.197c-.07 4.494-3.84 8.18-8.35 8.18h-86.04c-5.63 0-10.35-4.62-10.35-10.25 0-25.372-8.69-37.717-26.46-37.717-17.77 0-29.24 11.032-29.56 30.295-.38 21.484 11.63 40.999 45.87 74.551 45.06 42.716 63.11 80.56 62.25 130.572C3629.84 409.716 3575.41 462 3492.6 462c-42.28 0-74.6-11.436-96.08-33.981-21.81-22.898-31.81-56.5-29.72-99.873.1-4.494 3.84-8.154 8.36-8.154h88.99c2.43 0 4.82 1.186 6.44 3.206 1.39 1.742 1.97 3.888 1.62 5.908-.99 15.652 1.71 27.341 7.8 33.804 3.91 4.191 9.34 6.311 16.13 6.311 16.43 0 26.08-11.739 26.43-32.188.3-17.672-5.22-33.173-35.37-64.503-38.93-38.45-73.84-78.162-72.76-140.62.63-36.203 14.87-69.325 40.09-93.258C3481.19 13.354 3517.67 0 3560.01 0c42.41.303 74.55 12.522 95.53 36.329 19.87 22.57 29.44 55.162 28.38 96.868h-.03Z" />
              </g>
            </g>
            <g id="Mark_2">
              <path className="webflow" id="Webflow mark_2" fill="#146EF5" fillRule="evenodd" d="m2939.41 5-230.19 450H2493l96.33-186.499h-4.32C2505.54 371.671 2386.96 439.588 2218 455V271.082s108.09-6.384 171.63-73.188H2218V5.004h192.89v158.649l4.33-.018 78.82-158.631h145.88v157.643l4.33-.007L2726.03 5h213.38Z" clipRule="evenodd" />
            </g>
            <g id="Group 48096699_2" stroke="#fff" className="cross inside" strokeWidth="11.985">
              <path id="Vector 1791_2" d="M2965 5v450" />
              <path id="Vector 1792_2" d="M3190 230h-450" />
            </g>
          </g>
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