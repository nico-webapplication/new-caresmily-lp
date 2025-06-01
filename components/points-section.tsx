"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
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

export default function PointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const rightBorderRef = useRef<HTMLDivElement>(null);
  const wheelchairRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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

      if (pointsRef.current) {
        const cards = pointsRef.current.querySelectorAll(".point-card");
        
        cards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, x: -50 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            scroller: scroller || undefined,
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.2,
                ease: "power2.out",
              });
            },
          });
        });
      }
    }
  }, [scroller]);

  const borderText = [
    "DATABASE",
    "QUESTIONS",
    "TEMPLATES",
    "CATEGORIES",
    "RECORDS",
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
          strokeWidth="2"
        />
      </svg>

      {/* 流れるCARESMILYテキスト - 上部 */}
      <div className="absolute top-8 left-0 w-full overflow-hidden opacity-20">
        <div className="animate-marquee whitespace-nowrap text-6xl lg:text-7xl font-black text-white">
          CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY
        </div>
      </div>

      {/* 流れるCARESMILYテキスト - 下部 */}
      <div className="absolute bottom-8 left-0 w-full overflow-hidden opacity-20">
        <div className="animate-marquee-reverse whitespace-nowrap text-6xl lg:text-7xl font-black text-white">
          CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY
        </div>
      </div>

      {/* 左ボーダーのテキスト */}
      <div ref={leftBorderRef} className="absolute left-0 top-0 h-full w-20 flex flex-col justify-center items-center z-10">
        {borderText.map((text, index) => (
          <div
            key={`left-${index}`}
            className="text-white text-xs font-bold opacity-30 mb-8 whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* 右ボーダーのテキスト */}
      <div ref={rightBorderRef} className="absolute right-0 top-0 h-full w-20 flex flex-col justify-center items-center z-10">
        {borderText.map((text, index) => (
          <div
            key={`right-${index}`}
            className="text-white text-xs font-bold opacity-30 mb-8 whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-8 md:px-20 py-16 relative z-10">
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

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* 左側：ポイントカード */}
          <div ref={pointsRef} className="lg:w-1/2 space-y-8">
            {/* ポイント1 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-32">
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">01</span>
                  <span className="ml-4 text-yellow-400 italic font-light rotate-6 text-sm">
                    Expert Database!
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-1">
                  10万件超の専門家監修文例データベース
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  理学療法士・作業療法士・言語聴覚士・社会福祉士等の専門職が監修した質の高い文例データベースから検索・選択が可能。
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-2 text-[#42a5d5] hover:text-[#3694c4] text-sm font-medium underline">
                      詳細を見る
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#0a2540] mb-2">
                        01. 10万件超の専門家監修文例データベース
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            理学療法士・作業療法士・言語聴覚士・社会福祉士等の専門職が監修した質の高い文例データベースから検索・選択が可能。医学的根拠に基づいた正確な表現で記録を作成できます。
                          </p>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span> 専門職監修による質の高い文例
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                      
                      <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                        <Image
                          src="/images/database-100k-icon.png"
                          alt="10万件超の専門家監修文例データベース"
                          width={150}
                          height={150}
                          className="object-contain"
                        />
                      </div>
                    </DialogHeader>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">閉じる</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative w-24 md:w-32 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/database-100k-icon.png"
                  alt="10万件超の専門家監修文例データベース"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ポイント2 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-32">
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2 justify-end">
                  <span className="mr-4 text-yellow-400 italic font-light rotate-6 text-sm">
                    Easy Questions!
                  </span>
                  <span className="text-3xl font-bold text-[#42a5d5]">02</span>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-1 text-right">
                  質問形式ビルダー
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm text-right">
                  簡単な質問に答えるだけで、適切な文例が自動選択されます。専門知識がなくても安心。
                </p>
                
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="mt-2 text-[#42a5d5] hover:text-[#3694c4] text-sm font-medium underline">
                        詳細を見る
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#0a2540] mb-2">
                          02. 質問形式ビルダー
                        </DialogTitle>
                        <DialogDescription asChild>
                          <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              簡単な質問に答えるだけで、適切な文例が自動選択されます。専門知識がなくても安心して質の高い記録を作成できます。新人でもプロ水準の記録が作成可能です。
                            </p>
                            <div className="mt-4 flex justify-end">
                              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                                <span className="font-bold">POINT:</span> 新人でもプロ水準の記録が作成可能
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                        
                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/qa-form-icon.png"
                            alt="質問形式ビルダー"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </DialogHeader>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="relative w-24 md:w-32 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/qa-form-icon.png"
                  alt="質問形式ビルダー"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ポイント3 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-32">
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">03</span>
                  <span className="ml-4 text-yellow-400 italic font-light rotate-6 text-sm">
                    Smart Search!
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-1">
                  検索・カテゴリ選択
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  キーワード検索やカテゴリ選択で、目的に応じた文例を素早く見つけることができます。
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-2 text-[#42a5d5] hover:text-[#3694c4] text-sm font-medium underline">
                      詳細を見る
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#0a2540] mb-2">
                        03. 検索・カテゴリ選択
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            キーワード検索やカテゴリ選択で、目的に応じた文例を素早く見つけることができます。効率的な検索機能により、必要な文例をすぐに特定できます。
                          </p>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span> 効率的な検索で素早く文例を発見
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                      
                      <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                        <Image
                          src="/images/search-document-icon.png"
                          alt="検索・カテゴリ選択"
                          width={150}
                          height={150}
                          className="object-contain"
                        />
                      </div>
                    </DialogHeader>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">閉じる</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative w-24 md:w-32 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/search-document-icon.png"
                  alt="検索・カテゴリ選択"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ポイント4 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-32">
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2 justify-end">
                  <span className="mr-4 text-yellow-400 italic font-light rotate-6 text-sm">
                    Templates!
                  </span>
                  <span className="text-3xl font-bold text-[#42a5d5]">04</span>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-1 text-right">
                  豊富なテンプレート
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm text-right">
                  様々な業務に対応したテンプレートを用意。効率的な文書作成をサポート。
                </p>
                
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="mt-2 text-[#42a5d5] hover:text-[#3694c4] text-sm font-medium underline">
                        詳細を見る
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#0a2540] mb-2">
                          04. 豊富なテンプレート
                        </DialogTitle>
                        <DialogDescription asChild>
                          <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              様々な業務に対応したテンプレートを豊富に用意。効率的な文書作成をサポートし、統一感のある記録を作成できます。
                            </p>
                            <div className="mt-4 flex justify-end">
                              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                                <span className="font-bold">POINT:</span> 業務に応じた多様なテンプレート
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                        
                        <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                          <Image
                            src="/images/template-icon.png"
                            alt="豊富なテンプレート"
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </DialogHeader>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">閉じる</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="relative w-24 md:w-32 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/template-icon.png"
                  alt="豊富なテンプレート"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ポイント5 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-32">
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">05</span>
                  <span className="ml-4 text-yellow-400 italic font-light rotate-6 text-sm">
                    PDF Export!
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-1">
                  書類テンプレート内での編集
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  文例を差し込んだ後はアプリ内で微調整し、そのままPDF出力・印刷が可能。
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-2 text-[#42a5d5] hover:text-[#3694c4] text-sm font-medium underline">
                      詳細を見る
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#0a2540] mb-2">
                        05. 書類テンプレート内での編集
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            文例を差し込んだ後はアプリ内フォーマット上で微調整し、そのままPDF出力・印刷が可能。外部ソフトに書き出す手間なく、その場で紙提出用データまで完結します。
                          </p>
                          <div className="mt-4 flex justify-end">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                              <span className="font-bold">POINT:</span> 編集からPDF出力・印刷まで一貫して対応
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                      
                      <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                        <Image
                          src="/images/document-pdf-print-icon.png"
                          alt="書類テンプレート内での編集"
                          width={150}
                          height={150}
                          className="object-contain"
                        />
                      </div>
                    </DialogHeader>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">閉じる</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative w-24 md:w-32 bg-[#42a5d5]/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/document-pdf-print-icon.png"
                  alt="書類テンプレート内での編集"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* 右側：Notice セクション */}
          <div className="lg:w-1/2 text-white text-center lg:text-left">
            <h2 className="text-6xl lg:text-8xl font-black mb-4 leading-tight">
              Notice
            </h2>
            <h3 className="text-xl lg:text-2xl font-medium mb-6 opacity-90">
              お知らせ
            </h3>
            <p className="text-lg opacity-80 leading-relaxed">
              CareSmiliyについての<br />
              最新の情報を
              お届けします！
            </p>
          </div>
        </div>

        {/* 車椅子アイコン（動くやつ） */}
        <div
          ref={wheelchairRef}
          className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0"
        >
          <span className="text-2xl">♿</span>
        </div>
      </div>
    </section>
  );
}