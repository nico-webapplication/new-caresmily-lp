"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Youtube } from "lucide-react";
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";

// useScrollTriggerを使用する部分を修正
export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    // ScrollTriggerを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // マーキーアニメーション（右から左へ流れるテキスト）
      if (marqueeRef.current) {
        const marqueeElements =
          marqueeRef.current.querySelectorAll(".marquee-content");

        gsap.to(marqueeElements, {
          xPercent: -100, // 左に100%移動（右から左へ流れる効果）
          repeat: -1, // 無限に繰り返す
          duration: 40, // アニメーションの時間（秒）- ゆっくり流す
          ease: "linear", // 一定速度で移動
        });
      }

      // 画像のアニメーション
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top 80%",
          scroller: scroller || undefined,
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // コンテンツのアニメーション
      if (contentRef.current) {
        const contentElements =
          contentRef.current.querySelectorAll(".animate-item");

        gsap.set(contentElements, { opacity: 0, y: 30 });

        ScrollTrigger.batch(contentElements, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          start: "top 80%",
          scroller: scroller || undefined,
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [scroller]);

  return (
    <section
      ref={sectionRef}
      className="py-8 px-4 md:px-6 bg-white overflow-hidden"
    >
      {/* マーキーアニメーション部分 */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden mb-12">
        <div className="flex whitespace-nowrap">
          {/* 2つのコンテンツを並べて無限ループのように見せる */}
          <div className="marquee-content flex-shrink-0">
            <div className="flex items-center">
              {/* 多くのテキストを配置して途切れないようにする */}
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="relative h-24 md:h-32 w-96 md:w-[500px] mr-12"
                >
                  <Image
                    src="/images/what-is-caresmily-tight.png"
                    alt="What is CareSmily?"
                    fill
                    style={{ objectFit: "contain" }}
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-content flex-shrink-0">
            <div className="flex items-center">
              {/* 多くのテキストを配置して途切れないようにする */}
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="relative h-24 md:h-32 w-96 md:w-[500px] mr-12"
                >
                  <Image
                    src="/images/what-is-caresmily-tight.png"
                    alt="What is CareSmily?"
                    fill
                    style={{ objectFit: "contain" }}
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* より大きな破線 */}
        <div className="w-full h-8 border-b-8 border-dashed border-[#0a2540] border-spacing-4"></div>
      </div>

      {/* メインコンテンツ */}
      <div ref={contentRef} className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左側：イラスト */}
          <div ref={imageRef} className="relative animate-item">
            <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg lg:max-w-xl">
                <Image
                  src="/images/care-service-illustration.png"
                  alt="CareSmily サービスイラスト"
                  fill
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-xl"
                  priority
                />
              </div>

              {/* 装飾的な要素 - 背景の円 */}
              <div className="absolute w-[90%] h-[90%] rounded-full bg-sky-100/50 -z-10"></div>

              {/* 装飾的な要素 - 点線の円 */}
              <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-sky-300/50 -z-10 animate-spin-slow"></div>
            </div>
          </div>

          {/* 右側：テキストコンテンツ */}
          <div className="space-y-8 lg:space-y-10">
            <h2 className="flex items-center font-bold text-[#0a2540] animate-item">
              <div className="relative h-16 md:h-24 lg:h-28 w-56 md:w-80 lg:w-96">
                <Image
                  src="/images/caresmily-logo.png"
                  alt="CareSmily"
                  fill
                  style={{ objectFit: "contain" }}
                  className="object-left"
                  priority
                />
              </div>
              <span className="text-3xl md:text-4xl lg:text-5xl ml-2">とは？</span>
            </h2>
            <div className="space-y-10 lg:space-y-12">
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2b4a] animate-item"
                style={{ lineHeight: "1.5em" }}
              >
                介護施設で多くの手間と時間がかかる
                <br className="mb-6" />
                書類作成を効率化するための、
                <br className="mb-6" />
                <span className="relative inline-block">
                  <span className="text-[#1a2b4a]">文例特化型</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 lg:h-4 bg-yellow-300 opacity-80 z-[-1]"></span>
                </span>
                WEBアプリです。
                <br className="mb-6" />
                様々な書類に使用できる豊富な文例を
                <br className="mb-6" />
                ぜひお試しください。
              </p>
            </div>
            <div className="pt-6 lg:pt-8 animate-item">
              <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-lg font-medium text-lg lg:text-xl transition-colors flex items-center shadow-lg"
                onClick={() => {
                  (window.open("https://www.youtube.com/@CareSmily", '_blank'))
                }}
                >
                <Youtube className="w-6 h-6 lg:w-7 lg:h-7 mr-3" />
                詳しい内容を動画でcheck！
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
