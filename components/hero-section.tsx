"use client";

import React from "react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50 z-[-2]"
        style={{ backgroundColor: 'rgb(168 224 255)' }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-sky-100/10 to-green-100/10 rounded-bl-[25rem] z-0" />
      <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-40 blur-3xl z-[-1]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-200 rounded-full opacity-40 blur-3xl z-[-1]" />

      <div className="container max-w-7xl mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h5 className="text-lg text-blue-500 font-semibold mb-2">介護業務効率化アプリ</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900">
              膨大な
              <span className="bg-gradient-to-r from-sky-400 to-green-400 bg-clip-text text-transparent">文例</span>×
              <span className="bg-gradient-to-r from-sky-400 to-green-400 bg-clip-text text-transparent">選択</span>で<br />
              <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-sky-400 after:to-green-400">
                あなたのケアプランが
              </span><br />
              <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-sky-400 after:to-green-400">
                瞬時に形になる
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              介護現場の書類作成時間を<strong>60%削減</strong>する文例特化型アプリ。
              <strong>10万件以上</strong>の専門家監修文例で、あなたの業務を革新します。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="bg-gradient-to-r from-sky-400 to-green-400 text-white font-medium py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                無料トライアル開始
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a 
                href="#" 
                className="border border-blue-400 text-blue-500 font-medium py-4 px-8 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                資料請求はこちら
              </a>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Hero image */}
              <div className="bg-white rounded-2xl shadow-2xl p-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pYmB0RUGTP2903l3LdsnKif1ib8ybK.png"
                  alt="CareSmily アプリ画面"
                  className="rounded-xl w-full"
                />
              </div>

              {/* Floating highlight cards */}
              <div className="absolute -top-10 -left-10 w-48 bg-white rounded-lg shadow-lg p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#3b82f6"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">記録作成時間</p>
                  <p className="text-xl font-bold text-blue-500">60%削減</p>
                </div>
              </div>

              <div className="absolute -bottom-10 right-0 w-52 bg-white rounded-lg shadow-lg p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#22c55e"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">文例データベース</p>
                  <p className="text-xl font-bold text-green-500">10万件以上</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-500 tabular-nums">
              60%
            </div>
            <p className="text-gray-600">記録作成時間削減</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-green-500 tabular-nums">
              10万+
            </div>
            <p className="text-gray-600">専門家監修文例数</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-teal-500 tabular-nums">
              92%
            </div>
            <p className="text-gray-600">利用者満足度</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl md:text-4xl font-bold mb-2 text-cyan-500 tabular-nums">
              8<span className="text-lg">時間/月</span>
            </div>
            <p className="text-gray-600">残業時間削減</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
