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
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー画像 */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {columnData.image ? (
          <img 
            src={columnData.image} 
            alt={columnData.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${columnData.bgColor}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* ヘッダーコンテンツ */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <Button 
              onClick={() => router.back()} 
              variant="secondary"
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
            
            <Badge className={`${columnData.categoryColor} text-white px-3 py-1 shadow-lg`}>
              {columnData.categoryLabel}
            </Badge>
          </div>
          
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {columnData.title}
            </h1>
            {columnData.description && (
              <p className="text-white/90 text-sm md:text-base">
                {columnData.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{columnData.date}</span>
              </div>
              {columnData.dateRange && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{columnData.dateRange}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              {/* シェアボタン */}
              <div className="flex justify-end mb-6">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  シェア
                </Button>
              </div>
              
              {/* コンテンツエリア */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                  "--tw-prose-body": "rgb(55 65 81)",
                  "--tw-prose-headings": "rgb(31 41 55)",
                  "--tw-prose-links": "rgb(6 182 212)",
                  "--tw-prose-bold": "rgb(31 41 55)",
                  "--tw-prose-bullets": "rgb(6 182 212)"
                } as React.CSSProperties}
              />
              
              {/* 関連情報 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">関連情報</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}