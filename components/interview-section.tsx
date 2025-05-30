"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

interface InterviewCard {
  id: number;
  name: string;
  role: string;
  school: string;
  message: string;
  avatar: string;
  isRight?: boolean;
}

const interviewData: InterviewCard[] = [
  {
    id: 1,
    name: "CareSmily",
    role: "株式会社Nico",
    school: "",
    message: "「CareSmily デイサービス」がリリースされました！ぜひお試しください！",
    avatar: "/images/student1.jpg",
    isRight: false
  },
  {
    id: 2,
    name: "CareSmily",
    role: "株式会社Nico",
    school: "",
    message: "CareSmilyについてのプレスリリース①を掲載しました！CareSmilyについての魅力がよくわかる内容となっておりますので是非ご覧ください！詳細は「メディア情報」をCheck！",
    avatar: "/images/student2.jpg",
    isRight: true
  },
  {
    id: 3,
    name: "CareSmily",
    role: "株式会社Nico",
    school: "",
    message: "CareSmilyについてのプレスリリース①を掲載しました！AI時代にCareSmilyが「非AI」であるべき理由とは...詳細は「メディア情報」をCheck！",
    avatar: "/images/student3.jpg",
    isRight: false
  }
];

export default function InterviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!sectionRef.current) return;

    // タイトルのアニメーション
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // カードのアニメーション
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{
        background: "rgb(143 207 234)"
      }}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 流れるCARESMILYテキスト - 上部 */}
      <div className="absolute top-8 left-0 w-full overflow-hidden opacity-20">
        <div className="animate-marquee whitespace-nowrap text-8xl lg:text-9xl font-black text-white">
          CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY
        </div>
      </div>

      {/* 流れるCARESMILYテキスト - 下部 */}
      <div className="absolute bottom-8 left-0 w-full overflow-hidden opacity-20">
        <div className="animate-marquee-reverse whitespace-nowrap text-8xl lg:text-9xl font-black text-white">
          CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY CARESMILY
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* 左側：タイトルセクション */}
          <div 
            ref={titleRef}
            className="lg:w-1/3 text-white text-center lg:text-left"
          >
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

          {/* 右側：スマートフォン風インタビューカード */}
          <div className="lg:w-1/2 relative flex justify-center">
            {/* スマートフォンフレーム */}
            <div className="relative mx-auto max-w-lg">
              {/* スマートフォンの外枠 */}
              <div className="bg-gray-900 rounded-[3rem] p-5 shadow-2xl">
                {/* スマートフォンの画面 */}
                <div className="rounded-[2.5rem] p-6 relative overflow-hidden w-80" style={{ backgroundColor: '#FEF3E2' }}>
                  {/* スマートフォンのノッチ */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-gray-700 rounded-full"></div>
                  
                  {/* スクロール可能なチャット領域 */}
                  <div 
                    className="h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pt-10"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#9CA3AF transparent'
                    }}
                  >
                    <div className="space-y-4 pb-4">
                      {interviewData.map((interview, index) => (
                        <div
                          key={interview.id}
                          ref={(el) => {
                            if (el) cardsRef.current[index] = el;
                          }}
                          className={`flex ${interview.isRight ? 'justify-end' : 'justify-start'} px-2`}
                        >
                          <div 
                            className={`max-w-[85%] ${interview.isRight ? 'order-2' : 'order-1'}`}
                          >
                            {/* チャットボット風のカード */}
                            <div className={`flex gap-2 ${interview.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                              {/* アバター */}
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-orange-300 rounded-full overflow-hidden border border-white shadow-sm">
                                  <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-400"></div>
                                </div>
                              </div>

                              {/* メッセージバブル */}
                              <div className="flex flex-col">
                                {/* 名前とタイトル */}
                                <div className={`text-[10px] text-black-400 mb-1 ${interview.isRight ? 'text-right' : 'text-left'}`}>
                                  <div className="font-bold">{interview.name}</div>
                                  <div className="opacity-70">{interview.role}</div>
                                  <div className="opacity-70">{interview.school}</div>
                                </div>

                                {/* メッセージバブル */}
                                <div 
                                  className={`
                                    bg-white rounded-2xl p-3 shadow-sm relative max-w-xs
                                    ${interview.isRight 
                                      ? 'rounded-br-md' 
                                      : 'rounded-bl-md'
                                    }
                                  `}
                                >
                                  {/* バブルの尻尾 */}
                                  <div 
                                    className={`
                                      absolute top-3 w-0 h-0 
                                      ${interview.isRight 
                                        ? 'right-0 translate-x-full border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent' 
                                        : 'left-0 -translate-x-full border-r-[8px] border-r-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent'
                                      }
                                    `}
                                  />
                                  
                                  <p className="text-gray-800 text-base leading-relaxed mb-2">
                                    {interview.message}
                                  </p>
                                  
                                  {/* アイコン */}
                                  <div className="flex gap-1">
                                    <span className="text-sm">❤️</span>
                                    <span className="text-sm">✨</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* チャット入力欄 */}
                  <div className="absolute bottom-2 left-4 right-4 bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="flex-1 text-gray-400 text-xs">メッセージを入力...</div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}