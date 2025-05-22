"use client"

import { useState } from "react"
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
  },
  {
    id: 7,
    title: "BCPを活用した災害対策の重要性",
    description: "事業継続計画（BCP）の基本的な考え方と災害時の対応方法について解説",
    date: "2025/01/15",
    category: "bcp",
    categoryLabel: "BCP",
    categoryColor: "bg-red-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-red-100 to-orange-200"
  },
  {
    id: 8,
    title: "介護現場でのICT活用事例",
    description: "最新のICT技術を活用した効率的な介護業務の実現方法",
    date: "2025/01/10",
    category: "ict",
    categoryLabel: "ICT",
    categoryColor: "bg-purple-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-purple-100 to-pink-200"
  },
  {
    id: 9,
    title: "組合会における新制度導入のお知らせ",
    description: "来年度から適用される新制度について詳しく説明します",
    date: "2024/12/25",
    category: "association",
    categoryLabel: "組合会",
    categoryColor: "bg-yellow-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-yellow-100 to-orange-200"
  },
  {
    id: 10,
    title: "減災・防災対策の最新動向",
    description: "自然災害に備えた効果的な減災対策について",
    date: "2024/12/20",
    category: "disaster-prevention",
    categoryLabel: "減災防災",
    categoryColor: "bg-orange-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-orange-100 to-red-200"
  },
  {
    id: 11,
    title: "業務効率化のための新システム導入",
    description: "日常業務を効率化する新しいシステムの活用方法をご紹介",
    date: "2024/12/15",
    category: "efficiency",
    categoryLabel: "業務効率化",
    categoryColor: "bg-indigo-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-indigo-100 to-blue-200"
  },
  {
    id: 12,
    title: "介護知識の基礎から応用まで",
    description: "介護業務に必要な基礎知識と実践的なノウハウを解説",
    date: "2024/12/10",
    category: "knowledge",
    categoryLabel: "知識",
    categoryColor: "bg-green-600",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-green-100 to-teal-200"
  },
  {
    id: 13,
    title: "新サービス開発における品質管理",
    description: "開発プロセスにおける品質管理の重要性と実践方法",
    date: "2024/12/05",
    category: "development",
    categoryLabel: "開発",
    categoryColor: "bg-teal-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-teal-100 to-cyan-200"
  },
  {
    id: 14,
    title: "制度改定に伴う業務変更点の解説",
    description: "今年度の制度改定により変更される業務内容について詳しく説明",
    date: "2024/11/30",
    category: "system-setting",
    categoryLabel: "制度改定",
    categoryColor: "bg-slate-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-slate-100 to-gray-200"
  },
  {
    id: 15,
    title: "利用者満足度向上のための取り組み",
    description: "利用者の満足度を高めるための具体的な施策について",
    date: "2024/11/25",
    category: "care",
    categoryLabel: "介護業界",
    categoryColor: "bg-cyan-500",
    image: "/api/placeholder/300/150",
    bgColor: "bg-gradient-to-br from-cyan-100 to-blue-200"
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
            <Card key={column.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              {/* サムネイル画像エリア */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 ${column.bgColor}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* サムネイル代替表示 */}
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-white/30 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-white/80 text-xs font-medium">サムネイル</p>
                    </div>
                  </div>
                </div>
                
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
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            {/* 前のページボタン */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* ページ番号 */}
            {(() => {
              const pages = []
              const maxVisiblePages = 5
              
              if (totalPages <= maxVisiblePages) {
                // 総ページ数が少ない場合、すべて表示
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i)
                }
              } else {
                // 最初のページ
                pages.push(1)
                
                // 現在のページ周辺
                let start = Math.max(2, currentPage - 1)
                let end = Math.min(totalPages - 1, currentPage + 1)
                
                // 最初のページとの間に省略記号が必要か
                if (start > 2) {
                  pages.push('...')
                }
                
                // 現在のページ周辺のページ番号
                for (let i = start; i <= end; i++) {
                  if (i !== 1 && i !== totalPages) {
                    pages.push(i)
                  }
                }
                
                // 最後のページとの間に省略記号が必要か
                if (end < totalPages - 1) {
                  pages.push('...')
                }
                
                // 最後のページ
                if (totalPages > 1) {
                  pages.push(totalPages)
                }
              }
              
              return pages.map((page, index) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  )
                }
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-10 h-10 transition-all duration-200 ${
                      currentPage === page
                        ? "bg-cyan-500 text-white shadow-lg hover:bg-cyan-600"
                        : "text-gray-600 hover:text-cyan-600 hover:border-cyan-300"
                    }`}
                  >
                    {page}
                  </Button>
                )
              })
            })()}

            {/* 次のページボタン */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ページ情報 */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            {filteredColumns.length}件中 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredColumns.length)}件を表示
            （ページ {currentPage} / {totalPages}）
          </div>
        )}
      </div>
    </div>
  )
}