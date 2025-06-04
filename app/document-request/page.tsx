"use client";
import { useEffect, useRef } from "react";

export default function DocumentRequestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ----- マウント時 -----
    const script = document.createElement("script");
    script.id = "_bownow_cs_sid_0d095ce895393bcc2770";
    script.charset = "utf-8";
    script.src =
      "https://contents.bownow.jp/forms/sid_0d095ce895393bcc2770/trace.js";
    containerRef.current?.appendChild(script);

    // ----- アンマウント時（別ページに遷移したら） -----
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // iframe も丸ごと除去
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-300 to-cyan-400 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              資料請求
            </h1>
            <p className="text-lg">
              CareSmily の詳しい資料をご希望の方は、以下のフォームよりお申し込みください。
              <br />
              ご入力いただいたメールアドレスに、資料をお送りいたします。
            </p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto py-16">
          {/* BowNow フォームがここに出る */}
          <div
            ref={containerRef}
            className="bg-white rounded-lg shadow-md p-8 min-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
