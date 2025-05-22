import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="relative h-16 w-48">
              <Image
                src="/images/CareSmily_ロゴ.png"
                alt="CareSmily Logo"
                fill
                style={{ objectFit: "contain" }}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sky-200">
              介護現場に笑顔をもたらす
              <br />
              革新的なサービス
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-sky-200 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sky-200 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sky-200 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-sky-200 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-100">
              サービス
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  書類作成支援
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  データ分析
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  業務効率化
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  研修サポート
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-100">
              会社情報
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  会社概要
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  ミッション
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  チーム
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  採用情報
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-100">
              サポート
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sky-200 hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-12 pt-8 text-center text-sky-300">
          <p>© {new Date().getFullYear()} CareSmily All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
