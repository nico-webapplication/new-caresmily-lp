"use client";

import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="relative bg-white py-25">
      <div className="relative z-10 mx-auto max-w-8xl px-5 sm:px-8 lg:px-10">
        {/* 左寄せの縦積みレイアウト */}
        <div className="relative w-full max-w-4xl hidden md:block">
          
          {/* 5つのカードの左寄せ配置 */}
          <div className="flex flex-col items-start space-y-4 max-w-md">
            {/* 01 - Expert Database */}
            <FeatureCard
              color="blue"
              icon={() => <span className="text-xl font-bold text-blue-600">01</span>}
              headerLines={[
                "10万件超の専門家監修",
                '"文例データベース"',
              ]}
            />

            {/* 02 - Quick Copy & Paste */}
            <FeatureCard
              color="blue"
              icon={() => <span className="text-xl font-bold text-blue-600">02</span>}
              headerLines={[
                "検索・カテゴリ選択 →",
                "コピー＆ペーストで瞬時作成",
              ]}
            />

            {/* 03 - Question Builder */}
            <FeatureCard
              color="blue"
              icon={() => <span className="text-xl font-bold text-blue-600">03</span>}
              headerLines={[
                '"質問形式ビルダー"による',
                "レコメンド挿入",
              ]}
            />

            {/* 04 - All-in-One Solution */}
            <FeatureCard
              color="blue"
              icon={() => <span className="text-xl font-bold text-blue-600">04</span>}
              headerLines={[
                "書類テンプレ内での編集・",
                "PDF／印刷まで ワンストップ",
              ]}
            />

            {/* 05 - Cloud Access */}
            <FeatureCard
              color="blue"
              icon={() => <span className="text-xl font-bold text-blue-600">05</span>}
              headerLines={[
                "簡単にアクセス可能で",
                "シンプルなアプリケーション",
              ]}
            />
          </div>

        </div>

        {/* モバイル用の縦積みレイアウト */}
        <div className="md:hidden space-y-8">
          <div className="mx-auto max-w-md">
            <AboutCard />
          </div>
          
          <FeatureCard
            color="orange"
            icon={() => <span className="text-3xl">😊</span>}
            headerLines={[
              "個性を仕事に。",
              "就職率 <span class='text-[80px] leading-none font-extrabold text-orange-500'>95.2%</span>",
              "徹底した就職サポート",
            ]}
            footnote="2025年3月 卒業生実績"
          />

          <FeatureCard
            color="yellow"
            icon={() => <span className="text-3xl">📚</span>}
            headerLines={[
              "2年間の授業料",
              "<span class='text-[80px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
              "独自の学費サポートで進学を応援します!!",
            ]}
          />

          <FeatureCard
            color="blue"
            icon={() => <span className="text-3xl">🏆</span>}
            headerLines={[
              "産学官連携で現場がわかる!",
              "企業コラボ数 年間",
              "<span class='text-[80px] leading-none font-extrabold text-orange-500'>100</span> 件",
            ]}
          />

          <FeatureCard
            color="red"
            icon={() => <span className="text-3xl">❤️</span>}
            headerLines={[
              "創立",
              "<span class='text-[80px] leading-none font-extrabold text-orange-500'>49</span> 年",
              "地元に根付き、地域の人々に愛される場所であること",
            ]}
          />

          <FeatureCard
            color="pink"
            icon={() => <span className="text-3xl">🎉</span>}
            headerLines={[
              "少人数ならではのサポート体制!",
              "国家資格2級建築士製図試験",
              "資格合格率 <span class='text-[80px] leading-none font-extrabold text-orange-500'>100%</span>",
            ]}
            footnote="2024年3月 卒業生実績"
          />

          <FeatureCard
            color="indigo"
            icon={() => <span className="text-3xl">👨‍🎓</span>}
            headerLines={[
              "各業界の最前線で頼れる卒業生が活躍中!!",
              "卒業生のべ",
              "<span class='text-[80px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
            ]}
            footnote="2024年3月 卒業生実績"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */

interface FeatureCardProps {
  color: "orange" | "yellow" | "red" | "blue" | "pink" | "indigo";
  icon: () => React.ReactNode;
  headerLines: string[]; // Strings can include basic HTML span for inline sizes/colours.
  footnote?: string;
}

function FeatureCard({ color, icon: Icon, headerLines, footnote }: FeatureCardProps) {
  const bg = {
    orange: "bg-[#F8F5F2]",
    yellow: "bg-[#F8F5F2]",
    red: "bg-[#F8F5F2]",
    blue: "bg-[#F8F5F2]",
    pink: "bg-[#F8F5F2]",
    indigo: "bg-[#F8F5F2]",
  }[color];

  return (
    <div className={`relative rounded-3xl p-4 ${bg} flex flex-col justify-between w-full max-w-sm min-h-[120px]`}>
      {/* floating icon */}
      <div className="absolute -top-2 -left-2 bg-white shadow-md rounded-full p-2 text-sm">
        {Icon()}
      </div>

      {/* body */}
      <div className="space-y-1 ml-8">
        {headerLines.map((line, idx) => (
          <p
            key={idx}
            className="text-gray-900 font-bold leading-tight text-sm"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {footnote && (
        <p className="text-xs text-gray-400 mt-2 ml-8" dangerouslySetInnerHTML={{ __html: footnote }} />
      )}
    </div>
  );
}

function AboutCard() {
  return (
    <div className="relative w-90 h-[800px] bg-white rounded-full flex flex-col items-center justify-top">

      {/* Central image with orange background */}
      <div className="relative w-50 h-50 rounded-full bg-orange-500 flex items-center justify-center mb-10 overflow-hidden">     
          <Image 
            src="/about-us-boy.png" 
            alt="Student with laptop" 
            width={50} 
            height={50}
            className="object-contain"
          />
        {/* Speech bubble */}
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-[10px] px-2 py-1.5 rounded-full font-bold leading-tight whitespace-nowrap">
          設備が<br/>整ってる
        </div>
      </div>

      {/* Title */}
      <h3 className="text-5xl font-extrabold text-gray-900 mb-1.5">Advantages </h3>
      <h3 className="text-5xl font-extrabold text-gray-900 mb-1.5">of</h3>
      <h3 className="text-5xl font-extrabold text-gray-900 mb-1.5">Introduction</h3>
      
      {/* Subtitle */}
      <p className="text-2xl text-orange-500 mb-10 font-medium">導入メリット</p>
      
      {/* Description text */}
      <p className="text-center text-gray-700 text-lg max-w-60 leading-relaxed px-5 mb-5">
        CareSmilyを導入することは、介護現場にたくさんのメリットをもたらします。
      </p>
      
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}