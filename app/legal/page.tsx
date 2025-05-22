
export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-[#55C6F5] py-16">
        <h1 className="text-4xl font-bold text-center text-white">特定商取引法に基づく表示</h1>
      </div>

      {/* Legal Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 prose prose-lg">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold border-b pb-2">1. 販売事業者名（サービス運営者）</h2>
              <p>株式会社Nico</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">2. 運営統括責任者</h2>
              <p>代表取締役　三好 美和</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">3. 所在地</h2>
              <p>〒759-5331</p>
              <p>山口県下関市豊北町神田3489−2</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">4. お問い合わせ先</h2>
              <p>電話番号：050-5799-0339</p>
              <p>E-mail：support@caresmiley.com</p>
              <p>（お問い合わせはメールにてお願いいたします）</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">5. 本サービスの提供内容</h2>
              <p>「ケアスマイリー」は、以下のサービスを含む弊社の介護・福祉関連事業およびそれに関連する一切のサービスを指します。</p>
              <ul className="list-disc ml-6">
                <li>ケアスマイリーデイサービス</li>
                <li>ケアスマイリー訪問介護</li>
                <li>ケアスマイリー ケアマネ</li>
                <li>ケアスマイリー介護記録</li>
                <li>その他、弊社が別途提供する個別サービス</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">6. 販売価格・サービス利用料金</h2>
              <p>各サービスの利用料金は、サービス内容ごとに異なります。詳細は、各サービス紹介ページまたはお見積り時にご案内いたします。</p>
              <p>表示される価格は税込価格となります（別途記載がある場合を除く）。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">7. 商品代金以外の必要料金</h2>
              <p>銀行振込でのお支払いの場合、振込手数料はお客様のご負担となります。</p>
              <p>その他サービス利用に関わる通信費やインターネット接続費用はお客様にてご負担いただきます。</p>
              <p>介護保険適用サービスの場合、自己負担割合に応じて利用料が変動する場合があります。詳細はお問い合わせください。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">8. 申込みの有効期限</h2>
              <p>各サービスのお申し込み時に定める契約書・利用規約に準じます。</p>
              <p>キャンペーンや特別価格での提供の場合は、各キャンペーン等に記載された期間中が有効期限となります。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">9. お支払い方法・お支払い時期</h2>
              <p>お支払い方法：銀行振込、クレジットカード、口座振替 など（導入情報に合わせてご記載ください）</p>
              <p>お支払い時期：サービス提供開始前もしくは月末締め翌月払いなど、契約条件により異なります。詳細は契約書や利用規約等をご参照ください。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">10. サービス提供時期</h2>
              <p>申し込み完了後、利用開始手続きが整い次第速やかにサービスを提供いたします。具体的な提供開始時期は、個別にご案内いたします。</p>
              <p>介護保険適用サービスの場合は、ケアプラン策定後、担当ケアマネージャーとの日程調整に基づき利用開始となります。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">11. 返品・キャンセル・解約等</h2>
              <p>本サービスの性質上、提供後の返品は原則できません。</p>
              <p>キャンセル・解約をご希望の場合は、利用規約及び契約書に基づき、所定の手続きを行ってください。</p>
              <p>介護保険適用サービスの場合、解約やサービス内容の変更はケアマネージャーを通じて手続きを行う必要があります。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">12. 中途解約に関する特約</h2>
              <p>定期利用契約・長期利用契約等の場合、途中解約の際に解約金や違約金が発生する場合があります。詳細は契約時の書面または利用規約等をご確認ください。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">13. 動作環境（オンラインサービスをご利用の場合）</h2>
              <p>ケアスマイリー介護記録等のオンラインサービスを利用いただく際には、インターネット接続環境及び推奨ブラウザ（最新版のChrome、Firefox、Safariなど）が必要となります。</p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2">14. その他</h2>
              <p>法令に定めのある場合を除き、個別の契約・利用規約に記載のない事項については、双方協議の上で決定いたします。</p>
              <p>本表示に関してご不明な点がございましたら、上記お問い合わせ先までご連絡ください。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
