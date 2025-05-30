"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";

// useScrollTriggerを使用する部分を修正
export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // カスタムバウンスイージングの定義
    if (!gsap.utils.checkPrefix("CustomEase")) {
      // CustomEaseがない場合は代替のイージングを使用
      const createBounceEase = () => {
        return gsap.parseEase("elastic.out(1,0.3)");
      };

      gsap.registerEase("customBounce", createBounceEase());
      gsap.registerEase("customSquash", gsap.parseEase("back.out(2)"));
    } else {
      // CustomEaseとCustomBounceを持っている場合
      try {
        gsap.registerEase("customBounce", gsap.parseEase("elastic.out(1,0.3)"));
        gsap.registerEase("customSquash", gsap.parseEase("back.out(2)"));
      } catch (e) {
        console.log("CustomBounce登録エラー:", e);
      }
    }

    // Create animation timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        markers: false, // デバッグ用マーカー（必要に応じてtrueに）
        scroller: scroller || undefined,
      },
    });

    // Animate title with bounce effect
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: -50 });
      timeline.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "customBounce",
      });
    }

    // Animate FAQ items with staggered bounce
    if (faqItemsRef.current) {
      const questions = faqItemsRef.current.querySelectorAll(".faq-question");
      const answers = faqItemsRef.current.querySelectorAll(".faq-answer");

      // Set initial state
      gsap.set(questions, { opacity: 0, x: -50, scale: 0.9 });
      gsap.set(answers, { opacity: 0, x: 50, scale: 0.9 });

      // Add question animations to timeline with bounce
      timeline.to(
        questions,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "customBounce",
        },
        "-=0.4",
      );

      // Add squash effect on questions
      timeline.to(
        questions,
        {
          scaleX: 1.05,
          scaleY: 0.95,
          stagger: 0.2,
          duration: 0.8,
          transformOrigin: "center bottom",
          ease: "customSquash",
        },
        "-=0.8",
      );

      // Add answer animations to timeline with slight delay
      timeline.to(
        answers,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "customBounce",
        },
        "-=0.6",
      );

      // Add subtle squash effect on answers
      timeline.to(
        answers,
        {
          scaleX: 1.05,
          scaleY: 0.95,
          stagger: 0.2,
          duration: 0.8,
          transformOrigin: "center bottom",
          ease: "customSquash",
        },
        "-=0.8",
      );
    }

    // Cleanup
    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [scroller]);

  // FAQ データ
  const faqItems = [
    {
      question: "本当に時短につながりますか？",
      answer:
        "連絡帳・通所介護計画書・ケアプランなど、作成頻度の高い書類に特化した文例が充実しているため、文章起案の手間を大幅に削減できます。",
      buyerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
    {
      question: "文例の更新はどのくらいのペースで行われますか？",
      answer:
        "制度改正や現場からの要望に合わせて随時更新しています。契約プラン内で自動的にアップデートが反映されるので常に最新の文例が利用可能です。",
      buyerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
    {
      question: "既存の書類フォーマットへの差し込みは可能ですか？",
      answer:
        "どのシステムにも文例を利用できます。システム以外にエクセル様式への差し込みに対応しています。",
      buyerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
    {
      question: "導入後のサポートはどのように受けられますか？",
      answer: "メール・電話での問い合わせ対応。安心してご利用いただけます。",
      buyerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-[#8dd9fa] overflow-hidden relative"
    >
      {/* タイトル部分 - FAQが並ぶデザイン */}
      <div ref={titleRef} className="w-full text-center mb-12 overflow-hidden">
        <div className="flex justify-center items-center flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={index}
              className={`text-4xl md:text-5xl font-bold mx-2 ${
                index % 2 === 0
                  ? "font-serif italic text-[#1a2b4a]/70"
                  : "text-[#1a2b4a]"
              }`}
            >
              {index % 2 === 0 ? "FAQ" : index === 4 ? "よくあるご質問" : "FAQ"}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ項目 */}
      <div ref={faqItemsRef} className="container mx-auto max-w-4xl px-4">
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-4">
              {/* 質問 */}
              <div className="flex items-start faq-question">
                <div className="flex-shrink-0 mr-4">
                  <div className="relative w-12 h-12 bg-[#FEF3E2] rounded-full overflow-hidden border-2 border-[#FEF3E2]">
                    <Image 
                      src="/images/CareSmily_ロゴ.png" 
                      alt="CareSmily" 
                      width={120} 
                      height={70} 
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md relative">
                  <div className="absolute left-0 top-4 transform -translate-x-[8px] rotate-45 w-4 h-4 bg-white"></div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-[#1a2b4a] mr-4">
                      Q
                    </span>
                    <p className="text-[#1a2b4a] font-medium">
                      {item.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* 回答 */}
              <div className="flex items-start justify-end faq-answer">
                <div className="flex-1 bg-[#1a2b4a] rounded-2xl p-6 shadow-md text-white relative">
                  <div className="absolute right-0 top-4 transform translate-x-[8px] rotate-45 w-4 h-4 bg-[#1a2b4a]"></div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold mr-4">A</span>
                    <p>{item.answer}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={item.sellerAvatar || "/placeholder.svg"}
                      alt="回答者"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
