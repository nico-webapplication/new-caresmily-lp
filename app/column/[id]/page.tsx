"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Share2, Heart } from "lucide-react"

// コラムデータ（実際のアプリではAPIから取得）
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
    image: "/api/placeholder/800/400",
    bgColor: "bg-gradient-to-br from-teal-100 to-blue-200",
    author: "Care-wing 編集部",
    content: `
      <h2>CareTEX福岡への出展について</h2>
      <p>この度、来月5月25日〜26日に開催されるCareTEX福岡に出展することとなりました。マリンメッセ福岡A館での開催となります。</p>
      
      <h3>展示内容</h3>
      <p>今回の展示では、最新の介護支援システム「Care-wing」の新機能をご紹介いたします。特に以下の機能について詳しくデモンストレーションを行います：</p>
      <ul>
        <li>新しいシフト管理機能</li>
        <li>利用者情報の一元管理システム</li>
        <li>モバイル対応の業務記録機能</li>
        <li>AIを活用したケアプラン作成支援</li>
      </ul>
      
      <h3>来場特典</h3>
      <p>ブースにお越しいただいた方には、以下の特典をご用意しております：</p>
      <ul>
        <li>Care-wingの無料トライアル期間延長（3ヶ月→6ヶ月）</li>
        <li>導入時の初期設定費用無料</li>
        <li>専用サポート窓口の優先案内</li>
      </ul>
      
      <h3>セミナー開催</h3>
      <p>会期中には、介護業界のDX化をテーマとしたセミナーも開催予定です。詳細は後日お知らせいたします。</p>
      
      <p>皆様のご来場を心よりお待ちしております。</p>
    `,
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
    image: "/api/placeholder/800/400",
    bgColor: "bg-gradient-to-br from-blue-100 to-cyan-200",
    author: "開発チーム",
    content: `
      <h2>Care-wingの新サービスについて</h2>
      <p>この度、Care-wingに革新的な新機能を追加いたしました。これまで以上に効率的で使いやすいサービスをご提供します。</p>
      
      <h3>主な新機能</h3>
      <h4>1. AI音声入力機能</h4>
      <p>音声で記録を入力できる機能を追加しました。忙しい業務の中でも、手を使わずに素早く記録を残すことができます。</p>
      
      <h4>2. スマートアラート機能</h4>
      <p>利用者の状態変化を自動的に検知し、適切なタイミングでアラートを送信します。見落としを防ぎ、より安全なケアを実現します。</p>
      
      <h4>3. 家族連携機能</h4>
      <p>ご家族との情報共有がより簡単になりました。写真付きの近況報告や、予定の共有などが可能です。</p>
      
      <h3>導入効果</h3>
      <p>新機能により、以下のような効果が期待されます：</p>
      <ul>
        <li>記録作業時間の50%削減</li>
        <li>ミスやヒヤリハットの30%減少</li>
        <li>家族満足度の向上</li>
        <li>職員の業務負担軽減</li>
      </ul>
      
      <p>詳しい使い方については、サポートページをご確認ください。</p>
    `,
    featured: true
  }
]

export default function ColumnDetailPage() {
  const params = useParams()
  const router = useRouter()
  const columnId = parseInt(params.id as string)
  
  // コラムデータを取得
  const column = columns.find(col => col.id === columnId)
  
  if (!column) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">コラムが見つかりません</h1>
          <Button onClick={() => router.push('/column')} className="bg-cyan-500 hover:bg-cyan-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            一覧に戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー画像 */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {column.image ? (
          <img 
            src={column.image} 
            alt={column.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${column.bgColor}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* パンくずナビ */}
        <div className="absolute top-4 left-4 z-10">
          <Button 
            variant="outline" 
            onClick={() => router.push('/column')}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            一覧に戻る
          </Button>
        </div>
        
        {/* カテゴリーバッジ */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className={`${column.categoryColor} text-white px-4 py-2 text-sm font-medium shadow-lg`}>
            {column.categoryLabel}
          </Badge>
        </div>
        
        {/* タイトル */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {column.title}
          </h1>
          {column.description && (
            <p className="text-white/90 text-lg mb-4">{column.description}</p>
          )}
          
          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{column.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{column.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: column.content }}
                  />
                </CardContent>
              </Card>
              
              {/* シェアボタン */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-gray-600 font-medium">この記事をシェア：</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    シェア
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    いいね
                  </Button>
                </div>
              </div>
            </div>
            
            {/* サイドバー */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">記事情報</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">投稿日：</span>
                      <span className="font-medium">{column.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">著者：</span>
                      <span className="font-medium">{column.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">カテゴリー：</span>
                      <Badge className={`${column.categoryColor} text-white ml-1`}>
                        {column.categoryLabel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">関連記事</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm">関連する記事はまだありません。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}