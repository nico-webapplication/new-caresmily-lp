"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react"

// コラムデータの型定義
interface ColumnData {
  id: number
  title: string
  description: string
  date: string
  dateRange?: string
  category: string
  categoryLabel: string
  categoryColor: string
  image: string
  bgColor: string
  featured?: boolean
  content?: string
}

// サンプルコラムデータ（実際には外部ファイルから読み込み）
const getColumnData = (id: string): ColumnData | null => {
  const columns = [
    {
      id: 1,
      title: "【介護現場の負担を解消】書類作成時間を60%以上削減するCare Smilyの全貌",
      description: "文例選択だけでケアプラン完成",
      date: "2025/05/22",
      category: "service",
      categoryLabel: "サービス",
      categoryColor: "bg-green-500",
      image: "/images/column1.png",
      bgColor: "bg-gradient-to-br from-teal-100 to-blue-200",
      featured: true
    },
    // {
    //   id: 2,
    //   title: "もう業務で悩まない！Care-wingの新サービスとは？",
    //   description: "【新機能】",
    //   date: "2025/04/30",
    //   category: "service",
    //   categoryLabel: "サービス",
    //   categoryColor: "bg-blue-500",
    //   image: "/api/placeholder/300/150",
    //   bgColor: "bg-gradient-to-br from-blue-100 to-cyan-200",
    //   featured: true
    // },
    // {
    //   id: 3,
    //   title: "来月5日 CareTEX福岡 出展のお知らせ",
    //   description: "@マリンメッセ福岡A館",
    //   date: "2025/05/22",
    //   dateRange: "25 ～ 26",
    //   category: "exhibition",
    //   categoryLabel: "NEW",
    //   categoryColor: "bg-green-500",
    //   image: "/api/placeholder/300/150",
    //   bgColor: "bg-gradient-to-br from-teal-100 to-blue-200",
    //   featured: true
    // },
    // 他のコラムデータ...
  ]
  
  return columns.find(column => column.id === parseInt(id)) || null
}

interface PageProps {
  params: {
    id: string
  }
}

export default function ColumnDetailPage({ params }: PageProps) {
  const router = useRouter()
  const [columnData, setColumnData] = useState<ColumnData | null>(null)
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getColumnData(params.id)
    setColumnData(data)
    
    if (data) {
      // 個別のコラムコンテンツファイルを動的に読み込み
      loadColumnContent(params.id)
    }
    
    setLoading(false)
  }, [params.id])

  const loadColumnContent = async (id: string) => {
    try {
      // HTMLファイルから直接コンテンツを読み込み
      const response = await fetch(`/content/columns/${id}.html`)
      if (response.ok) {
        const htmlContent = await response.text()
        setContent(htmlContent)
      } else {
        setContent("<p>コンテンツが見つかりません。</p>")
      }
    } catch (error) {
      console.error("コンテンツの読み込みに失敗しました:", error)
      setContent("<p>コンテンツの読み込みに失敗しました。</p>")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!columnData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">コラムが見つかりません</h1>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <div className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            onClick={() => router.back()} 
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            戻る
          </Button>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  // ネイティブシェア機能が利用可能な場合
                  navigator.share({
                    title: columnData.title,
                    text: columnData.description,
                    url: window.location.href
                  }).catch(err => console.log('シェアがキャンセルされました'));
                } else {
                  // フォールバック: URLをクリップボードにコピー
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('記事のURLをクリップボードにコピーしました！');
                  }).catch(() => {
                    // さらなるフォールバック: Twitter シェア
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(columnData.title)}&url=${encodeURIComponent(window.location.href)}`;
                    window.open(twitterUrl, '_blank');
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              シェア
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* カテゴリーバッジと日付 */}
        <div className="flex items-center justify-between mb-4">
          <Badge className={`${columnData.categoryColor} text-white px-3 py-1`}>
            {columnData.categoryLabel}
          </Badge>
          <div className="text-sm text-gray-500 flex items-center gap-4">
            <span>公開日：{columnData.date}</span>
            <span>更新日：{columnData.date}</span>
          </div>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {columnData.title}
        </h1>

        {/* サムネイル画像 */}
        <div className="mb-8">
          {columnData.image ? (
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <img 
                src={columnData.image} 
                alt={columnData.title}
                className="w-full h-full object-cover object-center rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className={`w-full rounded-lg ${columnData.bgColor} flex items-center justify-center`} style={{ aspectRatio: '16/9' }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-white/30 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm font-medium">サムネイル</p>
              </div>
            </div>
          )}
        </div>

        {/* コンテンツエリア */}
        <div className="bg-white">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              "--tw-prose-body": "rgb(55 65 81)",
              "--tw-prose-headings": "rgb(17 24 39)",
              "--tw-prose-links": "rgb(6 182 212)",
              "--tw-prose-bold": "rgb(17 24 39)",
              "--tw-prose-bullets": "rgb(6 182 212)"
            } as React.CSSProperties}
          />
        </div>

        {/* 関連情報 */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">関連情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">カテゴリー</h4>
              <Badge variant="secondary">{columnData.categoryLabel}</Badge>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">公開日</h4>
              <p className="text-gray-600">{columnData.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}