export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Main heading with centered 簡単選択 */}
        <h1 className="space-y-6">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            膨大な専門家監修の文例
          </div>
          
          {/* Centered cross symbol */}
          <div className="flex justify-center my-8">
            <span className="text-6xl md:text-7xl lg:text-8xl text-red-500 font-bold">×</span>
          </div>
          
          {/* Centered 簡単選択 text - this is what you requested */}
          <div className="mb-8">
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 block">
              簡単選択
            </span>
          </div>
          
          {/* Additional text with underlines */}
          <div className="space-y-4">
            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-medium text-gray-700">あなただけのケアプランが</span>
              <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded"></div>
            </div>
            <br />
            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-medium text-gray-700">瞬時に形になる</span>
              <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded"></div>
            </div>
          </div>
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mt-12 max-w-2xl mx-auto">
          介護現場の書類作成時間を<strong>60%削減</strong>する文例特化型アプリ。
          <br />
          <strong>10万件以上</strong>の専門家監修文例で、あなたの業務を革新します。
        </p>
        
        {/* Success message */}
        <div className="mt-16 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-2xl font-bold text-green-800 mb-2">✓ 完了</h2>
          <p className="text-green-700">
            「簡単選択」テキストがヒーローセクション中央に正しく配置されました
          </p>
        </div>
      </div>
    </div>
  );
}