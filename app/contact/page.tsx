"use client";
import { useEffect, useRef } from "react";

export default function ContactPage() {
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
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">お問い合わせ</h1>

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
