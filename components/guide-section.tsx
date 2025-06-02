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
    <section ref={sectionRef} className="py-16" style={{backgroundColor: '#3caafb'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White base container */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Open Campus Card */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">実際の操作画面を見てみませんか？</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-300">オンライン面談予約</h2>
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
                    {/* Colorful building illustration */}
                    <svg viewBox="0 0 320 256" className="w-full h-full">
                      {/* Building base */}
                      <rect x="40" y="120" width="240" height="136" fill="#e8f4fd" stroke="#64b5f6" strokeWidth="2" rx="8"/>
                      
                      {/* Building floors */}
                      <rect x="50" y="130" width="220" height="20" fill="#ffeb3b"/>
                      <rect x="50" y="155" width="220" height="20" fill="#4caf50"/>
                      <rect x="50" y="180" width="220" height="20" fill="#ff9800"/>
                      <rect x="50" y="205" width="220" height="20" fill="#e91e63"/>
                      <rect x="50" y="230" width="220" height="20" fill="#9c27b0"/>
                      
                      {/* Windows */}
                      {[...Array(5)].map((_, floor) => 
                        [...Array(8)].map((_, window) => (
                          <rect 
                            key={`${floor}-${window}`}
                            x={60 + window * 25} 
                            y={135 + floor * 25} 
                            width="15" 
                            height="10" 
                            fill="white" 
                            rx="1"
                          />
                        ))
                      )}
                      
                      {/* Characters on building */}
                      <circle cx="80" cy="100" r="8" fill="#ffb74d"/>
                      <rect x="76" y="108" width="8" height="12" fill="#42a5f5"/>
                      
                      <circle cx="120" cy="95" r="8" fill="#f48fb1"/>
                      <rect x="116" y="103" width="8" height="12" fill="#ab47bc"/>
                      
                      <circle cx="200" cy="105" r="8" fill="#81c784"/>
                      <rect x="196" y="113" width="8" height="12" fill="#66bb6a"/>
                      
                      <circle cx="240" cy="90" r="8" fill="#ffcc02"/>
                      <rect x="236" y="98" width="8" height="12" fill="#ff7043"/>
                      
                      {/* Building sign */}
                      <rect x="140" y="140" width="40" height="15" fill="#1976d2"/>
                      <text x="160" y="152" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">OPEN</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* School Guide Card */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">各資料を無料でお届けいたします</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-300">資料請求</h2>
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
                    {/* School guide brochures illustration */}
                    <svg viewBox="0 0 320 256" className="w-full h-full">
                      {/* Background brochure */}
                      <rect x="60" y="80" width="200" height="140" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="8"/>
                      
                      {/* Front brochure */}
                      <rect x="40" y="60" width="200" height="140" fill="white" stroke="#333" strokeWidth="2" rx="8"/>
                      
                      {/* Yellow highlight circle */}
                      <circle cx="220" cy="100" r="35" fill="#ffeb3b" opacity="0.8"/>
                      
                      {/* Brochure content - photos */}
                      <rect x="50" y="75" width="60" height="40" fill="#e3f2fd" rx="4"/>
                      <rect x="120" y="75" width="60" height="40" fill="#f3e5f5" rx="4"/>
                      <rect x="190" y="75" width="40" height="40" fill="#e8f5e8" rx="4"/>
                      
                      <rect x="50" y="125" width="80" height="30" fill="#fff3e0" rx="4"/>
                      <rect x="140" y="125" width="90" height="30" fill="#fce4ec" rx="4"/>
                      
                      <rect x="50" y="165" width="100" height="25" fill="#f1f8e9" rx="4"/>
                      <rect x="160" y="165" width="70" height="25" fill="#e0f2f1" rx="4"/>
                      
                      {/* Small student figures on brochure */}
                      <circle cx="70" cy="90" r="3" fill="#ff7043"/>
                      <circle cx="90" cy="85" r="3" fill="#42a5f5"/>
                      <circle cx="140" cy="95" r="3" fill="#ab47bc"/>
                      <circle cx="160" cy="90" r="3" fill="#66bb6a"/>
                      
                      {/* Text lines */}
                      <rect x="55" y="140" width="70" height="2" fill="#666" rx="1"/>
                      <rect x="55" y="145" width="50" height="2" fill="#666" rx="1"/>
                      <rect x="145" y="140" width="60" height="2" fill="#666" rx="1"/>
                      <rect x="145" y="145" width="75" height="2" fill="#666" rx="1"/>
                      
                      {/* School logo area */}
                      <rect x="190" y="175" width="40" height="15" fill="#1976d2" rx="2"/>
                      
                      {/* Arrow elements suggesting "Now!" */}
                      <polygon points="260,120 275,130 260,140" fill="#ff4444"/>
                      <text x="255" y="155" fontSize="12" fill="#ff4444" fontWeight="bold">Now!</text>
                    </svg>
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