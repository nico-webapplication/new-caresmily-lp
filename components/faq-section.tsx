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
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && titleRef.current) {
      // タイトルのアニメーション
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });

      // FAQ項目のアニメーション
      if (faqItemsRef.current) {
        const questions = faqItemsRef.current.querySelectorAll(".faq-question");
        const answers = faqItemsRef.current.querySelectorAll(".faq-answer");

        gsap.set([...questions, ...answers], { opacity: 0, y: 20 });

        ScrollTrigger.batch(questions, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          start: "top 85%",
        });

        ScrollTrigger.batch(answers, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.6,
              delay: 0.1,
              ease: "power2.out",
            });
          },
          start: "top 85%",
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // FAQ データ
  const faqItems = [
    {
      question: "取引開始から完了までどのくらいの期間がかかりますか？",
      answer:
        "受け渡しの調整や検査状況によって前後しますが、おおよそ1ヶ月程度で完了します。",
      buyerAvatar: "/male-avatar.png",
      sellerAvatar: "/female-avatar.png",
    },
    {
      question: "「検査」は具体的に何をするのでしょうか？",
      answer:
        "専門の検査員が出品者の入力内容と実際の車両状態に相違がないかをチェックします。例えば、修復歴の有無などです。さらに、エンジンに異音がないかなど、車の状態を総合的に評価します。",
      buyerAvatar: "/male-avatar.png",
      sellerAvatar: "/female-avatar.png",
    },
    {
      question: "車の検査で問題があった場合、どうしたらいいですか？",
      answer:
        "出品者の入力した商品状態と異なる場合には、専門業者の検査結果をもとに購入者は取引をキャンセルすることもできます。この際、返送時の送料が出品者負担となる場合があります。",
      buyerAvatar: "/male-avatar.png",
      sellerAvatar: "/female-avatar.png",
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
