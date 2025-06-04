// app/online-meeting/page.tsx
"use client";

import { useEffect, useRef } from "react";

export default function OnlineMeeting() {
  /* ❶ TimeRex カレンダー描画先 */
  const calRef = useRef<HTMLDivElement>(null);
  /* ❷ BowNow フォーム描画先 */
  const formRef = useRef<HTMLDivElement>(null);

  /* --- A. TimeRex 予約確定 → 自前 API へ中継 ------------------------- */
  useEffect(() => {
    const handler = (ev: MessageEvent) => {
      if (ev.data?.type === "timerex:booking.confirmed") {
        fetch("/api/timerex-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ev.data.payload),
        });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  /* --- B. BowNow 送信完了後にカレンダーへスムーズスクロール ---------- */
  useEffect(() => {
    const obs = new MutationObserver(() => {
      if (document.querySelector(".bownow-end-message") && calRef.current) {
        calRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* --- C. BowNow フォームを所定位置へ埋め込み & アンマウント時掃除 --- */
  useEffect(() => {
    if (!formRef.current) return;

    const script = document.createElement("script");
    script.id = "_bownow_cs_sid_cd4980c99e6a9ee47d50";
    script.charset = "utf-8";
    script.src =
      "https://contents.bownow.jp/forms/sid_cd4980c99e6a9ee47d50/trace.js";
    formRef.current.appendChild(script);

    /* ページ遷移時に iframe ごと除去 */
    return () => {
      formRef.current!.innerHTML = "";
    };
  }, []);

  /* --- D. TimeRex ウィジェット読み込み & アンマウント時掃除 --------- */
  useEffect(() => {
    if (!calRef.current) return;

    /* すでに読み込まれていれば再読み込みしない */
    if (!window.TimeRexWidget) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://asset.timerex.net/js/embed.js"; // ★最新版 URL
      s.onload = () => {
        window.TimeRexWidget.init({
          container: "#timerex-widget",
          url: process.env.TIMEREX_WIDGET_URL!,
          locale: "ja",
          style: { primaryColor: "#0ea5e9" },
        });
      };
      document.head.appendChild(s);
    } else {
      window.TimeRexWidget.init({
        container: "#timerex-widget",
        url: process.env.TIMEREX_WIDGET_URL!,
        locale: "ja",
        style: { primaryColor: "#0ea5e9" },
      });
    }

    /* アンマウント → カレンダー iframe 除去 */
    return () => {
      calRef.current!.innerHTML = "";
    };
  }, []);

  /* ---------------------------- JSX ---------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-300 to-cyan-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              オンライン面談予約
            </h1>
            <p className="text-lg">
              CareSmily の詳しい説明をオンラインでご案内いたします。
              <br />
              ご希望の日時をお選びください。
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md min-h-[400px]">
            {/* BowNow フォーム（ここだけに描画） */}
            <div ref={formRef} className="min-h-[400px]" />

            {/* TimeRex カレンダー（ここだけに描画） */}
            <div ref={calRef} id="timerex-widget" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 型定義の補助（グローバルに TimeRexWidget が入る） */
declare global {
  interface Window {
    TimeRexWidget: {
      init: (opts: Record<string, unknown>) => void;
    };
  }
}
