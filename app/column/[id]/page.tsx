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
   <!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>【介護現場の負担を解消】書類作成時間を60%以上削減するCare Smilyの全貌｜文例選択だけでケアプラン完成</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Sans JP', sans-serif;
            color: #333;
            background-color: #f8f9fa;
            line-height: 1.7;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .header-gradient {
            background: linear-gradient(90deg, #1a5689 0%, #2c7bb6 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .section {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .section-alt {
            background-color: #e6f3ff;
        }
        
        h1 {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 15px;
            line-height: 1.3;
        }
        
        h2 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #1a5689;
            margin: 25px 0 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #48a78c;
            position: relative;
        }
        
        h2::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 100px;
            height: 3px;
            background-color: #2c7bb6;
        }
        
        h3 {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a5689;
            margin: 20px 0 15px;
            padding-left: 12px;
            border-left: 4px solid #ff7d00;
        }
        
        .highlight {
            background: linear-gradient(transparent 70%, #ffd68a 70%);
            font-weight: 700;
        }
        
        .number-highlight {
            color: #ff5722;
            font-weight: 700;
            font-size: 1.1em;
        }
        
        .info-box {
            background-color: #e8f4ff;
            border-left: 5px solid #2c7bb6;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        
        .warning-box {
            background-color: #fff3e6;
            border-left: 5px solid #ff7d00;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        
        .success-box {
            background-color: #e6f7f2;
            border-left: 5px solid #48a78c;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        
        .cta-button {
            background: linear-gradient(90deg, #ff7d00 0%, #ff5722 100%);
            color: white;
            font-weight: 700;
            padding: 15px 30px;
            border-radius: 50px;
            display: inline-block;
            text-decoration: none;
            text-align: center;
            box-shadow: 0 4px 8px rgba(255, 87, 34, 0.3);
            transition: all 0.3s ease;
            border: none;
            font-size: 1.1rem;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(255, 87, 34, 0.4);
            background: linear-gradient(90deg, #ff5722 0%, #ff7d00 100%);
        }
        
        .feature-icon {
            background-color: #2c7bb6;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 15px;
        }
        
        .benefit-icon {
            background-color: #48a78c;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 15px;
        }
        
        .qa-box {
            border: 1px solid #d1e3f6;
            border-radius: 8px;
            margin-bottom: 15px;
            overflow: hidden;
        }
        
        .qa-question {
            background-color: #e6f3ff;
            padding: 15px 20px;
            font-weight: 700;
            color: #1a5689;
            display: flex;
            align-items: flex-start;
        }
        
        .qa-answer {
            padding: 15px 20px;
            border-top: 1px solid #d1e3f6;
            display: flex;
            align-items: flex-start;
        }
        
        .qa-icon {
            margin-right: 15px;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .q-icon {
            color: #2c7bb6;
        }
        
        .a-icon {
            color: #ff7d00;
        }
        
        .price-box {
            border: 2px solid #2c7bb6;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .price-header {
            background-color: #2c7bb6;
            color: white;
            padding: 15px 20px;
            font-weight: 700;
            font-size: 1.3rem;
            text-align: center;
        }
        
        .price-content {
            padding: 20px;
        }
        
        .price-amount {
            font-size: 2rem;
            font-weight: 700;
            color: #1a5689;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .list-check li {
            position: relative;
            padding-left: 30px;
            margin-bottom: 10px;
        }
        
        .list-check li:before {
            content: '\f00c';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            position: absolute;
            left: 0;
            color: #48a78c;
        }
        
        .note {
            font-size: 0.9rem;
            color: #666;
            margin-top: 10px;
        }
        
        .divider {
            height: 3px;
            background: linear-gradient(90deg, #2c7bb6 0%, #48a78c 100%);
            margin: 40px 0;
            border-radius: 3px;
        }
        
        .section-title-box {
            background-color: #1a5689;
            color: white;
            padding: 15px 20px;
            border-radius: 5px 5px 0 0;
            margin-bottom: 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 1.8rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
            
            h3 {
                font-size: 1.2rem;
            }
            
            .feature-icon, .benefit-icon {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
        }
        
        /* フェードインアニメーションがある要素用 */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
        }
        
        /* テーブルスタイル */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th {
            background-color: #2c7bb6;
            color: white;
            text-align: left;
            padding: 12px 15px;
        }
        
        td {
            border: 1px solid #ddd;
            padding: 12px 15px;
        }
        
        tr:nth-child(even) {
            background-color: #f2f8fd;
        }
        
        /* 手順ステップ */
        .step-box {
            border-left: 3px solid #2c7bb6;
            margin-left: 20px;
            padding-left: 20px;
            position: relative;
            margin-bottom: 30px;
        }
        
        .step-circle {
            position: absolute;
            left: -15px;
            top: 0;
            width: 30px;
            height: 30px;
            background-color: #2c7bb6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .step-title {
            font-weight: 700;
            color: #1a5689;
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

    <div class="container py-8">
        
        <div class="section">
            <h2><i class="fas fa-exclamation-circle mr-2"></i>介護現場における書類作業の課題</h2>
            
            <p>介護現場では、質の高いケアの提供と同時に、膨大な書類作成業務が求められています。厚生労働省の調査によれば、<span class="number-highlight">介護事業所の70%以上が文書負担軽減を課題</span>と感じており、書類作成による業務負担は年々増加傾向にあります。</p>
            
            <div class="warning-box">
                <h4 class="font-bold text-lg mb-2">介護現場が直面している書類作成の3つの課題</h4>
                <ul class="list-check">
                    <li><span class="font-bold">時間的負担：</span>計画書作成に1件あたり平均<span class="number-highlight">40分以上</span>を要する</li>
                    <li><span class="font-bold">品質の均一化：</span>担当者によって記載内容の質にばらつきが出る</li>
                    <li><span class="font-bold">残業の増加：</span>日中は介護業務に追われ、書類作成は残業時間に回されることが多い</li>
                </ul>
            </div>
            
            <p>このような状況から、国も「介護分野の文書に係る負担軽減」を重要課題として取り組んでおり、業界全体としてDX（デジタルトランスフォーメーション）による業務効率化が急務となっています。</p>
            
            <p>そんな中、介護現場の書類作成業務を劇的に効率化する新たなソリューションとして注目されているのが、<span class="highlight">文例選択だけで介護計画書が完成する「Care Smily」</span>です。</p>
        </div>
        
        <div class="text-center my-8">
            <a href="#contact" class="cta-button">まずは無料デモで体験してみる</a>
        </div>
        
        <div class="section section-alt">
            <h2><i class="fas fa-lightbulb mr-2"></i>Care Smilyとは？</h2>
            
            <p>Care Smilyは、<span class="highlight">介護現場の書類作成を文例選択だけで完了できる業界初の文例特化型webアプリ</span>です。計画書や記録などの書類作成時間を大幅に削減し、介護スタッフが本来の業務に集中できる環境を実現します。</p>
            
            <div class="info-box">
                <h4 class="font-bold text-lg mb-2">Care Smilyで解決できる課題</h4>
                <ul class="list-check">
                    <li>計画書作成に時間がかかりすぎる問題</li>
                    <li>担当者によって記載内容の質が異なる問題</li>
                    <li>残業時間の増加による人件費の増加と職員の負担</li>
                    <li>書類作成に時間を取られ、本来の介護業務に集中できない問題</li>
                </ul>
            </div>
        </div>

        <div class="divider"></div>
        
        <div class="section">
            <h2><i class="fas fa-star mr-2"></i>Care Smilyの主要機能</h2>
            
            <div class="flex items-start mb-8">
                <div class="feature-icon">
                    <i class="fas fa-database"></i>
                </div>
                <div>
                    <h3 class="mt-0">充実した文例データベース</h3>
                    <p>介護現場の専門家監修による<span class="number-highlight">100,000以上の文例</span>を用意。利用者の状態やニーズに合わせた適切な表現を簡単に選択できます。</p>
                </div>
            </div>
            
            <div class="flex items-start mb-8">
                <div class="feature-icon">
                    <i class="fas fa-mouse-pointer"></i>
                </div>
                <div>
                    <h3 class="mt-0">直感的な文例選択インターフェース</h3>
                    <p>カテゴリーから目的の文例を簡単に検索・選択できる使いやすいインターフェース設計。PC操作が苦手なスタッフでも直感的に操作できます。</p>
                </div>
            </div>
            
            <div class="flex items-start mb-8">
                <div class="feature-icon">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div>
                    <h3 class="mt-0">ワンクリック入力</h3>
                    <p>選んだ文例は自動的に適切な項目に挿入することもできます。コピー＆ペーストの手間もなく、クリックだけで書類作成が進みます。</p>
                </div>
            </div>
            
            <div class="flex items-start">
                <div class="feature-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div>
                    <h3 class="mt-0">書類テンプレート機能</h3>
                    <p>介護計画書、アセスメント、モニタリングなど、様々な書類のテンプレートを用意。必要な書類をすばやく作成できます。</p>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section section-alt">
            <h2><i class="fas fa-chart-line mr-2"></i>Care Smilyで得られるメリット</h2>
            
            <div class="flex items-start mb-8">
                <div class="benefit-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div>
                    <h3 class="mt-0">書類作成時間の劇的な短縮</h3>
                    <p>これまで1件<span class="number-highlight">40分以上</span>かかっていた計画書作成が、わずか<span class="number-highlight">5分程度</span>で完了するようになります。文例を選択するだけで文章が自動入力されるため、文章作成の時間が大幅に削減されます。</p>
                </div>
            </div>
            
            <div class="flex items-start mb-8">
                <div class="benefit-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div>
                    <h3 class="mt-0">スタッフの残業削減</h3>
                    <p>書類作成時間の短縮により、残業時間を大幅に削減。導入施設では平均して<span class="number-highlight">月20時間以上の残業削減</span>に成功しています。</p>
                </div>
            </div>
            
            <div class="flex items-start mb-8">
                <div class="benefit-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div>
                    <h3 class="mt-0">介護の質の向上</h3>
                    <p>書類作業に追われる時間が減ることで、利用者様とのコミュニケーションや直接介護に集中できる時間が増加します。本来の介護業務に集中することで、サービスの質が向上します。</p>
                </div>
            </div>
            
            <div class="flex items-start">
                <div class="benefit-icon">
                    <i class="fas fa-coins"></i>
                </div>
                <div>
                    <h3 class="mt-0">人件費の削減</h3>
                    <p>残業時間の削減により、人件費の削減効果も期待できます。書類作成に関わる業務コストを<span class="number-highlight">平均30%削減</span>した導入事例も。</p>
                </div>
            </div>
        </div>
        
        <div class="text-center my-8">
            <a href="#contact" class="cta-button">効果を実感！無料デモを申し込む</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="section">
            <h2><i class="fas fa-map-signs mr-2"></i>導入までの流れ</h2>
            
            <p>Care Smilyは、導入からすぐに効果を実感いただけるよう、シンプルな導入プロセスを設計しています。</p>
            
            <div class="step-box">
                <div class="step-circle">1</div>
                <div class="step-title">無料デモの申し込み・体験</div>
                <p>まずは無料デモでCare Smilyの機能と効果を体験してください。オンラインデモも可能です。</p>
            </div>
            
            <div class="step-box">
                <div class="step-circle">2</div>
                <div class="step-title">契約・初期設定</div>
                <p>導入を決定いただいた後、簡単な初期設定を行います。特別な設備投資は不要です。</p>
            </div>
            
            <div class="step-box">
                <div class="step-circle">3</div>
                <div class="step-title">運用開始・効果実感</div>
                <p>すぐに書類作成業務に活用でき、導入直後から時間短縮効果を実感できます。</p>
            </div>
            
            <div class="success-box">
                <h4 class="font-bold text-lg mb-2">PCが苦手な方でも安心！</h4>
                <p>Care Smilyは直感的な操作性を重視して設計されており、PCスキルに自信がない方でも簡単に使いこなすことができます。選ぶだけの簡単操作で、複雑な入力作業は必要ありません。</p>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section section-alt">
            <h2><i class="fas fa-building mr-2"></i>導入事例</h2>
            
            <div class="bg-white rounded-lg p-6 mb-6 shadow">
                <h3 class="text-xl font-bold text-blue-800 mb-3">デイサービスA事業所の場合</h3>
                <p class="mb-4"><span class="font-semibold">課題：</span>計画書作成による残業が月に25時間以上発生していた</p>
                <p class="mb-4"><span class="font-semibold">導入効果：</span></p>
                <ul class="list-check mb-4">
                    <li>計画書作成時間：<span class="number-highlight">45分/件→5分/件</span>に短縮</li>
                    <li>残業時間：<span class="number-highlight">月25時間→5時間</span>に削減</li>
                    <li>スタッフ満足度：職場環境アンケートで<span class="number-highlight">30ポイント向上</span></li>
                </ul>
                <p class="italic">「これまで書類作成に追われていた時間を利用者様とのコミュニケーションに使えるようになりました。本当の意味での介護ができるようになったと感じています。」<br>- 計画作成担当者：佐藤様</p>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow">
                <h3 class="text-xl font-bold text-blue-800 mb-3">訪問介護B事業所の場合</h3>
                <p class="mb-4"><span class="font-semibold">課題：</span>訪問記録の作成に時間がかかり、次の訪問に遅れることがあった</p>
                <p class="mb-4"><span class="font-semibold">導入効果：</span></p>
                <ul class="list-check mb-4">
                    <li>記録作成時間：<span class="number-highlight">15分/件→3分/件</span>に短縮</li>
                    <li>1日の訪問件数：<span class="number-highlight">平均1件増加</span></li>
                    <li>ヘルパー1人あたりの売上：<span class="number-highlight">月平均8%向上</span></li>
                </ul>
                <p class="italic">「記録作成の負担が減り、余裕を持って訪問することができるようになりました。利用者様への対応も丁寧にできるようになり、満足度も向上しています。」<br>- サービス提供責任者：鈴木様</p>
            </div>
        </div>
        
        <div class="text-center my-8">
            <a href="#contact" class="cta-button">あなたの事業所でも効果を実感！</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="section">
            <h2><i class="fas fa-question-circle mr-2"></i>よくある質問</h2>
            
            <div class="qa-box">
                <div class="qa-question">
                    <div class="qa-icon q-icon">Q</div>
                    <div>どのような種類の書類に対応していますか？</div>
                </div>
                <div class="qa-answer">
                    <div class="qa-icon a-icon">A</div>
                    <div>介護計画書、アセスメントシート、モニタリング記録、サービス提供記録、看護・介護記録など、介護現場で使用される主要な書類に対応しています。</div>
                </div>
            </div>
            
            <div class="qa-box">
                <div class="qa-question">
                    <div class="qa-icon q-icon">Q</div>
                    <div>文例は自分たちの施設に合わせてカスタマイズできますか？</div>
                </div>
                <div class="qa-answer">
                    <div class="qa-icon a-icon">A</div>
                    <div>はい、可能です。基本の文例に加えて、施設独自の文例を登録・管理することができます。頻繁に使う表現や施設特有の表現も効率よく活用できます。</div>
                </div>
            </div>
            
            <div class="qa-box">
                <div class="qa-question">
                    <div class="qa-icon q-icon">Q</div>
                    <div>他の介護ソフトと連携できますか？</div>
                </div>
                <div class="qa-answer">
                    <div class="qa-icon a-icon">A</div>
                    <div>主要な介護ソフトとの連携を順次対応していく予定です。現時点では、テキストデータとしてエクスポートし、他システムへ取り込むことが可能です。</div>
                </div>
            </div>
            
            <div class="qa-box">
                <div class="qa-question">
                    <div class="qa-icon q-icon">Q</div>
                    <div>導入に特別な設備は必要ですか？</div>
                </div>
                <div class="qa-answer">
                    <div class="qa-icon a-icon">A</div>
                    <div>インターネットに接続できるパソコンやタブレットがあれば導入可能です。クラウドサービスのため、特別なサーバーやハードウェアは必要ありません。</div>
                </div>
            </div>
            
            <div class="qa-box">
                <div class="qa-question">
                    <div class="qa-icon q-icon">Q</div>
                    <div>契約期間の縛りはありますか？</div>
                </div>
                <div class="qa-answer">
                    <div class="qa-icon a-icon">A</div>
                    <div>最低契約期間は6か月となっております。その後は1か月単位での更新となります。</div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section section-alt" id="price">
            <h2><i class="fas fa-tags mr-2"></i>料金プラン</h2>
            
            <div class="price-box">
                <div class="price-header">
                    Care Smilyスタンダードプラン
                </div>
                <div class="price-content">
                    <div class="price-amount">月額 15,000円（税別）</div>
                    
                    <ul class="list-check">
                        <li>文例データベース（100,000以上）完全利用権</li>
                        <li>書類テンプレート全種類利用可能</li>
                        <li>アカウント：2端末まで</li>
                        <li>データ保存容量：無制限</li>
                        <li>システムアップデート無料</li>
                    </ul>
                    
                    <p class="note">※最低契約期間：6か月</p>
                </div>
            </div>
            
            <div class="success-box mt-8">
                <h4 class="font-bold text-lg mb-2">導入効果が一目瞭然！</h4>
                <p>計画書作成時間の削減により、月間約20時間の残業削減が期待できます。<br>
                残業代（時給1,500円の場合）：<span class="number-highlight">30,000円/月の削減</span><br>
                年間では：<span class="number-highlight">360,000円のコスト削減</span><br>
                Care Smily導入費用（年間）：180,000円<br>
                <span class="font-bold">→ 年間約180,000円のコストメリット！</span></p>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section bg-blue-50" id="contact">
            <h2 class="text-center"><i class="fas fa-paper-plane mr-2"></i>無料デモのお申し込み</h2>
            
            <p class="text-center mb-6">Care Smilyの効果をまずは無料でお確かめください。<br>オンラインデモまたは訪問デモをご用意しております。</p>
            
            <div class="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
                <form>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">事業所名 <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">ご担当者名 <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">メールアドレス <span class="text-red-500">*</span></label>
                        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">電話番号 <span class="text-red-500">*</span></label>
                        <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2">ご希望のデモ方法</label>
                        <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                            <option>オンラインデモ</option>
                            <option>訪問デモ</option>
                        </select>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-gray-700 font-medium mb-2">ご質問・ご要望など</label>
                        <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows="4"></textarea>
                    </div>
                    
                    <div class="text-center">
                        <button type="submit" class="cta-button w-full md:w-auto">無料デモを申し込む</button>
                    </div>
                </form>
            </div>
            
            <div class="mt-8 text-center">
                <p class="font-bold text-xl">お電話でのお問い合わせも歓迎します</p>
                <p class="text-2xl font-bold text-blue-800 my-2"><i class="fas fa-phone mr-2"></i>0120-XXX-XXX</p>
                <p>受付時間：平日 9:00〜18:00</p>
            </div>
        </div>
    </div>
    
    <footer class="bg-gray-800 text-white py-10">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 class="text-xl font-bold mb-4">Care Smily</h4>
                    <p>介護現場の書類作成を劇的に効率化する文例特化型webアプリ</p>
                </div>
                <div>
                    <h4 class="text-xl font-bold mb-4">リンク</h4>
                    <ul>
                        <li class="mb-2"><a href="#" class="hover:text-blue-300">運営会社</a></li>
                        <li class="mb-2"><a href="#" class="hover:text-blue-300">プライバシーポリシー</a></li>
                        <li class="mb-2"><a href="#" class="hover:text-blue-300">利用規約</a></li>
                        <li><a href="#" class="hover:text-blue-300">お問い合わせ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xl font-bold mb-4">お問い合わせ</h4>
                    <p class="mb-2"><i class="fas fa-envelope mr-2"></i><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="365f5850597655574453455b5f5a4f1855595b">[email&#160;protected]</a></p>
                    <p><i class="fas fa-phone mr-2"></i>0120-XXX-XXX</p>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                <p>&copy; 2025 Care Smily All Rights Reserved.</p>
            </div>
        </div>
    </footer>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script></body>
</html>
    <script id="html_badge_script1">
        window.__genspark_remove_badge_link = "https://www.genspark.ai/api/html_badge/" +
            "remove_badge?token=To%2FBnjzloZ3UfQdcSaYfDu%2Bl8Xab1mLFWZGSCRPjXeLB3deUXXaoaXUs7cthizhUk3Zziw%2FoMmeeTSt%2FUCwaAfNlVDBy%2B3Cfyuo2hV0a36ByfLqdOxiTEbq3C4CcO3ntqFLNZZICraJBTYWQMFgUr7PJJhYALgJg8wBlClP3ypT9LkzKVJOktbJJBh1GICHBMyk7LRdfrLpMKFsv3Uje0TYciN0lYZF1g9%2F7xpxfafgQyXVLoes6WXZgAFgQZt5E34v%2Fzzw5WgNdvkLUaKvvdbJCqk08AKliAXugvOsm0B5oSiuot%2BYkkZ3EeEEBbeFhSxYpLGENn16N%2F6PwttKQ8vQQjVDcKvGdzoEYt8PMFyN0bcGm9llG4ARy4%2B670iCeW8dmfnnpQnECMGyiWvP5I7YCO7t8HVVgXbeeenUh6BzghTfODootM67xK51eqE6O4Pmimt9TgRgc%2BEagfqoyvZYh0JO6QdJxm8mE7fafaihL4SJb2PHgRWMJsBPuH0CMe%2BTDXXgtRHP65vpMCACcz4s3exiZS46QI1O4dhJtBSY%3D";
        window.__genspark_locale = "ja-JP";
        window.__genspark_token = "To/BnjzloZ3UfQdcSaYfDu+l8Xab1mLFWZGSCRPjXeLB3deUXXaoaXUs7cthizhUk3Zziw/oMmeeTSt/UCwaAfNlVDBy+3Cfyuo2hV0a36ByfLqdOxiTEbq3C4CcO3ntqFLNZZICraJBTYWQMFgUr7PJJhYALgJg8wBlClP3ypT9LkzKVJOktbJJBh1GICHBMyk7LRdfrLpMKFsv3Uje0TYciN0lYZF1g9/7xpxfafgQyXVLoes6WXZgAFgQZt5E34v/zzw5WgNdvkLUaKvvdbJCqk08AKliAXugvOsm0B5oSiuot+YkkZ3EeEEBbeFhSxYpLGENn16N/6PwttKQ8vQQjVDcKvGdzoEYt8PMFyN0bcGm9llG4ARy4+670iCeW8dmfnnpQnECMGyiWvP5I7YCO7t8HVVgXbeeenUh6BzghTfODootM67xK51eqE6O4Pmimt9TgRgc+EagfqoyvZYh0JO6QdJxm8mE7fafaihL4SJb2PHgRWMJsBPuH0CMe+TDXXgtRHP65vpMCACcz4s3exiZS46QI1O4dhJtBSY=";
    </script>
    
        <script id="html_badge_script2" src="https://www.genspark.ai/html_badge.js"></script>
        
    <script id="html_notice_dialog_script" src="https://www.genspark.ai/notice_dialog.js"></script>
    
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