import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// ScrollTriggerProviderをインポート
import ScrollTriggerProvider from "@/components/scroll-trigger-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
      <head>
        {/* Google Tag Manager */}
        <Script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KPSGLZQ9');
         `}
        </Script>     
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="6iHHaoEeCbFvwEyCltecm3Qy9OpoHeHdkwXjlQtajLU"
        />
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-80CTB418JR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-80CTB418JR');
          `}
        </Script>   
        {/* もしもアフェリエイト Script */}
        <Script
          src="https://r.moshimo.com/af/r/maftag.js"
        >
        </Script>
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
        {/* Google Tag Manager */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPSGLZQ9"
        height="0" width="0" style={{display: 'none', visibility: 'hidden'}}>
          </iframe>
        </noscript>
        <Header />
        <main className="pt-16">
          <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
