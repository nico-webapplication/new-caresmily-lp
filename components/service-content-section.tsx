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

              // スクロール位置を復元
              window.scrollTo(0, scrollPosition);
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

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
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
    }

    // タブ選択時のアニメーション
    const animateTabs = () => {
      const tabKeys = ["dayservice", "homecare", "records", "support"];
      tabRefs.current.forEach((tabRef, index) => {
        if (tabRef) {
          const isActive = tabKeys[index] === activeTab;
          gsap.to(tabRef, {
            width: isActive ? "40%" : "20%",
            duration: 0.6, // アニメーション時間を長くして滑らかに
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

      // スクロールトリガーでアニメーション
      ScrollTrigger.batch(animElements, {
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

      ScrollTrigger.batch(cards, {
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

      ScrollTrigger.batch(stats, {
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

      ScrollTrigger.batch(icons, {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-32 mr-4">
                  <Image
                    src="/images/caresmily-logo.png"
                    alt="CareSmily Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    className="object-contain"
                  />
                </div>
                <span className="text-3xl md:text-4xl font-bold text-[#42a5d5]">デイサービス</span>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                通所介護（デイサービス）事業所で発生する連絡帳・通所介護計画書・アセスメントなどの書類作成を高速化する"文例データベース特化"クラウド
                SaaS。
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
                    src="/daycare-service.png"
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

        {/* 思想セクション */}
        <div className="mb-16 anim-element">
          <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#42a5d5]"></div>
            <h3 className="text-xl font-bold text-[#0a2540] mb-4 pl-4">思想</h3>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 pl-4">
                <p className="text-gray-700 mb-4">
                  AI自動生成に頼らず、主任ケアマネ・看護師らが監修した10万件規模の定型文を「選んで貼るだけ」で活用する"非AI型"アプローチを採用。
                </p>
                <div className="flex items-center text-[#42a5d5] font-medium">
                  <span>確実性・操作性・時短効果を同時に実現</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                <div className="icon-container relative w-32 h-32 bg-[#e6f7ff] rounded-full flex items-center justify-center">
                  <Database className="w-16 h-16 text-[#42a5d5]" />
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                    <span className="text-xs font-bold text-[#42a5d5]">
                      10万件
                    </span>
                  </div>
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
              desc: "利用者のADL変化・レクリエーション状況・食事/排泄コメント等",
              icon: <FileText className="w-8 h-8 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "通所介護計画書",
              desc: "生活課題・長期短期目標・支援内容・評価文例",
              icon: <ClipboardList className="w-8 h-8 text-white" />,
              color: "#4299e1",
            },
            {
              title: "個別機能訓練計画",
              desc: "身体機能・活動/参加目標・訓練プログラム文例",
              icon: <Users2 className="w-8 h-8 text-white" />,
              color: "#3182ce",
            },
            {
              title: "アセスメントシート",
              desc: "生活環境・家族背景・医学的情報の聞き取り文例",
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              color: "#2b6cb0",
            },
            {
              title: "モニタリング／月次報告",
              desc: "経過・課題・評価コメント文例",
              icon: <BarChart3 className="w-8 h-8 text-white" />,
              color: "#2c5282",
            },
            {
              title: "その他",
              desc: "総計80k〜100k超をカテゴリ／キーワードで横断検索",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#2a4365",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4" style={{ backgroundColor: item.color }}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 主要機能セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          主要機能（デイサービス特化）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              title: "高速検索 & フィルタ",
              desc: "書類種別→キーワード／タグで瞬時に絞り込み、ワンクリックでコピー。",
              icon: <Zap className="w-6 h-6 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "チーム共有",
              desc: "ベテランが選んだ文例セットを新人と共有し、文書品質を平準化。",
              icon: <Users className="w-6 h-6 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "カスタム文例登録",
              desc: "事業所独自の言い回しや自治体様式向け文例を一元管理。",
              icon: <FileText className="w-6 h-6 text-white" />,
              color: "#42a5d5",
            },
            {
              title: "PDF出力／印刷",
              desc: "アプリ内で微調整後、そのままPDF生成・プリントアウトまで完結。",
              icon: <FileText className="w-6 h-6 text-white" />,
              color: "#42a5d5",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div
                className="w-16 flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <div className="p-5 flex-1">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 導入効果セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          導入効果（公開ベンチマーク）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "書類作成時間削減",
              value: "最大60%",
              subtext: "平均5分/件の短縮",
              icon: <Clock className="w-8 h-8 text-[#42a5d5]" />,
            },
            {
              title: "残業削減",
              value: "月8時間減",
              subtext: "より多くの時間を利用者様に",
              icon: <Clock className="w-8 h-8 text-[#42a5d5]" />,
            },
            {
              title: "利用者／家族満足度",
              value: "92%",
              subtext: "に向上",
              icon: <Users className="w-8 h-8 text-[#42a5d5]" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="stat-item bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-[#e6f7ff] rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="font-medium text-gray-600 mb-2">{item.title}</h4>
              <div className="text-3xl font-bold text-[#42a5d5] mb-1">
                {item.value}
              </div>
              <p className="text-sm text-gray-500">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* 技術・運用面セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          技術・運用面
        </h3>
        <div className="bg-white rounded-xl shadow-md p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "クラウド対応",
                desc: "100%クラウド（S3＋CloudFront／Lambda＋PostgreSQL）でPC・タブレット・スマホに対応、インストール不要。",
                icon: <Cloud className="w-8 h-8 text-[#42a5d5]" />,
              },
              {
                title: "セキュリティ",
                desc: "HTTPS通信＋JWT認証でデータを国内リージョンに暗号化保存。",
                icon: <Shield className="w-8 h-8 text-[#42a5d5]" />,
              },
              {
                title: "料金体系",
                desc: "最低6か月契約・月額15,000円のサブスクモデル（資料請求時提示）。（価格は2025年5月時点）",
                icon: <CreditCard className="w-8 h-8 text-[#42a5d5]" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="icon-container w-16 h-16 bg-[#e6f7ff] rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 利用シーン例セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          利用シーン例
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "連絡帳作成の効率化",
              desc: "送迎後40名分の連絡帳を30→12分に短縮し利用者との会話時間を1.5倍確保。",
              image:
                "/placeholder.svg?height=120&width=120&query=daycare communication",
            },
            {
              title: "新人研修の効率化",
              desc: "新人職員研修で「正しい記録表現」を文例から学習し、指導コストを低減。",
              image:
                "/placeholder.svg?height=120&width=120&query=staff training",
            },
            {
              title: "根拠ある記録",
              desc: "行政・家族に確実な根拠を説明できるためAI生成文のブラックボックス問題を回避。",
              image:
                "/placeholder.svg?height=120&width=120&query=document verification",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-32 bg-[#e6f7ff] flex items-center justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
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
                "文例を選ぶだけ"に焦点を絞り、確実性・操作性・時短効果を同時に実現したピンポイント型DXツールです。今後は放課後等デイや訪問看護版へ拡張予定で、デイサービス領域のノウハウを横展開する構想が示されています。
              </p>
              <button className="bg-white text-[#42a5d5] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                資料請求はこちら
              </button>
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
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-32 mr-4">
                  <Image
                    src="/images/caresmily-logo.png"
                    alt="CareSmily Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    className="object-contain"
                  />
                </div>
                <span className="text-3xl md:text-4xl font-bold text-[#ff5a5a]">訪問介護</span>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                訪問介護事業所で発生するサービス提供記録・訪問介護計画書・アセスメントなどの書類作成を高速化する"文例データベース特化"クラウド
                SaaS。
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
                    src="/placeholder.svg?height=200&width=200&query=home care service illustration"
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

        {/* 思想セクション */}
        <div className="mb-16 anim-element">
          <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#ff5a5a]"></div>
            <h3 className="text-xl font-bold text-[#0a2540] mb-4 pl-4">思想</h3>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 pl-4">
                <p className="text-gray-700 mb-4">
                  AI自動生成に頼らず、主任ケアマネ・訪問介護専門家らが監修した10万件規模の定型文を「選んで貼るだけ」で活用する"非AI型"アプローチを採用。
                </p>
                <div className="flex items-center text-[#ff5a5a] font-medium">
                  <span>確実性・操作性・時短効果を同時に実現</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                <div className="icon-container relative w-32 h-32 bg-[#fff0f0] rounded-full flex items-center justify-center">
                  <Database className="w-16 h-16 text-[#ff5a5a]" />
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                    <span className="text-xs font-bold text-[#ff5a5a]">
                      10万件
                    </span>
                  </div>
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
              title: "サービス提供記録",
              desc: "身体介護・生活援助の詳細記録、利用者状態変化、対応内容等",
              icon: <FileText className="w-8 h-8 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "訪問介護計画書",
              desc: "生活課題・長期短期目標・支援内容・評価文例",
              icon: <ClipboardList className="w-8 h-8 text-white" />,
              color: "#f56565",
            },
            {
              title: "アセスメントシート",
              desc: "在宅環境・家族状況・医学的情報の聞き取り文例",
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              color: "#e53e3e",
            },
            {
              title: "モニタリング記録",
              desc: "経過・課題・評価コメント文例",
              icon: <BarChart3 className="w-8 h-8 text-white" />,
              color: "#c53030",
            },
            {
              title: "ヘルパー申し送り",
              desc: "引継ぎ事項・注意点・変更点の記録文例",
              icon: <Users2 className="w-8 h-8 text-white" />,
              color: "#9b2c2c",
            },
            {
              title: "その他",
              desc: "総計80k〜100k超をカテゴリ／キーワードで横断検索",
              icon: <Database className="w-8 h-8 text-white" />,
              color: "#742a2a",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4" style={{ backgroundColor: item.color }}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 主要機能セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          主要機能（訪問介護特化）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              title: "高速検索 & フィルタ",
              desc: "書類種別→キーワード／タグで瞬時に絞り込み、ワンクリックでコピー。",
              icon: <Zap className="w-6 h-6 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "チーム共有",
              desc: "ベテランが選んだ文例セットを新人と共有し、文書品質を平準化。",
              icon: <Users className="w-6 h-6 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "カスタム文例登録",
              desc: "事業所独自の言い回しや自治体様式向け文例を一元管理。",
              icon: <FileText className="w-6 h-6 text-white" />,
              color: "#ff5a5a",
            },
            {
              title: "PDF出力／印刷",
              desc: "アプリ内で微調整後、そのままPDF生成・プリントアウトまで完結。",
              icon: <FileText className="w-6 h-6 text-white" />,
              color: "#ff5a5a",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div
                className="w-16 flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <div className="p-5 flex-1">
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 導入効果セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          導入効果（公開ベンチマーク）
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "書類作成時間削減",
              value: "最大60%",
              subtext: "平均5分/件の短縮",
              icon: <Clock className="w-8 h-8 text-[#ff5a5a]" />,
            },
            {
              title: "残業削減",
              value: "月8時間減",
              subtext: "より多くの時間を利用者様に",
              icon: <Clock className="w-8 h-8 text-[#ff5a5a]" />,
            },
            {
              title: "利用者／家族満足度",
              value: "92%",
              subtext: "に向上",
              icon: <Users className="w-8 h-8 text-[#ff5a5a]" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="stat-item bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-[#fff0f0] rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="font-medium text-gray-600 mb-2">{item.title}</h4>
              <div className="text-3xl font-bold text-[#ff5a5a] mb-1">
                {item.value}
              </div>
              <p className="text-sm text-gray-500">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* 技術・運用面セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          技術・運用面
        </h3>
        <div className="bg-white rounded-xl shadow-md p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "クラウド対応",
                desc: "100%クラウド（S3＋CloudFront／Lambda＋PostgreSQL）でPC・タブレット・スマホに対応、インストール不要。",
                icon: <Cloud className="w-8 h-8 text-[#ff5a5a]" />,
              },
              {
                title: "セキュリティ",
                desc: "HTTPS通信＋JWT認証でデータを国内リージョンに暗号化保存。",
                icon: <Shield className="w-8 h-8 text-[#ff5a5a]" />,
              },
              {
                title: "料金体系",
                desc: "最低6か月契約・月額15,000円のサブスクモデル（資料請求時提示）。（価格は2025年5月時点）",
                icon: <CreditCard className="w-8 h-8 text-[#ff5a5a]" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="icon-container w-16 h-16 bg-[#fff0f0] rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 利用シーン例セクション */}
        <h3 className="text-2xl font-bold text-[#0a2540] mb-6 anim-element">
          利用シーン例
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "記録作成の効率化",
              desc: "1日20件のサービス提供記録を40→15分に短縮し、次の訪問への移動時間を確保。",
              image:
                "/placeholder.svg?height=120&width=120&query=home care record",
            },
            {
              title: "新人研修の効率化",
              desc: "新人ヘルパー研修で「適切な記録表現」を文例から学習し、指導コストを低減。",
              image:
                "/placeholder.svg?height=120&width=120&query=caregiver training",
            },
            {
              title: "根拠ある記録",
              desc: "行政・家族に確実な根拠を説明できるためAI生成文のブラックボックス問題を回避。",
              image:
                "/placeholder.svg?height=120&width=120&query=document verification",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-32 bg-[#fff0f0] flex items-center justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
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
                "文例を選ぶだけ"に焦点を絞り、確実性・操作性・時短効果を同時に実現したピンポイント型DXツールです。今後は訪問看護や居宅介護支援版へ拡張予定で、訪問介護領域のノウハウを横展開する構想が示されています。
              </p>
              <button className="bg-white text-[#ff5a5a] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                資料請求はこちら
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 介護記録の内容（Coming Soon）
  const recordsContent = (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-[#e6f9ee] to-[#f0fff4] rounded-2xl p-12 text-center mb-12 anim-element">
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-[#50c878] rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="icon-container w-32 h-32 bg-[#50c878] rounded-full flex items-center justify-center mb-6">
                <ClipboardList className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#0a2540] mb-4">
                Coming Soon...
              </h3>
              <div className="w-24 h-1 bg-[#50c878] rounded-full mb-6"></div>
            </div>
          </div>

          <p className="text-2xl text-[#0a2540] mb-8 font-medium">
            介護記録サービスは現在開発中です
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            より使いやすく、効率的な介護記録システムを提供するために準備を進めています。
            最新の技術と専門家の知見を組み合わせた革新的なサービスにご期待ください。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "簡単操作",
                desc: "直感的なインターフェースで誰でも簡単に使えます",
                icon: <TouchApp className="w-12 h-12 text-[#50c878]" />,
              },
              {
                title: "時間短縮",
                desc: "記録作成時間を大幅に削減し、ケアに集中できます",
                icon: <Clock className="w-12 h-12 text-[#50c878]" />,
              },
              {
                title: "データ活用",
                desc: "蓄積されたデータを分析し、ケアの質向上に役立てます",
                icon: <BarChart3 className="w-12 h-12 text-[#50c878]" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="feature-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-[#e6f9ee] rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button className="bg-[#50c878] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              リリース情報を受け取る
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 anim-element">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image
                src="/placeholder.svg?height=300&width=300&query=care records app interface"
                alt="介護記録アプリイメージ"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold text-[#0a2540] mb-4">
                開発中の機能
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "AIによる音声入力と文字起こし",
                  "写真・動画の記録添付機能",
                  "バイタルデータの自動グラフ化",
                  "多職種間の情報共有機能",
                  "カスタマイズ可能なテンプレート",
                  "オフライン記録と自動同期",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#50c878] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 居宅支援の内容（Coming Soon）
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
            居宅支援サービスは現在開発中です
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            より充実した居宅支援サービスを提供するために準備を進めています。
            ケアマネジャーの業務効率化と質の高いケアプラン作成をサポートする機能を開発中です。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "ケアプラン作成支援",
                desc: "専門家監修の文例を活用した質の高いケアプラン作成",
                icon: <ClipboardList className="w-12 h-12 text-[#ffb347]" />,
              },
              {
                title: "業務効率化",
                desc: "書類作成時間を短縮し、利用者様との時間を確保",
                icon: <Clock className="w-12 h-12 text-[#ffb347]" />,
              },
              {
                title: "多職種連携",
                desc: "関係者間の情報共有をスムーズに行える連携機能",
                icon: <Users2 className="w-12 h-12 text-[#ffb347]" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="feature-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-[#fff8e6] rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-[#0a2540] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button className="bg-[#ffb347] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              リリース情報を受け取る
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 anim-element">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image
                src="/placeholder.svg?height=300&width=300&query=care management app interface"
                alt="居宅支援アプリイメージ"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold text-[#0a2540] mb-4">
                開発中の機能
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "ケアプラン文例データベース",
                  "アセスメント支援機能",
                  "モニタリング記録の効率化",
                  "サービス担当者会議の議事録作成",
                  "給付管理業務の効率化",
                  "地域資源情報の統合管理",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#ffb347] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
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
      label: "CareSmily デイサービス",
      icon: <Calendar className="h-5 w-5 mr-2" />,
      color: "#81d9ff",
      hoverColor: "#9ae2ff",
      activeColor: "linear-gradient(to right, #81d9ff, #9ae2ff)",
      pointerColor: "#9ae2ff",
      bgColor: "#e6f7ff", // 薄い青色の背景
    },
    homecare: {
      label: "CareSmily 訪問介護",
      icon: <Home className="h-5 w-5 mr-2" />,
      color: "#ff5a5a",
      hoverColor: "#ff7575",
      activeColor: "linear-gradient(to right, #ff5a5a, #ff7575)",
      pointerColor: "#ff7575",
      bgColor: "#fff0f0", // 薄い赤色の背景
    },
    records: {
      label: "CareSmily 介護記録",
      icon: <ClipboardList className="h-5 w-5 mr-2" />,
      color: "#50c878", // 明るい緑色（エメラルドグリーン）
      hoverColor: "#6ad890",
      activeColor: "linear-gradient(to right, #50c878, #6ad890)",
      pointerColor: "#6ad890",
      bgColor: "#e6f9ee", // 薄い緑色の背景
    },
    support: {
      label: "CareSmily 居宅支援",
      icon: <Users className="h-5 w-5 mr-2" />,
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
      <div className="flex w-full relative h-[100px] overflow-hidden">
        {(Object.keys(tabs) as Array<keyof typeof tabs>).map(
          (tabKey, index) => {
            const isActive = activeTab === tabKey;
            const tab = tabs[tabKey];
            return (
              <div
                key={tabKey}
                ref={(el) => (tabRefs.current[index] = el)}
                className="h-[80px] md:h-[100px] flex items-center justify-center cursor-pointer relative transition-all duration-300"
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
                <div className="relative flex items-center justify-center">
                  <div className="flex items-center text-white font-bold text-sm md:text-base lg:text-lg">
                    {tab.icon}
                    <span className="truncate">{tab.label}</span>
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
          minHeight: contentHeight > 0 ? `${contentHeight}px` : "auto",
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
