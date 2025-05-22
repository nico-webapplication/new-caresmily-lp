import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// ScrollTriggerProviderをインポート
import ScrollTriggerProvider from "@/components/scroll-trigger-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareSmily",
  description: "介護文例特化型Webアプリケーション",
};

// RootLayoutのbodyにScrollTriggerProviderとHeaderを追加
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
        </main>
      </body>
    </html>
  );
}
