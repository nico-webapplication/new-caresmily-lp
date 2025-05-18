"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);

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
      }
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
      timeline.to(questions, {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "customBounce",
      }, "-=0.4");
      
      // Add squash effect on questions
      timeline.to(questions, {
        scaleX: 1.05, 
        scaleY: 0.95,
        stagger: 0.2,
        duration: 0.8,
        transformOrigin: "center bottom",
        ease: "customSquash",
      }, "-=0.8");
      
      // Add answer animations to timeline with slight delay
      timeline.to(answers, {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "customBounce",
      }, "-=0.6");
      
      // Add subtle squash effect on answers
      timeline.to(answers, {
        scaleX: 1.05, 
        scaleY: 0.95,
        stagger: 0.2,
        duration: 0.8,
        transformOrigin: "center bottom",
        ease: "customSquash",
      }, "-=0.8");
    }
    
    // Cleanup
    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, []);

  // FAQ データ
  const faqItems = [
    {
      question: "ケアプランの作成プロセスについて教えてください",
      answer:
        "AIが利用者様の状態やニーズに基づき、最適なケアプランを提案します。そのプランを専門スタッフが確認し、必要に応じて調整を行います。最終的には利用者様とご家族にもご確認いただきます。",
      buyerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
    {
      question: "サービスの料金体系はどうなっていますか？",
      answer:
        "基本料金にサービス内容に応じた追加料金が加算される仕組みです。介護保険が適用されるサービスについては、原則として1割から3割の自己負担となります。詳細な料金表はお問い合わせいただければご案内いたします。",
      buyerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
    },
    {
      question: "スタッフの資格や経験はどの程度ですか？",
      answer:
        "当社のスタッフは全員、介護福祉士や看護師などの専門資格を持ち、平均5年以上の介護経験があります。また、定期的な研修を実施し、最新の介護知識と技術の習得に努めています。",
      buyerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0'/%3E%3C/svg%3E",
      sellerAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 11l-5-5.5-5 5.5'/%3E%3Cpath d='M17 18l-5-5.5-5 5.5'/%3E%3C/svg%3E",
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
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={item.buyerAvatar || "/placeholder.svg"}
                      alt="質問者"
                      fill
                      style={{ objectFit: "cover" }}
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
