import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// ScrollTriggerProviderをインポート
import ScrollTriggerProvider from "@/components/scroll-trigger-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin" as "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CareSmily",
  description: "介護文例特化型Webアプリケーション",
};

// RootLayoutのbodyにScrollTriggerProvider、Header、Footerを追加
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* BowNow Tracking */}
        <Script id="_bownow_ts">
          {`
            var _bownow_ts = document.createElement('script');
            _bownow_ts.charset = 'utf-8';
            _bownow_ts.src = 'https://contents.bownow.jp/js/UTC_82ae68d5f77f624d01e6/trace.js';
            document.getElementsByTagName('head')[0].appendChild(_bownow_ts);
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
