"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, FileText, Clock, Users, ArrowRight, Clipboard, BarChart } from "lucide-react"

export default function CareManagerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-r from-primary to-[#55C6F5] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">CareSmily ケアマネージャー</h1>
            <p className="text-lg md:text-xl opacity-90">
              ケアマネージャー業務を効率化する文例データベースで、ケアプラン作成の時間を大幅に削減
            </p>
          </div>
        </div>
      </div>

      {/* メイン概要セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  ケアプラン作成を<span className="text-primary">効率化</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  CareSmily
                  ケアマネージャーは、居宅介護支援事業所向けに特化した文例データベースを提供し、ケアプラン作成業務を大幅に効率化します。アセスメント、サービス担当者会議、モニタリングなど、あらゆる書類作成をサポートします。
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "1,500件以上の専門家監修による高品質な文例",
                    "ケアプラン・アセスメントに特化した文例データベース",
                    "記録作成時間を最大50%削減",
                    "初心者でもプロ級のケアプランが作成可能",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                    <Link href="/online-meeting">無料デモを予約する</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/document-request">資料をダウンロード</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl transform rotate-3 scale-95 opacity-70"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uWxXB2Ol5VIXSxz6PzZSs7G9cdmxeF.png"
                  alt="CareSmily ケアマネージャー画面イメージ"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主な機能セクション */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">主な機能</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ケアマネージャーの業務効率化に特化した機能を多数搭載しています
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "アセスメント文例",
                  description:
                    "利用者の状態や生活環境に合わせたアセスメント文例を豊富に用意。選ぶだけで高品質なアセスメントが完成します。",
                },
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "ケアプラン文例",
                  description: "利用者のニーズや目標に基づいた居宅サービス計画書の文例を提供します。",
                },
                {
                  icon: <Clipboard className="h-10 w-10 text-primary" />,
                  title: "サービス担当者会議",
                  description: "サービス担当者会議の記録や照会文書の文例を用意。効率的な多職種連携をサポートします。",
                },
                {
                  icon: <BarChart className="h-10 w-10 text-primary" />,
                  title: "モニタリング支援",
                  description: "定期的なモニタリングに必要な文例を提供し、効果的な支援経過の記録をサポートします。",
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "時間短縮機能",
                  description:
                    "よく使う文例をお気に入り登録したり、過去の記録を簡単に検索・再利用できる機能で時間を大幅に短縮。",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "チーム共有機能",
                  description: "事業所内で文例を共有でき、ベテランの知識を組織の財産として活用できます。",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-blue-50 p-4 rounded-full inline-block mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 導入効果セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">導入効果</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                CareSmily ケアマネージャーを導入した事業所様からは、以下のような効果が報告されています
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "ケアプラン作成時間の削減",
                  value: "50%",
                  description: "ケアプランやアセスメントの作成時間が大幅に短縮され、利用者様との面談時間が増えました",
                },
                {
                  title: "担当件数の増加",
                  value: "20%",
                  description: "業務効率化により、ケアマネージャー一人あたりの担当件数を増やすことができました",
                },
                {
                  title: "利用者満足度の向上",
                  value: "90%",
                  description: "丁寧な面談や細やかなフォローアップが可能になり、サービス満足度が向上しました",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary to-[#55C6F5] p-8 rounded-xl shadow-lg text-white"
                >
                  <h3 className="text-xl font-bold mb-3">{stat.title}</h3>
                  <p className="text-4xl font-bold mb-4">{stat.value}</p>
                  <p className="text-white/90">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 導入事例セクション */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">導入事例</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                実際にCareSmily ケアマネージャーを導入された事業所様の声をご紹介します
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full mr-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">中規模居宅介護支援事業所</h3>
                  <p className="text-gray-600">ケアマネージャー：5名</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-primary mb-2">課題</h4>
                <p className="text-gray-600">
                  ケアプラン作成やアセスメントに時間がかかり過ぎて、利用者様との面談時間が十分に取れない状況でした。特に新人ケアマネージャーの育成に多くの時間を要していました。
                </p>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-primary mb-2">解決策</h4>
                <p className="text-gray-600">
                  CareSmily
                  ケアマネージャー導入により、文例を活用した効率的なケアプラン作成が可能になりました。また、ベテランケアマネージャーの知識を文例として共有することで、新人教育の効率化も実現しました。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">導入効果</h4>
                <ul className="space-y-2">
                  {[
                    "ケアプラン作成時間が50%削減",
                    "新人ケアマネージャーの育成期間が3ヶ月短縮",
                    "利用者様との面談時間が1.5倍に増加",
                    "担当件数が一人あたり平均5件増加",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/case-studies" className="inline-flex items-center">
                  もっと事例を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 料金セクション */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">料金プラン</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                事業所の規模に合わせた柔軟な料金プランをご用意しています
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">ケアマネージャー向けプラン</h3>
              <div className="flex justify-center mb-8">
                <div className="bg-blue-50 px-6 py-3 rounded-full">
                  <p className="text-xl font-bold text-primary">初期費用 0円</p>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-4xl font-bold text-gray-900 mb-2">月額 20,000円〜</p>
                <p className="text-gray-600">(税抜)</p>
              </div>
              <ul className="space-y-4 mb-8 text-left max-w-md mx-auto">
                {[
                  "ケアプラン文例 1,500件以上",
                  "アセスメント文例",
                  "モニタリング支援機能",
                  "お気に入り登録機能",
                  "チーム共有機能",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-full">
                <Link href="/pricing">料金詳細を見る</Link>
              </Button>
            </div>

            <div className="text-center text-gray-600">
              <p>※ 担当件数や機能によって料金が変動します。詳細は料金ページをご確認ください。</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTAセクション */}
      <section className="py-16 bg-gradient-to-r from-primary to-[#55C6F5] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">ケアマネージャー業務の効率化を実現しませんか？</h2>
            <p className="text-xl mb-8">
              まずは無料デモで、CareSmily ケアマネージャーによる業務改善効果を体験してください。
              <br />
              専門スタッフが丁寧にご説明させていただきます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
                <Link href="/online-meeting">無料デモのお申し込み</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20"
              >
                <Link href="/document-request">資料ダウンロード</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

