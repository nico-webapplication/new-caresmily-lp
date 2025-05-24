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
            src="/images/wheelchair_no_background.png"
            alt="車いす"
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

      {/* 左側の縁 */}
      <div
        ref={leftBorderRef}
        className="absolute left-0 top-4 bottom-4 w-12 bg-[#0a2540] overflow-hidden z-10"
      >
        <div className="text-loop-container absolute left-5 w-8 visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`left-${index}`}
              className="text-white text-sm md:text-base font-bold py-3 text-center writing-vertical"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* 右側の縁 */}
      <div
        ref={rightBorderRef}
        className="absolute right-0 top-4 bottom-4 w-12 bg-[#0a2540] overflow-hidden z-10"
      >
        <div className="text-loop-container absolute left-0 w-full visibility-hidden">
          {borderTexts.map((text, index) => (
            <div
              key={`right-${index}`}
              className="text-white text-base md:text-lg font-bold py-3 text-center writing-vertical"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-12 md:px-16 py-8 relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a2540]">
            <span className="inline-block text-2xl md:text-3xl font-normal mb-2">
              <div className="relative h-12 w-48 mx-auto">
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

        <div ref={pointsRef} className="max-w-4xl mx-auto space-y-12">
          {/* ポイント1 */}
          <div className="point-card bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row overflow-hidden shadow-lg min-h-64 md:h-64">
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#42a5d5] mb-2 sm:mb-0">01</span>
                <span className="sm:ml-6 text-yellow-400 italic font-light rotate-0 sm:rotate-6 text-lg sm:text-xl">
                  Expert Database!
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0a2540] mb-3 cursor-pointer hover:text-[#42a5d5] transition-colors leading-tight">
                    10万件超の専門家監修
                    <br />
                    "文例データベース"
                  </h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#42a5d5] to-[#007aff] p-1">
                    <div className="bg-white p-6 sm:p-8">
                      <DialogHeader className="pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#42a5d5]/20">
                            <span className="text-3xl font-bold text-[#42a5d5]">
                              01
                            </span>
                          </div>
                          <DialogTitle className="text-3xl font-bold text-[#0a2540]">
                            10万件超の専門家監修文例データベース
                          </DialogTitle>
                        </div>
                      </DialogHeader>

                      <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                        <div>
                          <DialogDescription className="text-base text-gray-600 leading-relaxed">
                            AI自動生成ではなく、法令・現場ニュアンスを踏まえた高品質文例を事前収録。デイサービス／訪問介護／ケアマネ業務など主要書類を網羅し、常に最新データへ更新される仕組みを採用しています。
                          </DialogDescription>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span>{" "}
                              法令に準拠した高品質文例が常に最新状態で利用可能
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/database-100k-icon.png"
                            alt="10万件超の専門家監修文例データベース"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative w-full md:w-36 lg:w-72 h-32 md:h-auto bg-[#42a5d5]/20 rounded-b-2xl md:rounded-none md:rounded-r-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-3/5 md:w-4/5 h-3/5 md:h-4/5 flex items-center justify-center">
                  <Image
                    src="/images/database-100k-icon.png"
                    alt="10万件超の専門家監修文例データベース"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ポイント2 */}
          <div className="point-card bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row-reverse overflow-hidden shadow-lg min-h-64 md:h-64">
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#42a5d5] mb-2 sm:mb-0">02</span>
                <span className="sm:ml-6 text-yellow-400 italic font-light rotate-0 sm:rotate-6 text-lg sm:text-xl">
                  Quick Copy & Paste!
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0a2540] mb-3 cursor-pointer hover:text-[#42a5d5] transition-colors leading-tight">
                    検索・カテゴリ選択 →
                    <br />
                    コピー＆ペーストで瞬時作成
                  </h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#42a5d5] to-[#007aff] p-1">
                    <div className="bg-white p-6 sm:p-8">
                      <DialogHeader className="pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#42a5d5]/20">
                            <span className="text-3xl font-bold text-[#42a5d5]">
                              02
                            </span>
                          </div>
                          <DialogTitle className="text-3xl font-bold text-[#0a2540]">
                            検索・カテゴリ選択 → コピー＆ペーストで瞬時作成
                          </DialogTitle>
                        </div>
                      </DialogHeader>

                      <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                        <div>
                          <DialogDescription className="text-base text-gray-600 leading-relaxed">
                            書類種類を選んでからキーワード検索・分類フィルタで欲しい表現を絞り込み、そのままコピペ。文章を一から考える作業を大幅に省き、書類作成時間を最大60%削減します。
                          </DialogDescription>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span>{" "}
                              書類作成時間を最大60%削減
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/search-document-icon.png"
                            alt="検索・カテゴリ選択"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative w-full md:w-36 lg:w-72 h-32 md:h-auto bg-[#42a5d5]/20 rounded-t-2xl md:rounded-none md:rounded-l-full flex items-center justify-center order-first md:order-last">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-3/5 md:w-4/5 h-3/5 md:h-4/5 flex items-center justify-center">
                  <Image
                    src="/images/search-document-icon.png"
                    alt="検索・カテゴリ選択"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ポイント3 */}
          <div className="point-card bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row overflow-hidden shadow-lg min-h-64 md:h-64">
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#42a5d5] mb-2 sm:mb-0">03</span>
                <span className="sm:ml-6 text-yellow-400 italic font-light rotate-0 sm:rotate-6 text-lg sm:text-xl">
                  Guided Builder!
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0a2540] mb-3 cursor-pointer hover:text-[#42a5d5] transition-colors leading-tight">
                    "質問形式ビルダー"による
                    <br />
                    レコメンド挿入
                  </h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#42a5d5] to-[#007aff] p-1">
                    <div className="bg-white p-6 sm:p-8">
                      <DialogHeader className="pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#42a5d5]/20">
                            <span className="text-3xl font-bold text-[#42a5d5]">
                              03
                            </span>
                          </div>
                          <DialogTitle className="text-3xl font-bold text-[#0a2540]">
                            "質問形式ビルダー"によるレコメンド挿入
                          </DialogTitle>
                        </div>
                      </DialogHeader>

                      <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                        <div>
                          <DialogDescription className="text-base text-gray-600 leading-relaxed">
                            利用者の身体状況や目標をQ&A方式で入力すると、条件に合った文例が自動提案されるガイド機能を搭載。記入漏れや表現ブレを防ぎ、新人でもプロ水準の書類を短時間で完成できます。
                          </DialogDescription>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span>{" "}
                              新人でもプロ水準の記録が作成可能
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/qa-form-icon.png"
                            alt="質問形式ビルダー"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative w-full md:w-36 lg:w-72 h-32 md:h-auto bg-[#42a5d5]/20 rounded-b-2xl md:rounded-none md:rounded-r-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-3/5 md:w-4/5 h-3/5 md:h-4/5 flex items-center justify-center">
                  <Image
                    src="/images/qa-form-icon.png"
                    alt="質問形式ビルダー"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ポイント4 */}
          <div className="point-card bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row-reverse overflow-hidden shadow-lg min-h-64 md:h-64">
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#42a5d5] mb-2 sm:mb-0">04</span>
                <span className="sm:ml-6 text-yellow-400 italic font-light rotate-0 sm:rotate-6 text-lg sm:text-xl">
                  All-in-One Solution!
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0a2540] mb-3 cursor-pointer hover:text-[#42a5d5] transition-colors leading-tight">
                    書類テンプレ内での編集・
                    <br />
                    PDF／印刷までワンストップ
                  </h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#42a5d5] to-[#007aff] p-1">
                    <div className="bg-white p-6 sm:p-8">
                      <DialogHeader className="pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#42a5d5]/20">
                            <span className="text-3xl font-bold text-[#42a5d5]">
                              04
                            </span>
                          </div>
                          <DialogTitle className="text-3xl font-bold text-[#0a2540]">
                            書類テンプレ内での編集・PDF／印刷までワンストップ
                          </DialogTitle>
                        </div>
                      </DialogHeader>

                      <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                        <div>
                          <DialogDescription className="text-base text-gray-600 leading-relaxed">
                            文例を差し込んだ後はアプリ内フォーマット上で微調整し、そのままPDF出力・印刷が可能。外部ソフトに書き出す手間なく、その場で紙提出用データまで完結します。
                          </DialogDescription>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span>{" "}
                              編集からPDF出力・印刷まで一貫して対応
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/document-pdf-print-icon.png"
                            alt="書類テンプレート内での編集"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative w-full md:w-36 lg:w-72 h-32 md:h-auto bg-[#42a5d5]/20 rounded-t-2xl md:rounded-none md:rounded-l-full flex items-center justify-center order-first md:order-last">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-3/5 md:w-4/5 h-3/5 md:h-4/5 flex items-center justify-center">
                  <Image
                    src="/images/document-pdf-print-icon.png"
                    alt="書類テンプレート内での編集"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ポイント5 */}
          <div className="point-card bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row overflow-hidden shadow-lg min-h-64 md:h-64">
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#42a5d5] mb-2 sm:mb-0">05</span>
                <span className="sm:ml-6 text-yellow-400 italic font-light rotate-0 sm:rotate-6 text-lg sm:text-xl">
                  Cloud Access!
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0a2540] mb-3 cursor-pointer hover:text-[#42a5d5] transition-colors leading-tight">
                     簡単にアクセス可能で
                    <br />
                    シンプルなアプリケーション
                  </h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#42a5d5] to-[#007aff] p-1">
                    <div className="bg-white p-6 sm:p-8">
                      <DialogHeader className="pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#42a5d5]/20">
                            <span className="text-3xl font-bold text-[#42a5d5]">
                              05
                            </span>
                          </div>
                          <DialogTitle className="text-3xl font-bold text-[#0a2540]">
                            簡単にアクセス可能でシンプルなアプリケーション
                          </DialogTitle>
                        </div>
                      </DialogHeader>

                      <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                        <div>
                          <DialogDescription className="text-base text-gray-600 leading-relaxed">
                            PCからブラウザでログインするだけ。インストールや複雑な設定は不要です。
                            PCが不慣れな方でも使いやすいアプリケーションとなっております。
                          </DialogDescription>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span>{" "}
                              誰でも簡単利用
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/cloud-computer-icon.png"
                            alt="チーム共有"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative w-full md:w-36 lg:w-72 h-32 md:h-auto bg-[#42a5d5]/20 rounded-b-2xl md:rounded-none md:rounded-r-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-3/5 md:w-4/5 h-3/5 md:h-4/5 flex items-center justify-center">
                  <Image
                    src="/images/cloud-computer-icon.png"
                    alt="チーム共有"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
