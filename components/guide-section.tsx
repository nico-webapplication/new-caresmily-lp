"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OpenCampusSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32" style={{backgroundColor: '#3caafb'}}>
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* White base container */}
        <div className="bg-white rounded-[10rem] p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Open Campus Card */}
            <Link href="/online-meeting">
              <div className="bg-gray-50 rounded-[10rem] p-12 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">オンライン面談</p>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-4xl font-bold text-gray-900 relative overflow-hidden">
                        <span className="inline-block transition-all duration-500 ease-in-out bg-gradient-to-r from-gray-900 via-gray-900 to-blue-500 bg-[length:200%_100%] bg-left group-hover:bg-right bg-clip-text text-transparent">
                          Online Meeting
                        </span>
                      </h2>
                      <div className="bg-orange-500 rounded-full p-2">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p>オンライン面談にてアプリの実際の操作感や</p>
                      <p>本アプリ自慢の文例の質を一度確認してみませんか？</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex justify-center items-end">
                    <div className="relative w-96 h-80">
                      <Image
                        src="/attached_assets/image.png"
                        alt="CareSmilyミーティングの様子"
                        width={400}
                        height={320}
                        className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* School Guide Card */}
            <Link href="/document-request">
              <div className="bg-gray-50 rounded-[10rem] p-12 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">各資料を無料でお届けいたします</p>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-4xl font-bold text-gray-900 relative overflow-hidden">
                        <span className="inline-block transition-all duration-500 ease-in-out bg-gradient-to-r from-gray-900 via-gray-900 to-blue-500 bg-[length:200%_100%] bg-left group-hover:bg-right bg-clip-text text-transparent">
                          CareSmily Guide
                        </span>
                      </h2>
                      <div className="bg-orange-500 rounded-full p-2">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p>CareSmilyの詳細情報や導入効果など</p>
                      <p>もっと詳しく知りたい方はこちらから！</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex justify-center items-end">
                    <div className="relative w-96 h-80">
                      <Image
                        src="/attached_assets/targeted_element_1748913793526.png"
                        alt="カラフルなビルのイラスト"
                        width={400}
                        height={320}
                        className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}