"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import  Script  from "next/script";

function ThanksContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (!type) return;

    // GTMタグの設定
    let gtmId = "";
    switch (type) {
      case "online-meeting":
        gtmId = "GTM-KPSGLZQ9"; // オンラインミーティング用のGTM-ID
        break;
      case "contact":
        gtmId = "GTM-KPSGLZQ9"; // お問い合わせ用のGTM-ID
        break;
      case "document":
        gtmId = "GTM-KPSGLZQ9"; // 資料請求用のGTM-ID
        break;
      default:
        return;
    }
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(gtmScript);

    // もしもアフィリエイトタグの設定
    // const requestId = localStorage.getItem("requestId");
    // if (!requestId) return;

    // let pcId = "";
    // switch (type) {
    //   case "online-meeting":
    //     pcId = "19203";
    //     break;
    //   case "contact":
    //     pcId = "19205";
    //     break;
    //   case "document":
    //     pcId = "19207";
    //     break;
    //   default:
    //     return;
    // }
    // const script = document.createElement("script");
    // script.src = `https://r.moshimo.com/af/r/result.js?p_id=6721&pc_id=${pcId}&m_v=${requestId}`;
    // script.id = "msmaf";
    // document.body.appendChild(script);
  }, [type]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* もしもアフィリエイトタグの設定 */}
      <Script src={`https://r.moshimo.com/af/r/result.js?p_id=6721&pc_id=${type === 'online-meeting' ? '19203' : type === 'contact' ? '19205' : '19207'}&m_v=${localStorage.getItem('requestId')}`}></Script>
      <noscript>
        <img 
          src={`https://r.moshimo.com/af/r/result?p_id=6721&pc_id=${type === 'online-meeting' ? '19203' : type === 'contact' ? '19205' : '19207'}&m_v=${localStorage.getItem('requestId')}`}
          width="1"
          height="1"
          alt=""
        />
      </noscript>
      
      <h1 className="text-3xl font-bold mb-6">ありがとうございます</h1>
      <p className="text-lg text-gray-600 mb-8">
        {type === "online-meeting" &&
          "オンライン面談のご予約を受け付けました。担当者より折り返しご連絡いたします。"}
        {type === "contact" &&
          "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。"}
        {type === "document" &&
          "資料請求を受け付けました。ご入力いただいたメールアドレスに資料をお送りいたします。"}
      </p>
      <Button asChild>
        <Link href="/">トップページに戻る</Link>
      </Button>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={<div>Loading...</div>}>
          <ThanksContent />
        </Suspense>
      </div>
    </div>
  );
}
