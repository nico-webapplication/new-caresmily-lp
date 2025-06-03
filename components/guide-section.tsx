"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
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
    <section ref={sectionRef} className="py-24" style={{backgroundColor: '#3caafb'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White base container */}
        <div className="bg-white rounded-[10rem] p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Open Campus Card */}
            <div className="bg-gray rounded-[10rem] p-8 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">オンライン面談</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-300">Online Meeting</h2>
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
                  <div className="relative w-80 h-64">
                    <Image
                      src="/attached_assets/image.png"
                      alt="CareSmilyミーティングの様子"
                      width={320}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* School Guide Card */}
            <div className="bg-gray-50 rounded-[10rem] p-8 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">各資料を無料でお届けいたします</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-300">CareSmily Guide</h2>
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
                  <div className="relative w-80 h-64">
                    <Image
                      src="/attached_assets/targeted_element_1748913793526.png"
                      alt="カラフルなビルのイラスト"
                      width={320}
                      height={256}
                      className="w-full h-full object-contain"
                    />
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