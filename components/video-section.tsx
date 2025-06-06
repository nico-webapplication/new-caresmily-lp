"use client"

import { useRef, useEffect, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            CareSmily 紹介動画
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            介護・福祉の現場を支援するCareSmilyの特徴とサービス内容をご紹介します
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-cyan-600">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                poster="/images/caresmily-logo.png"
              >
                <source src="/images/CareSmily広告動画.mp4" type="video/mp4" />
                お使いのブラウザは動画の再生に対応していません。
              </video>

              {/* Overlay Controls */}
              <div 
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 rounded-full w-16 h-16 p-0 transition-all duration-300 transform hover:scale-110"
                  variant="outline"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              </div>

              {/* Sound Toggle */}
              <div className={`absolute top-4 right-4 transition-all duration-300 ${
                showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                <Button
                  onClick={toggleMute}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 rounded-full w-10 h-10 p-0"
                  variant="outline"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Gradient Borders for Style */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-50" 
                   style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'subtract' }} />
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <img src="/images/caresmily-logo.png" alt="CareSmily" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">CareSmily サービス紹介</h3>
                    <p className="text-sm opacity-90">介護・福祉現場のDX化を支援</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">詳しくはお問い合わせください</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">簡単導入</h3>
              <p className="text-gray-600 text-sm">既存のシステムとの連携も可能で、スムーズな導入をサポート</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">効率化</h3>
              <p className="text-gray-600 text-sm">業務の自動化により、利用者様との時間をより多く確保</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">サポート充実</h3>
              <p className="text-gray-600 text-sm">専門スタッフによる手厚いサポートで安心してご利用いただけます</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}