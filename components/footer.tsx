import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#EBF5FF] to-white text-gray-700">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Product Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6">各種情報</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/news" className="text-gray-700 hover:text-primary transition-colors">
                  お知らせ
                </Link>
              </li>
              <li>
                <Link href="/column" className="text-gray-700 hover:text-primary transition-colors">
                  コラム
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-700 hover:text-primary transition-colors">
                  メディア情報
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6">お問い合わせ</h3>
            <div className="space-y-4 text-gray-700">
              <p>平日 10:00〜18:00</p>
              <p>電話：050-5799-0339</p>
              <p>メール：support@caresmily.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section with Logo and Company Info */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col space-y-6 md:space-y-4 px-4 md:px-0">
            <Link href="/" className="block mx-auto md:mx-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVeMJ5tX4JZKgYTrc25BRjeVRy2gLs.png"
                alt="CareSmily"
                width={200}
                height={56}
                className="h-14 w-auto mx-auto md:mx-0"
              />
            </Link>
            <p className="text-gray-700 text-sm mt-2 text-center md:text-left">
              "膨大な文例×選択"
              <br />
              あなただけのケアプランが瞬時に形になる
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <p className="text-gray-700 text-sm text-center md:text-left">
                株式会社Nico
                <br />
                〒759-5331山口県下関市豊北町神田3489-2
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <Link href="/privacy-policy" className="text-gray-700 hover:text-primary transition-colors">
                  プライバシーポリシー
                </Link>
                <Link
                  href="https://nico-inc.net/"
                  className="text-gray-700 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  運営会社
                </Link>
                <Link href="/terms" className="text-gray-700 hover:text-primary transition-colors">
                  利用規約
                </Link>
                <Link href="/legal" className="text-gray-700 hover:text-primary transition-colors">
                  特定商取引法に基づく表示
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

