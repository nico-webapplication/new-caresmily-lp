"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSectionComponent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-[-2] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-50"
        >
          <source src="/hero-video2.mp4" type="video/mp4" />
        </video>
        {/* Semi-transparent overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/40 z-[1]"></div>
      </div>

      {/* Centered Content Container */}
      <div className="w-full max-w-6xl mx-auto px-4 z-10 flex justify-center items-center">
        <div className="w-full text-center flex flex-col items-center justify-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-700 text-center">
            <span className="block">膨大な専門家監修の文例</span>
            <span className="block text-red-500 text-5xl md:text-6xl lg:text-7xl my-4">×</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl">簡単選択</span>
            <span className="block mt-4 relative">
              あなただけのケアプランが
              <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400"></div>
            </span>
            <span className="block mt-2 relative">
              瞬時に形になる
              <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400"></div>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 max-w-2xl text-center">
            介護現場の書類作成時間を<strong>60%削減</strong>する文例特化型アプリ。
            <br />
            <strong>10万件以上</strong>の専門家監修文例で、あなたの業務を革新します。
          </p>

          {/* Button Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/online-meeting"
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center min-w-[240px]"
            >
              オンライン面談を予約
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="/document-request"
              className="bg-blue-50 border-2 border-blue-500 text-blue-500 font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white flex items-center justify-center min-w-[240px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 h-5 w-5"
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
      </div>
    </section>
  );
};

export default HeroSectionComponent;