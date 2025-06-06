"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { DocumentButton } from "./document-button";

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
            {/* オンライン面談予約はこちら Document Button */}
            <DocumentButton
              href="/online-meeting"
              title="オンライン面談予約はこちら"
              subtitle="Online Meeting"
              description="オンライン面談にてアプリの実際の操作感や本アプリ自慢の文例の質を一度確認してみませんか？"
              variant="paper"
              className="transform rotate-1"
            />

            {/* 資料請求はこちら Document Button */}
            <DocumentButton
              href="/document-request"
              title="資料請求はこちら"
              subtitle="CareSmily Guide"
              description="CareSmilyの詳細情報や導入効果などもっと詳しく知りたい方はこちらから！"
              variant="folder"
              className="transform -rotate-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}