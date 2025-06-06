"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { DocumentButton } from "./document-button";

// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";

// useScrollTriggerを使用
export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { scroller } = useScrollTrigger();

  useEffect(() => {
    // ScrollTriggerを登録
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current && formRef.current && infoRef.current) {
        gsap.set(formRef.current, { opacity: 0, x: -50 });
        gsap.set(infoRef.current, { opacity: 0, x: 50 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          scroller: scroller || undefined,
          onEnter: () => {
            gsap.to(formRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(infoRef.current, {
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
    <section ref={sectionRef} className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">
            お問い合わせ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CareSmily
            についてのご質問や導入のご相談は、お気軽にお問い合わせください
          </p>
        </div>

        {/* Document Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* お問い合わせはこちら Document Button */}
          <DocumentButton
            href="/contact"
            title="お問い合わせはこちら"
            subtitle="Contact Us"
            description="CareSmily についてのご質問や導入のご相談はお気軽にお問い合わせください"
            variant="note"
            className="transform rotate-2"
          />

          {/* CareSmilyについてのその他動画はこちら Document Button */}
          <DocumentButton
            href="/media"
            title="CareSmilyについてのその他動画はこちら"
            subtitle="Media Gallery"
            description="CareSmilyの機能紹介動画や導入事例など豊富なコンテンツをご覧いただけます"
            variant="envelope"
            className="transform -rotate-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form
            ref={formRef}
            className="space-y-6 bg-sky-50 p-8 rounded-xl shadow-sm"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                お名前
              </label>
              <Input id="name" placeholder="山田 太郎" className="w-full" />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                会社名・施設名
              </label>
              <Input
                id="company"
                placeholder="株式会社〇〇"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                お問い合わせ内容
              </label>
              <Textarea
                id="message"
                placeholder="ご質問やご要望をご記入ください"
                className="w-full min-h-[150px]"
              />
            </div>

            <Button className="w-full bg-sky-500 hover:bg-sky-600">
              送信する
            </Button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-sky-500 mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                  お電話でのお問い合わせ
                </h3>
                <p className="text-gray-600">
                  03-XXXX-XXXX
                  <br />
                  （平日 9:00〜18:00）
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-sky-500 mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                  メールでのお問い合わせ
                </h3>
                <p className="text-gray-600">
                  info@caresmily.example.com
                  <br />
                  （24時間受付）
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-sky-500 mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                  所在地
                </h3>
                <p className="text-gray-600">
                  〒XXX-XXXX
                  <br />
                  東京都〇〇区〇〇町X-X-X
                  <br />
                  〇〇ビル 8F
                </p>
              </div>
            </div>

            <div className="bg-gray-200 h-64 rounded-xl mt-6">
              {/* Google Map would go here */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Google Map
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
