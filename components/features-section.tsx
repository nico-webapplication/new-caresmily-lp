"use client";

import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  Award,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="relative bg-white py-20">
      {/* Vertical side text (desktop only) */}
      <div className="hidden xl:block absolute top-0 left-0 h-full pointer-events-none select-none">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-100 rotate-90 origin-top-left ml-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>
      <div className="hidden xl:block absolute top-0 right-0 h-full pointer-events-none select-none">
        <p className="whitespace-nowrap text-[110px] tracking-[0.2em] font-extrabold text-gray-100 rotate-90 origin-top-right mr-[-84px]">
          MEDIA ARTS IN THE DATA  SEE MEDIA ARTS IN THE DATA
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* GRID */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-6 place-items-stretch"
        >
          {/* 1. 就職率 */}
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

          {/* 2. 授業料免除 */}
          <FeatureCard
            color="yellow"
            icon={() => (
              <Image
                src="/icons/money-bag.svg"
                alt="money"
                width={32}
                height={32}
              />
            )}
            headerLines={[
              "2年間の授業料 <br/><span class='text-[64px] leading-none font-extrabold text-orange-500'>最大124万円</span> 免除",
              "独自の学費サポートで進学を応援します!!",
            ]}
          />

          {/* 3. 産学官連携 */}
          <FeatureCard
            color="blue"
            icon={() => <span className="text-3xl">💡</span>}
            headerLines={[
              "産学官連携で現場がわかる!",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>100</span> 件",
              "企業コラボ数  年間",
            ]}
          />

          {/* 4. 創立49年 */}
          <FeatureCard
            color="red"
            icon={() => <span className="text-3xl">❤️</span>}
            headerLines={[
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>49</span> 年",
              "創立",
              "地元に根付き、地域の人々に愛される場所であること",
            ]}
          />

          {/* CENTRE About Us */}
          <AboutCard />

          {/* 5. 国家資格合格率 */}
          <FeatureCard
            color="pink"
            icon={() => <span className="text-3xl">🎉</span>}
            headerLines={[
              "国家資格2級建築士製図試験",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>100%</span>",
              "資格合格率",
            ]}
            footnote="2024年3月 卒業生実績"
          />

          {/* 6. 卒業生 */}
          <FeatureCard
            color="indigo"
            icon={() => <span className="text-3xl">👨‍🎓</span>}
            headerLines={[
              "各業界の最前線で頼れる卒業生が活躍中!!",
              "<span class='text-[64px] leading-none font-extrabold text-orange-500'>2,913</span> 人",
              "卒業生のべ",
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
    <div className={`relative rounded-2xl p-8 ${bg} flex flex-col justify-between`}>
      {/* floating icon */}
      <div className="absolute -top-5 -left-5 bg-white shadow-md rounded-full p-2">
        {Icon()}
      </div>

      {/* body */}
      <div className="space-y-2">
        {headerLines.map((line, idx) => (
          <p
            key={idx}
            className="text-gray-900 font-bold leading-snug"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {footnote && (
        <p className="text-xs text-gray-400 mt-4" dangerouslySetInnerHTML={{ __html: footnote }} />
      )}
    </div>
  );
}

function AboutCard() {
  return (
    <div className="relative bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-12 md:row-span-2 md:col-span-1">
      {/* orange accent squares */}
      <div className="absolute top-4 left-4 w-4 h-4 bg-orange-500 rounded"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 bg-orange-500 rounded"></div>

      {/* child holding laptop */}
      <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl -mt-24 mb-6">
        <Image src="/about-us-boy.png" alt="boy" fill className="object-cover" />
      </div>

      <h3 className="text-3xl font-extrabold text-gray-900 mb-2">About Us</h3>
      <p className="text-sm uppercase tracking-widest text-orange-500 mb-6">メディア・アーツについて</p>
      <p className="text-center text-gray-600 max-w-xs">
        丁寧な個別指導のもと、1人1人のきめ細かい個性を育む「好きなコト」を探す豊かな環境をサポートします。溢れを取り入れながら、オリジナルの魅力を伸ばす手助けを心がけています。
      </p>
      <button className="mt-6 inline-flex items-center gap-1 text-orange-500 font-semibold hover:underline">
        View More
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
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
