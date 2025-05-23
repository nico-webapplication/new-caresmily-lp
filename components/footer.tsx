import Link from "next/link"
import Image from "next/image"
import { FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#EBF5FF] to-white text-gray-700">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Product Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">各種情報</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  お知らせ
                </Link>
              </li>
              <li>
                <Link href="/column" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  コラム
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  メディア情報
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">お問い合わせ</h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center">
                <span className="font-medium">営業時間：</span>平日 10:00〜18:00
              </p>
              <p className="flex items-center">
                <span className="font-medium">電話：</span>050-5799-0339
              </p>
              <p className="flex items-center">
                <span className="font-medium">メール：</span>support@caresmily.com
              </p>
            </div>
          </div>

          {/* Social Media & Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">各種SNS</h3>
            <div className="flex gap-4 mb-6">
              <Link
                href="https://youtube.com/@CareSmily"
                className="group bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/caresmily25"
                className="group bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-6 h-6 text-gray-800 group-hover:text-black transition-colors" />
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              最新情報やお役立ち情報を発信しています
            </p>
          </div>
        </div>

        {/* Bottom Section with Logo and Company Info */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
            {/* Logo and Description */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="/" className="block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVeMJ5tX4JZKgYTrc25BRjeVRy2gLs.png"
                  alt="CareSmily"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm text-center md:text-left max-w-md">
                "膨大な文例×選択"
                <br />
                あなただけのケアプランが瞬時に形になる
              </p>
            </div>

            {/* Company Information */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="text-center md:text-right">
                <p className="text-gray-800 font-semibold mb-2">株式会社Nico</p>
                <p className="text-gray-600 text-sm">
                  〒759-5331<br />
                  山口県下関市豊北町神田3489-2
                </p>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                プライバシーポリシー
              </Link>
              <Link
                href="https://nico-inc.net/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                運営会社
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                利用規約
              </Link>
              <Link href="/legal" className="text-gray-600 hover:text-blue-600 transition-colors">
                特定商取引法に基づく表示
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                © 2024 株式会社Nico. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

