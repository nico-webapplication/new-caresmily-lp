"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Calendar,
  Home,
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  Database,
  FileText,
  Users2,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
// useScrollTriggerをインポート
import { useScrollTrigger } from "@/components/scroll-trigger-provider";

// useScrollTriggerを使用する部分を修正
export default function ServiceContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "dayservice" | "homecare" | "records" | "support"
  >("dayservice");
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scroller } = useScrollTrigger();
  // ScrollTriggerの参照を保存
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const handleTabChange = (
    tab: "dayservice" | "homecare" | "records" | "support",
  ) => {
    if (tab !== activeTab && !isTransitioning) {
      setIsTransitioning(true);

      // 現在のスクロール位置を保存
      const scrollPosition = window.scrollY;

      // コンテンツをフェードアウト
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            // タブを変更
            setActiveTab(tab);

            // 次のフレームでコンテンツをフェードイン
            setTimeout(() => {
              if (contentRef.current) {
                gsap.to(contentRef.current, {
                  opacity: 1,
                  duration: 0.5,
                  onComplete: () => {
                    setIsTransitioning(false);
                  },
                });
              }

              // スクロール位置を復元（ScrollTrigger再計算のために少し遅延）
              setTimeout(() => {
                window.scrollTo(0, scrollPosition);
                ScrollTrigger.refresh();
              }, 100);
            }, 50);
          },
        });
      }
    }
  };

  // コンテンツの高さを計算して設定
  useEffect(() => {
    if (contentContainerRef.current) {
      const updateHeight = () => {
        if (contentContainerRef.current) {
          const height = contentContainerRef.current.scrollHeight;
          setContentHeight(height);
        }
      };

      // 初回レンダリング後と画面サイズ変更時に高さを更新
      updateHeight();
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // 既存のScrollTriggerをクリーンアップ
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 0, y: 30 });
      const sectionTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        scroller: scroller || undefined,
        onEnter: () =>
          gsap.to(sectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }),
      });
      scrollTriggersRef.current.push(sectionTrigger);
    }

    // タブ選択時のアニメーション
    const animateTabs = () => {
      const tabKeys = ["dayservice", "homecare", "records", "support"];
      tabRefs.current.forEach((tabRef, index) => {
        if (tabRef) {
          const isActive = tabKeys[index] === activeTab;
          gsap.to(tabRef, {
            width: isActive ? "40%" : "20%",
            duration: 0.6,
            ease: "power2.inOut",
          });
        }
      });
    };

    animateTabs();

    // コンテンツ内のアニメーション要素を設定
    if (contentRef.current) {
      // アニメーション要素を選択
      const animElements = contentRef.current.querySelectorAll(".anim-element");
      const cards = contentRef.current.querySelectorAll(".feature-card");
      const stats = contentRef.current.querySelectorAll(".stat-item");
      const icons = contentRef.current.querySelectorAll(".icon-container");

      // 初期状態を設定
      gsap.set(animElements, { y: 30, opacity: 0 });
      gsap.set(cards, { y: 40, opacity: 0 });
      gsap.set(stats, { scale: 0.9, opacity: 0 });
      gsap.set(icons, { scale: 0.8, opacity: 0, rotation: -5 });

      // 各要素のScrollTriggerを作成して参照を保存
      const animTrigger = ScrollTrigger.batch(animElements, {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        start: "top 85%",
        scroller: scroller || undefined,
      });

      const cardTrigger = ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
          });
        },
        start: "top 85%",
        scroller: scroller || undefined,
      });

      const statTrigger = ScrollTrigger.batch(stats, {
        onEnter: (elements) => {
          gsap.to(elements, {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.5)",
          });
        },
        start: "top 85%",
        scroller: scroller || undefined,
      });

      const iconTrigger = ScrollTrigger.batch(icons, {
        onEnter: (elements) => {
          gsap.to(elements, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        },
        start: "top 85%",
        scroller: scroller || undefined,
      });

      // 作成されたtriggerを配列で保存
      if (Array.isArray(animTrigger)) {
        scrollTriggersRef.current.push(...animTrigger);
      }
      if (Array.isArray(cardTrigger)) {
        scrollTriggersRef.current.push(...cardTrigger);
      }
      if (Array.isArray(statTrigger)) {
        scrollTriggersRef.current.push(...statTrigger);
      }
      if (Array.isArray(iconTrigger)) {
        scrollTriggersRef.current.push(...iconTrigger);
      }
    }

    return () => {
      // このコンポーネントのScrollTriggerのみクリーンアップ
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [activeTab, scroller]);

  // デイサービスの内容
  const dayServiceContent = (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* ヒーローセクション */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e6f7ff] to-[#f0f9ff] p-8 mb-12 anim-element">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-[url('/abstract-blue-swirls.png')] bg-no-repeat bg-cover"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
                CareSmily <span className="text-[#42a5d5]">デイサービス</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                通所介護（デイサービス）事業所で発生する連絡帳・通所介護計画書・個別機能訓練計画などの書類作成を高速化する"文例データベース特化"サービス。
              </p>
              <div className="inline-block bg-[#42a5d5] text-white px-4 py-2 rounded-full text-sm font-medium">
                2025年4月正式リリース
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-[#42a5d5] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/daycare.svg"
                    alt="デイサービスイラスト"
                    width={200}
                    height={200}
                    className="p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 収録文例セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          収録文例とカバー範囲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "連絡帳",
              desc: "レクリエーション活動・生活相談・食事/排泄/入浴コメント等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "通所介護計画書",
              desc: "利用者本人/家族の希望・長期短期目標・健康状態等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "個別機能訓練計画",
              desc: "身体機能・活動/参加目標・訓練プログラム等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "状況報告書",
              desc: "家族との連携情報共有・薬の内服/服薬時管理・利用者の意向/目標の確認等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "FAX・メール",
              desc: "ケアマネージャー宛・行事/イベントのお知らせ・人事/運営上の連絡等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "アセスメントシート",
              desc: "ADL・IADL・認知機能/心理/行動面等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "サービス担当者会議",
              desc: "各ケアに対する、背景/経過・具体的な相談事項・他担当者への要望の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* まとめセクション */}
        <div className="bg-gradient-to-r from-[#42a5d5] to-[#4299e1] rounded-2xl p-8 text-white anim-element">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <div className="icon-container w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">
                CareSmily〈デイサービス〉
              </h3>
              <p className="mb-4">
                "文例を選ぶだけ"に焦点を絞り、確実性・操作性・時短効果を同時に実現したピンポイント型DXツールです。今後は放課後デイ等にも拡張予定で、デイサービス領域のノウハウを横展開する構想を進めております。
              </p>
              <a href="/document-request" className="bg-white text-[#42a5d5] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block">
                資料請求はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 訪問介護の内容（デイサービスの内容を訪問介護向けに変更）
  const homeCareContent = (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* ヒーローセクション */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#fff0f0] to-[#fff5f5] p-8 mb-12 anim-element">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400&query=abstract red pattern')] bg-no-repeat bg-cover"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
                CareSmily <span className="text-[#ff5a5a]">訪問介護</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                訪問介護事業所で発生するサービス提供記録・訪問介護計画書・アセスメントなどの書類作成を高速化する"文例データベース特化"サービス。
              </p>
              <div className="inline-block bg-[#ff5a5a] text-white px-4 py-2 rounded-full text-sm font-medium">
                2025年4月正式リリース
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-[#ff5a5a] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/homecare.svg"
                    alt="訪問介護イラスト"
                    width={200}
                    height={200}
                    className="p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 収録文例セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          収録文例とカバー範囲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "連絡帳",
              desc: "生活支援・身体介護に関するの文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "訪問介護計画書",
              desc: "利用者本人/家族の希望・訪問介護ADL・健康状態等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "状況報告書",
              desc: "家族との連携情報共有・薬の内服/服薬時管理・利用者の意向/目標の確認等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "FAX",
              desc: "ケアマネージャー宛・人事/運営上の連絡・感染症/災害時の連絡等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "アセスメントシート",
              desc: "ADL・IADL・認知機能/心理/行動面等の文例",
              icon: <Users2 className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "サービス担当者会議",
              desc: "各ケアに対する、背景/経過・具体的な相談事項・他担当者への要望の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
      {
        title: "介護記録",
        desc: "記録作成/報告手続き・訪問前準備/移動・苦情/要望への対応等の文例",
        icon: <Database className="w-8 h-8 text-white" />,
        color: "#ff5a5a",
      },
      {
        title: "ご家族への報告書(お手紙)",
        desc: "ご家族へのお願い・スタッフからのお知らせ・事業所運営情報等の文例",
        icon: <Database className="w-8 h-8 text-white" />,
        color: "#ff5a5a",
      },
      {
        title: "緊急時対応報告書",
        desc: "感染症・急性疾患・訪問中の事故/異常時等の対応についての文例",
        icon: <Database className="w-8 h-8 text-white" />,
        color: "#ff5a5a",
      },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* まとめセクション */}
        <div className="bg-gradient-to-r from-[#ff5a5a] to-[#f56565] rounded-2xl p-8 text-white anim-element">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <div className="icon-container w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <Home className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">CareSmily〈訪問介護〉</h3>
              <p className="mb-4">
                "文例を選ぶだけ"に焦点を絞り、確実性・操作性・時短効果を同時に実現したピンポイント型DXツールです。今後は訪問看護等にも拡張予定で、訪問介護領域のノウハウを横展開する構想を進めております。
              </p>
              <a href="/document-request" className="bg-white text-[#ff5a5a] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block">
                資料請求はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 福祉用具の内容
  const recordsContent = (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* ヒーローセクション */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e6f9ee] to-[#f0fff4] p-8 mb-12 anim-element">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400&query=abstract green pattern')] bg-no-repeat bg-cover"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
                CareSmily <span className="text-[#50c878]">福祉用具</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                福祉用具貸与・販売事業所で発生するモニタリング報告書・福祉用具サービス計画書・アセスメントなどの書類作成を高速化する"文例データベース特化"サービス。
              </p>
              <div className="inline-block bg-[#50c878] text-white px-4 py-2 rounded-full text-sm font-medium">
                2025年4月正式リリース
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-[#50c878] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/welfare-equipment.svg"
                    alt="福祉用具イラスト"
                    width={200}
                    height={200}
                    className="p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 収録文例セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          収録文例とカバー範囲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "モニタリング報告書",
              desc: "利用状況・身体機能・生活環境・家族状況等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "福祉用具サービス計画書",
              desc: "利用者本人/家族の希望・福祉用具選定理由・利用目標等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "取扱説明・指導記録",
              desc: "用具の使用方法・安全上の注意・メンテナンス方法等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "適合・調整記録",
              desc: "身体状況に合わせた調整・適合確認・効果測定等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "FAX・連絡書",
              desc: "ケアマネージャー宛・用具変更・故障/修理対応等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "アセスメントシート",
              desc: "ADL・IADL・住環境・介護者状況等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
            {
              title: "サービス担当者会議",
              desc: "用具選定提案・利用効果報告・他職種との連携等の文例",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#50c878",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* まとめセクション */}
        <div className="bg-gradient-to-r from-[#50c878] to-[#4ade80] rounded-2xl p-8 text-white anim-element">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <div className="icon-container w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <ClipboardList className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">
                CareSmily〈福祉用具〉
              </h3>
              <p className="mb-4">
                "文例を選ぶだけ"に焦点を絞り、確実性・操作性・時短効果を同時に実現したピンポイント型DXツールです。福祉用具専門相談員の業務効率化と、適切な用具選定をサポートする専門的な文例を豊富に収録しています。
              </p>
              <a href="/document-request" className="bg-white text-[#50c878] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block">
                資料請求はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ケアマネージャーの内容（Coming Soon）
  const supportContent = (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-[#fff8e6] to-[#fffbf0] rounded-2xl p-12 text-center mb-12 anim-element">
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-[#ffb347] rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="icon-container w-32 h-32 bg-[#ffb347] rounded-full flex items-center justify-center mb-6">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#0a2540] mb-4">
                Coming Soon...
              </h3>
              <div className="w-24 h-1 bg-[#ffb347] rounded-full mb-6"></div>
            </div>
          </div>

          <p className="text-2xl text-[#0a2540] mb-8 font-medium">
            ケアマネージャーサービスは現在準備中です
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            より充実したケアマネージャーサービスを提供するために準備を進めています。
            ケアマネジャーの業務効率化と質の高いケアプラン作成をサポートする機能を準備中です。
          </p>

          <div className="mt-12">
              <a href="/contact"  className="bg-[#ffb347] text-white px-4 sm:px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block text-center whitespace-nowrap">
              内容について問い合わせる
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // サービス内容データ
  const serviceContents = {
    dayservice: dayServiceContent,
    homecare: homeCareContent,
    records: recordsContent,
    support: supportContent,
  };

  // タブ情報
  const tabs = {
    dayservice: {
      label: "デイサービス",
      icon: <Calendar className="h-8 w-8 mr-3" />,
      color: "#81d9ff",
      hoverColor: "#9ae2ff",
      activeColor: "linear-gradient(to right, #81d9ff, #9ae2ff)",
      pointerColor: "#9ae2ff",
      bgColor: "#e6f7ff", // 薄い青色の背景
    },
    homecare: {
      label: "訪問介護",
      icon: <Home className="h-8 w-8 mr-3" />,
      color: "#ff5a5a",
      hoverColor: "#ff7575",
      activeColor: "linear-gradient(to right, #ff5a5a, #ff7575)",
      pointerColor: "#ff7575",
      bgColor: "#fff0f0", // 薄い赤色の背景
    },
    records: {
      label: "介護記録",
      icon: <ClipboardList className="h-8 w-8 mr-3" />,
      color: "#50c878", // 明るい緑色（エメラルドグリーン）
      hoverColor: "#6ad890",
      activeColor: "linear-gradient(to right, #50c878, #6ad890)",
      pointerColor: "#6ad890",
      bgColor: "#e6f9ee", // 薄い緑色の背景
    },
    support: {
      label: "居宅支援",
      icon: <Users className="h-8 w-8 mr-3" />,
      color: "#ffb347", // 明るいオレンジ色
      hoverColor: "#ffc168",
      activeColor: "linear-gradient(to right, #ffb347, #ffc168)",
      pointerColor: "#ffc168",
      bgColor: "#fff8e6", // 薄いオレンジ色の背景
    },
  };

  return (
    <section ref={sectionRef} className="w-full">
      {/* タブコンテナ - 固定高さと位置 */}
      <div className="flex w-full relative h-[120px] overflow-hidden">
        {(Object.keys(tabs) as Array<keyof typeof tabs>).map(
          (tabKey, index) => {
            const isActive = activeTab === tabKey;
            const tab = tabs[tabKey];
            return (
              <div
                key={tabKey}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                className="h-[100px] md:h-[120px] flex items-center justify-center cursor-pointer relative transition-all duration-300"
                style={{
                  width: isActive ? "40%" : "20%", // 初期幅設定
                }}
                onClick={() => handleTabChange(tabKey)}
              >
                <div
                  className="absolute inset-0 rounded-t-[20px] transition-all duration-300"
                  style={{
                    background: isActive ? tab.activeColor : tab.color,
                    boxShadow: isActive
                      ? "0 8px 16px rgba(0,0,0,0.15)"
                      : "0 4px 8px rgba(0,0,0,0.06)",
                    height: isActive ? "100%" : "95%",
                    top: isActive ? "0" : "5%",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[20%] rounded-t-[20px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
                    }}
                  />
                </div>
                <div className="relative flex items-center justify-center px-3">
                  <div className="flex items-center text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">
                    <div className="hidden sm:flex">
                      {tab.icon}
                    </div>
                    <span className="truncate max-w-full text-center sm:text-left">
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden text-xs">
                        {tabKey === "dayservice" ? "デイサービス" :
                         tabKey === "homecare" ? "訪問介護" :
                         tabKey === "records" ? "福祉用具" :
                         "居宅支援"}
                      </span>
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[99%] w-0 h-0 z-20"
                    style={{
                      borderLeft: "12px solid transparent",
                      borderRight: "12px solid transparent",
                      borderTop: `12px solid ${tab.pointerColor}`,
                    }}
                  />
                )}
              </div>
            );
          },
        )}
      </div>

      {/* コンテンツコンテナ - 固定高さと位置を維持 */}
      <div
        ref={contentContainerRef}
        className="relative overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: tabs[activeTab].bgColor,
        }}
      >
        <div
          ref={contentRef}
          className="py-8 px-4 md:px-8 relative z-10 transition-opacity duration-500"
        >
          <div className="container mx-auto">{serviceContents[activeTab]}</div>
        </div>
      </div>
    </section>
  );
}

// 追加のアイコンコンポーネント
function Cloud(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CreditCard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function TouchApp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
      <path d="M14 14V8" />
      <path d="M10 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v.5" />
      <path d="M10 14V8" />
      <path d="M6 14v-2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v.5" />
      <path d="M10 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6l-8 6Z" />
    </svg>
  );
}
