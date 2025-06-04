// app/contact/page.tsx など
"use client";

import Script from "next/script";

export default function ContactPage() {
  return (
    <>
      {/* --- BowNow フォーム本体 --- */}
      <Script
        id="_bownow_cs_sid_0d095ce895393bcc2770"
        src="https://contents.bownow.jp/forms/sid_0d095ce895393bcc2770/trace.js"
        strategy="afterInteractive"   // CSR 時に一度だけ実行
        // ↓必要なら onLoad で初期化処理や console.log を書ける
        // onLoad={() => console.log("BowNow form script loaded")}
      />

      {/* フォームを描画する場所（BowNow 側で自動的に上書きされる）*/}
      <div id="bow-now-form" />
    </>
  );
}
