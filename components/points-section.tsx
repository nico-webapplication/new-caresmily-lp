"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// useScrollTriggerを使用する部分を修正
export default function PointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const rightBorderRef = useRef<HTMLDivElement>(null);
  const wheelchairRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    // GSAPプラグインを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      // タイトルのアニメーション
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: -30 });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          scroller: scroller || undefined,
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // ポイントカードのアニメーション
      if (pointsRef.current) {
        const points = pointsRef.current.querySelectorAll(".point-card");

        gsap.set(points, { opacity: 0, y: 50 });

        ScrollTrigger.batch(points, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          start: "top 80%",
          scroller: scroller || undefined,
        });
      }

      // 左右の縁の文字アニメーション - 下から上へ流す
      if (leftBorderRef.current && rightBorderRef.current) {
        // 左側の文字コンテナ
        const leftContainer = leftBorderRef.current.querySelector(
          ".text-loop-container",
        );

        if (leftContainer) {
          // コンテナ内の高さを取得するために一時的に表示
          gsap.set(leftContainer, { visibility: "visible" });

          // 最初のコンテナを一番下に配置して、クローンを作成
          const leftContainerHeight = leftBorderRef.current.clientHeight;
          const leftContentHeight = leftContainer.scrollHeight / 2; // 実際のコンテンツの高さ（重複を考慮）

          // 開始位置を設定（一番下から始まる）
          gsap.set(leftContainer, { y: 0 });

          // 下から上に流す無限ループアニメーション - 途切れないよう調整
          gsap.to(leftContainer, {
            y: -leftContentHeight,
            repeat: -1,
            duration: 30,
            ease: "linear",
            repeatDelay: 0, // 繰り返し時の遅延なし
          });
        }

        // 右側の文字コンテナ
        const rightContainer = rightBorderRef.current.querySelector(
          ".text-loop-container",
        );

        if (rightContainer) {
          // コンテナ内の高さを取得するために一時的に表示
          gsap.set(rightContainer, { visibility: "visible" });

          // 最初のコンテナを一番下に配置して、クローンを作成
          const rightContainerHeight = rightBorderRef.current.clientHeight;
          const rightContentHeight = rightContainer.scrollHeight / 2; // 実際のコンテンツの高さ（重複を考慮）

          // 開始位置を設定（一番下から始まる）
          gsap.set(rightContainer, { y: 0 });

          // 下から上に流す無限ループアニメーション - 途切れないよう調整
          gsap.to(rightContainer, {
            y: -rightContentHeight,
            repeat: -1,
            duration: 30,
            ease: "linear",
            repeatDelay: 0, // 繰り返し時の遅延なし
          });
        }

        // 機能カードのアニメーション
        const leftCards = leftBorderRef.current.querySelectorAll(".bg-white");
        const rightCards = rightBorderRef.current.querySelectorAll(".bg-white");

        if (leftCards.length > 0) {
          // 左側のカードを順次表示
          gsap.set(leftCards, { opacity: 0, x: -50 });
          gsap.to(leftCards, {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          });
        }

        if (rightCards.length > 0) {
          // 右側のカードを順次表示
          gsap.set(rightCards, { opacity: 0, x: 50 });
          gsap.to(rightCards, {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.5,
          });
        }
      }

      // 車いすのスクロールアニメーション
      if (wheelchairRef.current && svgPathRef.current && sectionRef.current) {
        // 車いすの初期設定
        gsap.set(wheelchairRef.current, {
          opacity: 0.95,
          scale: 0.8,
          transformOrigin: "50% 50%",
        });

        // 車いすの回転を制御する関数
        let prevDirection = 0;
        const rotateTo = gsap.quickTo(wheelchairRef.current, "rotation");

        // スクロールに連動した車いすのアニメーション
        gsap.to(wheelchairRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            scroller: scroller || undefined,
            onUpdate: (self) => {
              if (prevDirection !== self.direction) {
                // 方向が変わったときだけ実行
                rotateTo(self.direction === 1 ? 0 : -180);
                prevDirection = self.direction;
              }
            },
          },
          ease: "none",
          immediateRender: true,
          motionPath: {
            path: svgPathRef.current,
            align: svgPathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
          },
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        if (wheelchairRef.current) {
          gsap.killTweensOf(wheelchairRef.current);
        }
      };
    }
  }, [scroller]);

  // 縁の中に表示する文字の配列（繰り返し表示用に複数回書く）
  const borderTexts = [
    "CARE",
    "CARING",
    "CAREGIVING",
    "ELDERCARE",
    "DAY-SERVICE",
    "DAY-CARE",
    "RESPITE",
    "WELLBEING",
    "PERSON-CENTERED",
    "DIGNITY",
    "SUPPORT",
    "INDEPENDENCE",
    "QUALITY-OF-LIFE",
    "WORKFLOW",
    "EFFICIENCY",
    "STREAMLINING",
    "TIME-SAVING",
    "PAPERWORK-REDUCTION",
    "TEMPLATE-DRIVEN",
    "DOCUMENTATION",
    "CARE-PLAN",
    "SERVICE-PLAN",
    "TRAINING-PLAN",
    "PROGRESS-NOTE",
    "DAILY-LOG",
    "INCIDENT-REPORT",
    "ASSESSMENT",
    "EVALUATION",
    "INTAKE-FORM",
    "DISCHARGE-SUMMARY",
    "SOAP-NOTE",
    "CHECKLIST",
    "KPI-SHEET",
    "CONSENT-FORM",
    "QUESTIONNAIRE",
    "HANDOVER-SHEET",
    "ROSTER",
    "ATTENDANCE-RECORD",
    "SCHEDULE",
    "REPORT-GENERATOR",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-[#a8e0ff] overflow-hidden relative"
    >
      {/* SVGパス（非表示） */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={svgPathRef}
          d="M90,10 C75,30 25,40 10,50 C25,60 75,70 90,90"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      </svg>

      {/* 車いすのアニメーション - スクロールで動く */}
      <div
        ref={wheelchairRef}
        className="absolute z-0 pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/CareSmily_ロゴ.png"
            alt="ロゴ"
            fill
            style={{ objectFit: "contain" }}
          />
          {/* 車いすの影 */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/6 bg-black opacity-20 rounded-full blur-md"
            style={{ filter: "blur(8px)" }}
          ></div>
        </div>
      </div>

      {/* 上部の縁 */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#0a2540] z-10"></div>

      {/* 下部の縁 */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0a2540] z-10"></div>

      {/* 左側の縁 - 機能カードを表示 */}
      <div
        ref={leftBorderRef}
        className="absolute left-0 top-4 bottom-4 w-80 bg-[#0a2540] overflow-hidden z-10"
      >
        {/* 左半分にテキストループ */}
        <div className="text-loop-container absolute left-2 w-8 visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`left-${index}`}
              className="text-white text-xs font-bold py-2 text-center writing-vertical"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {text}
            </div>
          ))}
        </div>
        
        {/* 右半分に機能カード */}
        <div className="absolute left-12 top-0 w-64 h-full flex flex-col justify-center space-y-6 p-4">
          {/* カード1 */}
          <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-[#42a5d5]">01</span>
              <span className="ml-2 text-yellow-400 italic text-xs">Expert Database!</span>
            </div>
            <h4 className="text-sm font-bold text-[#0a2540] leading-tight">
              10万件超の専門家監修<br />文例データベース
            </h4>
            <div className="mt-2 flex justify-end">
              <div className="w-8 h-8 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#42a5d5] rounded text-white text-xs flex items-center justify-center">✓</div>
              </div>
            </div>
          </div>

          {/* カード2 */}
          <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-[#42a5d5]">02</span>
              <span className="ml-2 text-yellow-400 italic text-xs">Quick Copy & Paste!</span>
            </div>
            <h4 className="text-sm font-bold text-[#0a2540] leading-tight">
              検索・カテゴリ選択 →<br />コピー&ペーストで瞬時作成
            </h4>
            <div className="mt-2 flex justify-end">
              <div className="w-8 h-8 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#42a5d5] rounded text-white text-xs flex items-center justify-center">🔍</div>
              </div>
            </div>
          </div>

          {/* カード3 */}
          <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-[#42a5d5]">03</span>
              <span className="ml-2 text-yellow-400 italic text-xs">Guided Builder!</span>
            </div>
            <h4 className="text-sm font-bold text-[#0a2540] leading-tight">
              質問形式ビルダーによる<br />レコメンド挿入
            </h4>
            <div className="mt-2 flex justify-end">
              <div className="w-8 h-8 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#42a5d5] rounded text-white text-xs flex items-center justify-center">?</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右側の縁 - 機能カードを表示 */}
      <div
        ref={rightBorderRef}
        className="absolute right-0 top-4 bottom-4 w-80 bg-[#0a2540] overflow-hidden z-10"
      >
        {/* 右半分にテキストループ */}
        <div className="text-loop-container absolute right-2 w-8 visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`right-${index}`}
              className="text-white text-xs font-bold py-2 text-center writing-vertical"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {text}
            </div>
          ))}
        </div>
        
        {/* 左半分に機能カード */}
        <div className="absolute left-4 top-0 w-64 h-full flex flex-col justify-center space-y-8 p-4">
          {/* カード4 */}
          <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-[#42a5d5]">04</span>
              <span className="ml-2 text-yellow-400 italic text-xs">All-in-One Solution!</span>
            </div>
            <h4 className="text-sm font-bold text-[#0a2540] leading-tight">
              書類テンプレ内での編集・<br />PDF/印刷までワンストップ
            </h4>
            <div className="mt-2 flex justify-end">
              <div className="w-8 h-8 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#42a5d5] rounded text-white text-xs flex items-center justify-center">📄</div>
              </div>
            </div>
          </div>

          {/* カード5 */}
          <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-[#42a5d5]">05</span>
              <span className="ml-2 text-yellow-400 italic text-xs">Cloud Access!</span>
            </div>
            <h4 className="text-sm font-bold text-[#0a2540] leading-tight">
              簡単にアクセス可能で<br />シンプルなアプリケーション
            </h4>
            <div className="mt-2 flex justify-end">
              <div className="w-8 h-8 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#42a5d5] rounded text-white text-xs flex items-center justify-center">☁</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-80 md:px-96 py-16 relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-bold text-[#0a2540]">
            <span className="inline-block text-3xl md:text-4xl font-normal mb-4">
              <div className="relative h-16 w-64 mx-auto">
                <Image
                  src="/images/caresmily-logo.png"
                  alt="CareSmily Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </span>
            <br />
            <span className="inline-block">5つのポイント</span>
          </h2>
        </div>

        <div ref={pointsRef} className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-8">
              CareSmily の特徴
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              介護現場の書類作成を劇的に効率化する、5つの革新的な機能をご紹介します。
              左右のパネルをご覧ください。
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#42a5d5]">効率性の向上</h4>
                <p className="text-gray-600">
                  文例データベースとコピー&ペースト機能により、書類作成時間を最大60%削減
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#42a5d5]">品質の保証</h4>
                <p className="text-gray-600">
                  専門家監修の文例と質問形式ビルダーで、新人でもプロ水準の記録が作成可能
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#42a5d5]">ワンストップ対応</h4>
                <p className="text-gray-600">
                  編集からPDF出力・印刷まで、すべてアプリ内で完結
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#42a5d5]">簡単アクセス</h4>
                <p className="text-gray-600">
                  ブラウザからログインするだけ。インストールや複雑な設定は不要
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
