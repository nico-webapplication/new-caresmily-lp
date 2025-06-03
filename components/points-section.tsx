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
  const wheelchairRef = useRef<HTMLDivElement>(null);
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
        const cards = pointsRef.current.querySelectorAll(".point-card");
        gsap.set(cards, { opacity: 0, x: -50 });

        ScrollTrigger.create({
          trigger: pointsRef.current,
          start: "top 80%",
          scroller: scroller || undefined,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            });
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

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-[#a8e0ff] overflow-hidden relative"
    >

      {/* 流れるCARESMILYテキスト - 左側 */}
      <div className="absolute left-16 top-0 h-full overflow-hidden opacity-20 z-5">
        <div className="animate-marquee-vertical text-8xl lg:text-9xl xl:text-[10rem] font-black text-white writing-mode-vertical flex flex-col">
          {("CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY " + 
            "CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY").split("").map((char, index) => (
            <span key={index} className="block leading-none">
              {char === " " ? "　" : char}
            </span>
          ))}
          {("CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY " + 
            "CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY").split("").map((char, index) => (
            <span key={`duplicate-left-${index}`} className="block leading-none">
              {char === " " ? "　" : char}
            </span>
          ))}
        </div>
      </div>

      {/* 流れるCARESMILYテキスト - 右側 */}
      <div className="absolute right-16 top-0 h-full overflow-hidden opacity-20 z-5">
        <div className="animate-marquee-vertical-reverse text-8xl lg:text-9xl xl:text-[10rem] font-black text-white writing-mode-vertical flex flex-col">
          {("CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY " + 
            "CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY").split("").map((char, index) => (
            <span key={index} className="block leading-none">
              {char === " " ? "　" : char}
            </span>
          ))}
          {("CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY " + 
            "CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY").split("").map((char, index) => (
            <span key={`duplicate-right-${index}`} className="block leading-none">
              {char === " " ? "　" : char}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-5 relative z-10">
        {/* 横並びレイアウト：ポイントカードとタイトル */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[140px]">
          <div ref={pointsRef} className="max-w-4xl space-y-4">
            {/* ポイント1 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-40">
              <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">01</span>
                  <span className="ml-3 text-yellow-400 italic font-light rotate-6 text-base">
                    Expert Database!
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-1 cursor-pointer hover:text-[#42a5d5] transition-colors">
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
                                高品質な専門家監修文例
                              </div>
                            </div>
                          </div>

                          <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                            <Image
                              src="/images/database-icon.png"
                              alt="データベース"
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
            </div>

            {/* ポイント2 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-40">
              <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">02</span>
                  <span className="ml-3 text-yellow-400 italic font-light rotate-6 text-base">
                    Quick Copy & Paste!
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-1 cursor-pointer hover:text-[#42a5d5] transition-colors">
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
            </div>

            {/* ポイント3 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-40">
              <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">03</span>
                  <span className="ml-3 text-yellow-400 italic font-light rotate-6 text-base">
                    Smart Suggestions!
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-1 cursor-pointer hover:text-[#42a5d5] transition-colors">
                      書類種類に応じた
                      <br />
                      おすすめ文例の自動表示
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
                              書類種類に応じたおすすめ文例の自動表示
                            </DialogTitle>
                          </div>
                        </DialogHeader>

                        <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                          <div>
                            <DialogDescription className="text-base text-gray-600 leading-relaxed">
                              利用者さんの基本情報・介護度・サービス内容に基づき、その方に最適な文例を優先表示。検索に悩む時間を削減し、適切な表現を素早く見つけられます。
                            </DialogDescription>
                            <div className="mt-4 flex justify-end">
                              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                                <span className="font-bold">POINT:</span>{" "}
                                個別最適化された提案
                              </div>
                            </div>
                          </div>

                          <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                            <Image
                              src="/images/suggestion-icon.png"
                              alt="おすすめ文例"
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
            </div>

            {/* ポイント4 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg flex-row-reverse h-40">
              <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">04</span>
                  <span className="ml-3 text-yellow-400 italic font-light rotate-6 text-base">
                    Team Sync!
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-1 cursor-pointer hover:text-[#42a5d5] transition-colors">
                      チーム全体での共有・連携が
                      <br />
                      スムーズに
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
                              チーム全体での共有・連携がスムーズに
                            </DialogTitle>
                          </div>
                        </DialogHeader>

                        <div className="mt-6 grid sm:grid-cols-[1fr_200px] gap-6 items-start">
                          <div>
                            <DialogDescription className="text-base text-gray-600 leading-relaxed">
                              作成した書類や利用者情報をクラウドで一元管理。権限設定により、必要なメンバーが必要な情報にアクセス可能。情報共有の遅れや重複作業を防ぎます。
                            </DialogDescription>
                            <div className="mt-4 flex justify-end">
                              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm font-medium">
                                <span className="font-bold">POINT:</span>{" "}
                                チーム連携の効率化
                              </div>
                            </div>
                          </div>

                          <div className="relative h-[200px] bg-[#42a5d5]/10 rounded-lg flex items-center justify-center p-4">
                            <Image
                              src="/images/team-collaboration-icon.png"
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
            </div>

            {/* ポイント5 */}
            <div className="point-card bg-white rounded-full flex overflow-hidden shadow-lg h-40">
              <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-[#42a5d5]">05</span>
                  <span className="ml-3 text-yellow-400 italic font-light rotate-6 text-base">
                    Easy Access!
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a2540] mb-1 cursor-pointer hover:text-[#42a5d5] transition-colors">
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
            </div>
          </div>

          {/* 右側：タイトルセクション */}
          <div className="relative flex justify-center lg:justify-start">
            <div 
              ref={titleRef}
              className="text-white text-center lg:text-left"
            >
              <h2 className="text-6xl lg:text-8xl font-black mb-4 leading-tight">
                5Points
              </h2>
              <h3 className="text-xl lg:text-2xl font-medium mb-6 opacity-90">
                5つのポイント
              </h3>
              <p className="text-lg opacity-80 leading-relaxed">
                CareSmilyの<br />
                5つのポイントをご紹介
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}