import type React from "react";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
// ScrollTriggerProviderをインポート
import ScrollTriggerProvider from "@/components/scroll-trigger-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "CareSmily",
  description: "介護文例特化型Webアプリケーション",
};

// RootLayoutのbodyにScrollTriggerProvider、Header、Footerを追加
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className}`}>
        <Header />
        <main className="pt-16">
          <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
