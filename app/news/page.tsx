"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

function NewsItem({ date, category, content }) {
  const renderContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="text-sm text-gray-500 mb-2">
        {date} - {category}
      </div>
      <p className="text-gray-700 whitespace-pre-line">{renderContent(content)}</p>
    </div>
  );
}

const newsItems = [
  // {
  //   date: "2024年1月24日",
  //   category: "サービス更新",
  //   content: "低価格な新サービス体系を発表致しました。",
  // },
  {
    date: "2025年4月1日",
    category: "新機能",
    content: "CareSmilyデイサービス リリース",
  },
  {
    date: "2025年4月9日",
    category: "メディア",
    content: "CareSmily プレスリリースを掲載①\n※詳細はメディア情報をご確認ください。",
  },
  {
    date: "2025年5月8日",
    category: "メディア",
    content: "CareSmily プレスリリースを掲載②\n※詳細はメディア情報をご確認ください",
  },
];

export default function NewsPage() {
  const [visibleItems, setVisibleItems] = useState(5);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-r from-primary to-[#55C6F5] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              お知らせ一覧
            </h1>
            <p className="text-lg md:text-xl opacity-90"></p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              ホームに戻る
            </Link>
          </div>

          <div className="space-y-6">
            {newsItems.slice(0, visibleItems).map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </div>

          {visibleItems < newsItems.length && (
            <div className="text-center mt-8">
              <Button
                onClick={loadMore}
                variant="outline"
                className="rounded-full"
              >
                もっと見る
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
