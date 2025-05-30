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
    name: "伊澤クリストファーさん",
    role: "ビジュアルデザイン科2年",
    school: "作新学院高等学校出身",
    message: "Webデザインの会社で働いて、将来は独立したい！幅広く学ぶことができて、自分の進みたい道以外にも様々な才能を伸ばすことができるのが魅力！",
    avatar: "/images/student1.jpg",
    isRight: false
  },
  {
    id: 2,
    name: "愛澤花音さん",
    role: "放送・映像・音響分野を学べる",
    school: "宮城県高等学校出身",
    message: "栃木県内で放送・映像・音響分野を学べる唯一の学校！機材が学ぶ環境が整っていて、先生達も業界の最前線で働いている",
    avatar: "/images/student2.jpg",
    isRight: true
  },
  {
    id: 3,
    name: "芝田涼美さん",
    role: "ビジュアルデザイン科2年",
    school: "上三川高等学校出身",
    message: "入学当初はイラストレーターになりたかっただけど、デザインを学ぶうちに楽しくなって今はグラフィックデザイナーを目指しています！",
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
        background: "linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%)"
      }}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* 左側：タイトルセクション */}
          <div 
            ref={titleRef}
            className="lg:w-1/3 text-white"
          >
            <h2 className="text-6xl lg:text-8xl font-black mb-4 leading-tight">
              Interview
            </h2>
            <h3 className="text-xl lg:text-2xl font-medium mb-6 opacity-90">
              インタビュー
            </h3>
            <p className="text-lg opacity-80 leading-relaxed">
              在校生、卒業生、保護者の方に<br />
              メディア・アーツについて<br />
              聞いてみました！
            </p>
          </div>

          {/* 右側：チャットボット風インタビューカード */}
          <div className="lg:w-2/3 relative">
            <div className="space-y-4">
              {interviewData.map((interview, index) => (
                <div
                  key={interview.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={`flex ${interview.isRight ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-md ${interview.isRight ? 'order-2' : 'order-1'}`}
                  >
                    {/* チャットボット風のカード */}
                    <div className={`flex gap-3 ${interview.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* アバター */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-300 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-400"></div>
                        </div>
                      </div>

                      {/* メッセージバブル */}
                      <div className="flex flex-col">
                        {/* 名前とタイトル */}
                        <div className={`text-xs text-white mb-1 ${interview.isRight ? 'text-right' : 'text-left'}`}>
                          <div className="font-semibold">{interview.name}</div>
                          <div className="opacity-80">{interview.role}</div>
                          <div className="opacity-80">{interview.school}</div>
                        </div>

                        {/* メッセージバブル */}
                        <div 
                          className={`
                            bg-white rounded-2xl p-4 shadow-lg relative max-w-sm
                            ${interview.isRight 
                              ? 'rounded-br-md' 
                              : 'rounded-bl-md'
                            }
                          `}
                        >
                          {/* バブルの尻尾 */}
                          <div 
                            className={`
                              absolute top-4 w-0 h-0 
                              ${interview.isRight 
                                ? 'right-0 translate-x-full border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent' 
                                : 'left-0 -translate-x-full border-r-[12px] border-r-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
                              }
                            `}
                          />
                          
                          <p className="text-gray-800 text-sm leading-relaxed mb-3">
                            {interview.message}
                          </p>
                          
                          {/* アイコン */}
                          <div className="flex gap-2">
                            <span className="text-lg">❤️</span>
                            <span className="text-lg">✨</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 右側のナビゲーションボタン */}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 hidden lg:block">
              <div className="flex flex-col gap-2">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-lg transition-all duration-300">
                  <span className="block text-sm font-medium">在校生</span>
                </button>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-lg transition-all duration-300">
                  <span className="block text-sm font-medium">卒業生</span>
                </button>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-lg transition-all duration-300">
                  <span className="block text-sm font-medium">保護者</span>
                </button>
              </div>
            </div>

            {/* 下矢印ボタン */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-lg transition-all duration-300">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}