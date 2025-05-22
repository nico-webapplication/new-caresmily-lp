"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// カテゴリーデータ
const categories = [
  { id: "all", name: "すべて", active: true },
  { id: "knowledge", name: "知識" },
  { id: "bcp", name: "BCP" },
  { id: "disaster-prevention", name: "減災防災対策" },
  { id: "association", name: "組合会" },
  { id: "exhibition", name: "出展情報" },
  { id: "service", name: "サービス" },
  { id: "development", name: "開発" },
  { id: "care", name: "介護業界" },
  { id: "ict", name: "ICT" },
  { id: "efficiency", name: "業務効率化" },
  { id: "system-setting", name: "制機改定" }
]

// コラムデータ
const columns = [
  {
    id: 1,
    title: "来月5日 CareTEX福岡 出展のお知らせ",
    description: "@マリンメッセ福岡A館",
    date: "2025/05/22",
    dateRange: "25 ～ 26",
    category: "exhibition",
    categoryLabel: "NEW",
    categoryColor: "bg-green-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-teal-100 to-blue-200",
    featured: true
  },
  {
    id: 2,
    title: "もう業務で悩まない！Care-wingの新サービスとは？",
    description: "【新機能】",
    date: "2025/04/30",
    category: "service",
    categoryLabel: "サービス",
    categoryColor: "bg-blue-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-blue-100 to-cyan-200",
    featured: true
  },
  {
    id: 3,
    title: "GW期間も利用者とヘルパーの笑顔を守るためにできること",
    description: "",
    date: "2025/04/28",
    category: "care",
    categoryLabel: "介護業界",
    categoryColor: "bg-cyan-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-gray-100 to-blue-100",
    featured: true
  },
  {
    id: 4,
    title: "職員のストレス理解とメンタルヘルスケアの方法とは？",
    description: "職員の方誰にも対応！職員のストレス理解とメンタルヘルスケアの方法とは？",
    date: "2025/02/28",
    category: "care",
    categoryLabel: "介護業界",
    categoryColor: "bg-cyan-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-teal-100 to-blue-200"
  },
  {
    id: 5,
    title: "手書き？Excelソフト？勤怠管理のベストな方法とは？",
    description: "",
    date: "2025/02/14",
    category: "ict",
    categoryLabel: "システム",
    categoryColor: "bg-pink-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-pink-100 to-red-200"
  },
  {
    id: 6,
    title: "職員ひとりひとり輝ける職場環境づくりのヒント",
    description: "離職防止にとって重要な要素！職員のためにできる、働きやすい職場環境づくりのヒント",
    date: "2025/01/30",
    category: "care",
    categoryLabel: "介護業界",
    categoryColor: "bg-cyan-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-blue-100 to-cyan-200"
  }
]

export default function ColumnPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // フィルタリング
  const filteredColumns = activeCategory === "all" 
    ? columns 
    : columns.filter(column => column.category === activeCategory)

  // ページネーション
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedColumns = filteredColumns.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">カテゴリー</h1>
        </div>

        {/* カテゴリーフィルター */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentPage(1)
              }}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "bg-white text-gray-600 border-gray-300 hover:border-cyan-300 hover:text-cyan-600"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* コラムカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedColumns.map((column) => (
            <Link key={column.id} href={`/column/${column.id}`}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                {/* サムネイル画像エリア */}
                <div className="relative h-48 overflow-hidden">
                  {/* 背景画像 */}
                  {column.image ? (
                    <img 
                      src={column.image} 
                      alt={column.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${column.bgColor}`} />
                  )}
                  
                  {/* オーバーレイ（テキストの可読性向上） */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* カテゴリーバッジ */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${column.categoryColor} text-white px-3 py-1 text-sm font-medium shadow-lg`}>
                      {column.categoryLabel}
                    </Badge>
                  </div>

                  {/* 日付範囲（特別なイベントの場合） */}
                  {column.dateRange && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="flex items-center text-gray-800">
                          <span className="text-lg font-bold">{column.dateRange.split('～')[0]}</span>
                          <span className="mx-2">～</span>
                          <span className="text-lg font-bold">{column.dateRange.split('～')[1]}</span>
                          <span className="ml-2 text-orange-500">●</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* コンテンツエリア */}
                <CardContent className="p-4">
                  {/* タイトル */}
                  <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
                    {column.title}
                  </h3>
                  
                  {/* 説明文 */}
                  {column.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {column.description}
                    </p>
                  )}

                  {/* 日付 */}
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-500 text-sm font-medium">
                      {column.date}
                    </span>
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                      <svg className="w-3 h-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 ${
                  currentPage === page
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600 hover:text-cyan-600"
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}