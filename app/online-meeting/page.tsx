// app/online-meeting/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function OnlineMeeting() {
  /* ❶ TimeRex カレンダー描画先 */
  const calRef = useRef<HTMLDivElement>(null);
  /* ❸ クライアントサイドのマウント状態 */
  const [isMounted, setIsMounted] = useState(false);

  /* クライアントサイドマウントの検出 */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* --- TimeRex ウィジェット読み込み & アンマウント時掃除 --------- */
  useEffect(() => {
    if (!isMounted || !calRef.current) return;

    const widgetUrl = "https://timerex.net/s/CareSmily/c0de45e9";

    const mount = () =>
      window.TimerexCalendar({
        locale: "ja",
        style: { primaryColor: "#0ea5e9" },
      });

    if (!window.TimerexCalendar) {
      const js = document.createElement("script");
      js.id = "timerex_embed";
      js.async = true;
      js.src = "https://asset.timerex.net/js/embed.js";
      js.onload = mount;
      document.head.appendChild(js);
    } else {
      mount();
    }

    return () => (calRef.current!.innerHTML = "");
  }, [isMounted]);

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
            {/* TimeRex カレンダー（ここだけに描画） */}
            <div
              ref={calRef}
              id="timerex_calendar"
              data-url="https://timerex.net/s/CareSmily/c0de45e9"
              className="min-h-[500px]"
            >
              {!isMounted && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">カレンダーを読み込み中...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 型定義の補助（グローバルに TimeRexWidget が入る） */
declare global {
  interface Window {
    TimerexCalendar: {
      init: (opts: Record<string, unknown>) => void;
    };
  }
}
