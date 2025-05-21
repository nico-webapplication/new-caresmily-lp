"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";

// useScrollTriggerを使用
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    // ScrollTriggerを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current && imageRef.current && contentRef.current) {
        gsap.set(imageRef.current, { opacity: 0, x: -50 });
        gsap.set(contentRef.current, { opacity: 0, x: 50 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          scroller: scroller || undefined,
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(contentRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.2,
              ease: "power2.out",
            });
          },
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [scroller]);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-6 bg-sky-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="relative h-96">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="About CareSmily"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl shadow-md"
          />
        </div>

        <div ref={contentRef} className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600">
            CareSmily について
          </h2>
          <p className="text-xl text-gray-600">
            CareSmily
            は、介護現場の皆様がより質の高いケアを提供できるよう支援するために生まれました。
          </p>
          <p className="text-gray-600">
            最新のテクノロジーを活用し、書類作成の自動化、データ分析、業務効率化など、様々な機能を提供しています。
          </p>
          <p className="text-gray-600">
            私たちのミッションは、介護現場の負担を軽減し、利用者様とそのご家族に笑顔を届けることです。
          </p>
        </div>
      </div>
    </section>
  );
}
