export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-[#55C6F5] py-16">
        <h1 className="text-4xl font-bold text-center text-white">プライバシーポリシー</h1>
      </div>

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 prose prose-lg">
          <p className="mb-8">
            株式会社Nico（以下「当社」といいます。）は、当社が提供・運営する「ケアスマイリー」及びこれに関連する一切のサービス（以下「本サービス」といいます。）において、個人情報保護法第2条第1項に基づく個人情報その他の個人に関する情報（以下「個人情報等」といいます。）を適正かつ安全に取り扱うため、以下のとおり本プライバシーポリシーを定めます。
          </p>
          <p className="text-sm text-gray-600 mb-8">
            （なお、本ポリシーにおける用語の定義は、本サービスに係る利用規約等に準じるものとします。）
          </p>

          <h2 className="text-xl font-bold mt-8">1. 個人情報等の取得</h2>
          <p className="mb-4">
            当社は、本サービスの提供および運営にあたり、以下の方法で個人情報等を適法かつ適正な手段により取得いたします。
          </p>
          <div className="ml-4">
            <h3 className="font-bold mt-4">お客様からの直接登録</h3>
            <p className="mb-4">
              お客様（登録希望者、利用希望者、会員、登録事業所等）が本サービス利用のため、当社所定のフォーム等に必要事項を入力・登録いただく場合
            </p>

            <h3 className="font-bold mt-4">自動的な情報収集</h3>
            <p className="mb-4">
              ウェブサイトのアクセスログ、クッキー、ウェブビーコン等を用いて、本サービスの利用状況やアクセス情報を収集する場合
            </p>

            <h3 className="font-bold mt-4">お客様からの直接のご提供</h3>
            <p className="mb-4">
              書面、メール、電話その他の手段により、お問い合わせ、ご意見、ご要望等をご提供いただく場合
            </p>

            <h3 className="font-bold mt-4">第三者からの提供</h3>
            <p className="mb-4">
              お客様の同意を得た場合、または法令に基づく場合に限り、提携先等の第三者から個人情報等を提供いただく場合
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">2. 個人情報等の利用目的</h2>
          <p className="mb-4">当社は、取得した個人情報等を、以下の目的のために利用いたします。</p>
          <div className="ml-4">
            <h3 className="font-bold mt-4">本サービスの提供・運営</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>登録確認、本人認証、会員管理、サービス提供および利用料金の請求・決済手続きの実施</li>
              <li>本サービスに関する各種お問い合わせやサポート対応</li>
            </ul>

            <h3 className="font-bold mt-4">本サービスの改善・新規開発およびマーケティング</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>
                利用状況、アクセスログ等のデータを分析し、本サービスの機能向上や新規サービスの開発、キャンペーンの実施、各種ご案内の提供
              </li>
            </ul>

            <h3 className="font-bold mt-4">セキュリティの確保および事故・事件への対応</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>不正利用の防止、サービスの安全性確保、事故や事件発生時の調査およびご連絡</li>
            </ul>

            <h3 className="font-bold mt-4">その他</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>
                当社の提携先への、あらかじめお客様の同意を得た上での個人情報等の提供（本サービスの運営、決済、アフターサポート等に必要な場合）
              </li>
              <li>個人を特定できない形に加工・集計した統計データの作成・公表</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold mt-8">3. 個人情報等の第三者提供および委託</h2>
          <div className="ml-4">
            <h3 className="font-bold mt-4">第三者への提供について</h3>
            <p className="mb-4">
              当社は、原則としてお客様の同意なく個人情報等を第三者に提供いたしません。ただし、以下の場合は例外とします。
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体、または財産の保護のために必要な場合（本人の同意を得ることが困難な場合）</li>
              <li>公衆衛生の向上や児童の健全な育成の推進のために必要な場合</li>
              <li>国の機関、地方公共団体、またはその委託を受けた者が法令に基づき事務を遂行する場合</li>
            </ul>

            <h3 className="font-bold mt-4">業務委託先への提供について</h3>
            <p className="mb-4">
              当社は、本サービスの運営、決済、データ分析、システム保守等の業務の一部を、適正な安全管理措置を講じた上で外部の専門業者に委託することがあります。委託先には、個人情報等の適正な管理および秘密保持を義務付ける契約を締結し、漏洩防止に努めます。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">4. クッキー（Cookie）の利用について</h2>
          <div className="ml-4">
            <p className="mb-4">
              当社は、本サービスの利便性向上およびサービス品質の改善のため、クッキーを利用しています。
            </p>
            <p className="mb-4">
              クッキーは、ウェブサイトの利用履歴やアクセス状況を記録し、再訪問時のサービス向上に活用されます。
            </p>
            <p className="mb-4">
              お客様は、ウェブブラウザの設定によりクッキーの受け入れを拒否することができますが、その場合、一部機能がご利用いただけなくなる可能性があります。
            </p>
            <p className="mb-4">
              また、当社は、提携先等から提供されたクッキー情報を、当社の保有する情報と紐づけて利用する場合があり、その際は事前に同意を取得いたします。詳しくは【クッキーポリシー】をご参照ください。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">5. 個人情報等の開示、訂正、利用停止等</h2>
          <div className="ml-4">
            <p className="mb-4">
              お客様は、当社が保有するご自身の個人情報等について、開示、訂正、追加、削除、利用停止、消去、第三者提供の停止（以下「開示等」といいます。）を請求することができます。
            </p>
            <p className="mb-4">
              請求の際は、当社所定の手続に従っていただく必要があり、所定の手数料をいただく場合があります。
            </p>
            <p className="mb-4">
              なお、本サービスにおいて委託されている個人情報等につきましては、委託元のお客様の指示がない限り、開示等には応じかねる場合があります。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">6. 個人情報等の提供（任意性）について</h2>
          <div className="ml-4">
            <p className="mb-4">お客様が当社に個人情報等をご提供いただくかどうかは、基本的にお客様の任意によります。</p>
            <p className="mb-4">
              ただし、必要な情報をご提供いただけない場合、本サービスの一部または全部が適切に提供できなくなる場合がありますので、予めご了承ください。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">7. 安全管理措置</h2>
          <div className="ml-4">
            <p className="mb-4">
              当社は、個人情報等の不正アクセス、漏洩、滅失、毀損の防止のため、以下の技術的および組織的措置を講じています。
            </p>

            <h3 className="font-bold mt-4">基本方針の策定と従業員教育</h3>
            <p className="mb-4">個人情報保護に関する基本方針を策定し、全従業員に対して定期的な研修・教育を実施</p>

            <h3 className="font-bold mt-4">組織的措置</h3>
            <p className="mb-4">
              個人情報の管理責任者の設置、内部規程の整備、秘密保持契約の締結などによる管理体制の確立
            </p>

            <h3 className="font-bold mt-4">物理的措置</h3>
            <p className="mb-4">
              個人情報を取り扱うシステムへのアクセス制限、施錠可能なサーバールームの利用等による情報の保護
            </p>

            <h3 className="font-bold mt-4">技術的措置</h3>
            <p className="mb-4">
              ファイアウォール、暗号化、ウイルス対策ソフトの導入、定期的なセキュリティ診断、脆弱性対策の実施
            </p>

            <h3 className="font-bold mt-4">クラウドサービス利用時の措置</h3>
            <p className="mb-4">
              クラウドサービス提供事業者およびデータ保存先の国における個人情報保護制度を確認し、必要な安全管理措置を講じる
            </p>

            <p className="mt-4">
              なお、当社は、利用目的の達成に必要な期間内のみ個人情報等を保持し、その後は適切な方法により廃棄いたします。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">8. 本プライバシーポリシーの変更</h2>
          <div className="ml-4">
            <p className="mb-4">
              当社は、法令の改正や本サービスの運用状況に応じて、本プライバシーポリシーを随時見直し、変更することがあります。変更があった場合は、当社ウェブサイト上に掲載するとともに、必要に応じてお客様に通知いたします。変更後のプライバシーポリシーは、掲載日以降の利用に適用されるものとします。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">9. 個人情報管理責任者</h2>
          <div className="ml-4">
            <p className="font-bold">【個人情報管理責任者】</p>
            <p className="mb-4">株式会社Nico</p>
            <p className="text-sm text-gray-600">
              個人情報管理責任者※具体的な氏名や連絡先の詳細は、弊社ウェブサイトのお問い合わせページにてご確認ください。
            </p>
          </div>

          <h2 className="text-xl font-bold mt-8">10. お問い合わせ窓口</h2>
          <div className="ml-4">
            <p className="mb-4">
              本プライバシーポリシーに関するご質問、または個人情報等の開示・訂正・利用停止等のご請求、その他個人情報の取扱いに関するお問い合わせは、下記の窓口までご連絡ください。
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-bold mb-2">【お問い合わせ窓口】</p>
              <p>株式会社Nico</p>
              <p>〒759-5331</p>
              <p>山口県下関市豊北町神田3489−2</p>
              <p>TEL：050-5799-0339</p>
              <p>E-mail：support@caresmiley.jp</p>
              <p className="text-sm text-gray-600 mt-2">
                ※詳しいお問い合わせ方法は、弊社公式ウェブサイトのお問い合わせフォームもご利用いただけます。
              </p>
            </div>
          </div>

          <div className="mt-12 text-right">
            <p className="text-sm text-gray-600">以上</p>
          </div>
        </div>
      </div>
    </div>
  )
}

