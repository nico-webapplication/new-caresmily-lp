"use client";

import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="relative bg-white py-20">
      {/* Vertical side text (desktop only) */}
      <div className="hidden xl:block absolute top-0 left-0 h-full pointer-events-none select-none">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-100 rotate-90 origin-top-left ml-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>
      <div className="hidden xl:block absolute top-0 right-0 h-full pointer-events-none select-none">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-100 rotate-90 origin-top-right mr-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2列3行グリッドレイアウト */}
        <div className="relative w-full max-w-6xl mx-auto hidden md:block">
          
          {/* 6つのカードのグリッド配置 */}
          <div className="grid grid-cols-2 gap-x-1">
            
            {/* 左列 */}
            <div className="space-y-8">
              {/* 左上 - 就職率 */}
              <FeatureCard
                color="orange"
                icon={() => <span className="text-3xl">😊</span>}
                headerLines={[
                  "個性を仕事に。",
                  "就職率 <span class='text-[48px] leading-none font-extrabold text-orange-500'>95.2%</span>",
                  "徹底した就職サポート",
                ]}
                footnote="2025年3月 卒業生実績"
              />

              {/* 左中 - 創立49年 */}
              <FeatureCard
                color="red"
                icon={() => <span className="text-3xl">❤️</span>}
                headerLines={[
                  "創立",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>49</span> 年",
                  "地元に根付き、地域の人々に愛される場所であること",
                ]}
              />

              {/* 左下 - 卒業生 */}
              <FeatureCard
                color="indigo"
                icon={() => <span className="text-3xl">👨‍🎓</span>}
                headerLines={[
                  "各業界の最前線で頼れる卒業生が活躍中!!",
                  "卒業生のべ",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
                ]}
                footnote="2024年3月 卒業生実績"
              />
            </div>

            {/* 右列 */}
            <div className="space-y-8">
              {/* 右上 - 授業料免除 */}
              <FeatureCard
                color="yellow"
                icon={() => <span className="text-3xl">📚</span>}
                headerLines={[
                  "2年間の授業料",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
                  "独自の学費サポートで進学を応援します!!",
                ]}
              />

              {/* 右中 - 産学官連携 */}
              <FeatureCard
                color="blue"
                icon={() => <span className="text-3xl">🏆</span>}
                headerLines={[
                  "産学官連携で現場がわかる!",
                  "企業コラボ数 年間",
                  "<span class='text-[48px] leading-none font-extrabold text-orange-500'>100</span> 件",
                ]}
              />

              {/* 右下 - 国家資格合格率 */}
              <FeatureCard
                color="pink"
                icon={() => <span className="text-3xl">🎉</span>}
                headerLines={[
                  "少人数ならではのサポート体制!",
                  "国家資格2級建築士製図試験",
                  "資格合格率 <span class='text-[48px] leading-none font-extrabold text-orange-500'>100%</span>",
                ]}
                footnote="2024年3月 卒業生実績"
              />
            </div>
          </div>

          {/* 中央 - About Us （楕円形、テキストに重ならない位置） */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <AboutCard />
          </div>

        </div>

        {/* モバイル用の縦積みレイアウト */}
        <div className="md:hidden space-y-6">
          <div className="mx-auto max-w-sm">
            <AboutCard />
          </div>
          
          <FeatureCard
            color="orange"
            icon={() => <span className="text-3xl">😊</span>}
            headerLines={[
              "個性を仕事に。",
              "就職率 <span class='text-[64px] leading-none font-extrabold text-orange-500'>95.2%</span>",
              "徹底した就職サポート",
            ]}
            footnote="2025年3月 卒業生実績"
          />

          <FeatureCard
            color="yellow"
            icon={() => <span className="text-3xl">📚</span>}
            headerLines={[
              "2年間の授業料",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
              "独自の学費サポートで進学を応援します!!",
            ]}
          />

          <FeatureCard
            color="blue"
            icon={() => <span className="text-3xl">🏆</span>}
            headerLines={[
              "産学官連携で現場がわかる!",
              "企業コラボ数 年間",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>100</span> 件",
            ]}
          />

          <FeatureCard
            color="red"
            icon={() => <span className="text-3xl">❤️</span>}
            headerLines={[
              "創立",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>49</span> 年",
              "地元に根付き、地域の人々に愛される場所であること",
            ]}
          />

          <FeatureCard
            color="pink"
            icon={() => <span className="text-3xl">🎉</span>}
            headerLines={[
              "少人数ならではのサポート体制!",
              "国家資格2級建築士製図試験",
              "資格合格率 <span class='text-[64px] leading-none font-extrabold text-orange-500'>100%</span>",
            ]}
            footnote="2024年3月 卒業生実績"
          />

          <FeatureCard
            color="indigo"
            icon={() => <span className="text-3xl">👨‍🎓</span>}
            headerLines={[
              "各業界の最前線で頼れる卒業生が活躍中!!",
              "卒業生のべ",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
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
    <div className={`relative rounded-2xl p-6 ${bg} flex flex-col justify-between w-full min-h-[240px]`}>
      {/* floating icon */}
      <div className="absolute -top-3 -left-3 bg-white shadow-md rounded-full p-2">
        {Icon()}
      </div>

      {/* body */}
      <div className="space-y-2">
        {headerLines.map((line, idx) => (
          <p
            key={idx}
            className="text-gray-900 font-bold leading-tight text-sm"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {footnote && (
        <p className="text-xs text-gray-400 mt-3" dangerouslySetInnerHTML={{ __html: footnote }} />
      )}
    </div>
  );
}

function AboutCard() {
  return (
    <div 
      className="relative bg-white shadow-xl flex flex-col items-center justify-center p-6 w-64 h-80 border-2 border-orange-200"
      style={{
        clipPath: 'ellipse(50% 65% at 50% 50%)',
        borderRadius: '50%'
      }}
    >
      {/* decorative elements */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-500 rounded"></div>
      <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded transform rotate-12"></div>
      <div className="absolute bottom-4 left-4 w-2 h-4 bg-blue-500 rounded"></div>

      {/* circular background for image */}
      <div className="relative w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center mb-3 overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <Image 
            src="/about-us-boy.png" 
            alt="Student with laptop" 
            width={50} 
            height={50}
            className="object-contain"
          />
        </div>
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold leading-tight text-center">
          設備が<br/>整ってる
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 mb-1">About Us</h3>
      <p className="text-xs uppercase tracking-widest text-orange-500 mb-3">メディア・アーツについて</p>
      <p className="text-center text-gray-600 text-xs max-w-xs leading-relaxed px-2">
        丁寧な個別指導で、1人1人がもっと自分らしい個性を育む「好きなコト」を全力でお手伝いします。
      </p>
      <button className="mt-3 inline-flex items-center gap-1 text-orange-500 font-semibold hover:underline bg-orange-100 px-3 py-1 rounded-full text-xs">
        View More
        <ChevronRightIcon />
      </button>
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