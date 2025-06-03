"use client";

import { useEffect } from "react";

export default function HeroCentered() {
  useEffect(() => {
    // Initialize AOS if available
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 1000,
          easing: "ease-out",
          once: true,
        });
      });
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/hero-video2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/50"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6">
          {/* Main Heading with Centered 簡単選択 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            <div className="mb-4">膨大な専門家監修の文例</div>
            
            {/* Centered Cross Symbol */}
            <div className="flex justify-center my-6">
              <span className="text-6xl md:text-7xl lg:text-8xl text-red-500 font-bold">×</span>
            </div>
            
            {/* Centered 簡単選択 Text */}
            <div className="mb-6">
              <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 block">
                簡単選択
              </span>
            </div>
            
            {/* Underlined Text */}
            <div className="space-y-2">
              <div className="relative inline-block">
                <span className="text-3xl md:text-4xl lg:text-5xl">あなただけのケアプランが</span>
                <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded"></div>
              </div>
              <div className="relative inline-block">
                <span className="text-3xl md:text-4xl lg:text-5xl">瞬時に形になる</span>
                <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded"></div>
              </div>
            </div>
          </h1>

          {/* Description */}
          <div className="max-w-2xl mx-auto mt-8">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              介護現場の書類作成時間を<strong className="text-gray-800">60%削減</strong>する文例特化型アプリ。
              <br />
              <strong className="text-gray-800">10万件以上</strong>の専門家監修文例で、あなたの業務を革新します。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="/online-meeting"
              className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-w-[280px]"
            >
              オンライン面談を予約
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a
              href="/document-request"
              className="group bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center min-w-[280px]"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              資料請求はこちら
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}