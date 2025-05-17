"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

// ドキュメントタイプの定義
const documentTypes = ["paper", "folder", "note", "envelope", "certificate", "receipt", "contract"];

// 初期値を固定値にして、クライアントサイドでのみ乱数を適用
const documents = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  // インデックスに基づいて決定的に型を選択（サーバー/クライアントで一致）
  type: documentTypes[i % documentTypes.length],
  rotation: 0, // 初期値は固定
  scale: 1, // 初期値は固定
  zIndex: Math.floor(i / 10) + 1, // 決定的な値
  opacity: 1, // 初期値は固定
}))

export function DocumentScatter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    // クライアントサイドでのみフラグを設定
    setIsClient(true)
    
    // クリーンアップ関数
    return () => {
      if (containerRef.current) {
        const documentElements = containerRef.current.querySelectorAll(".document")
        gsap.killTweensOf(documentElements)
      }
    }
  }, [])

  // クライアントサイドでのみレンダリング
  if (!isClient) {
    return <div ref={containerRef} className="relative w-full h-full"></div>
  }

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-visible">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="document absolute"
          style={{
            transformOrigin: "center center",
            zIndex: doc.zIndex,
            opacity: doc.opacity,
            // 固定位置で配置（乱数を使わない）
            transform: `translateY(-100vh) translateX(${doc.id % 20 * 10}px) rotate(${doc.rotation}deg) scale(${doc.scale})`,
            willChange: "transform, opacity",
          }}
        >
          {doc.type === "paper" && <PaperDocument />}
          {doc.type === "folder" && <FolderDocument />}
          {doc.type === "note" && <NoteDocument />}
          {doc.type === "envelope" && <EnvelopeDocument />}
          {doc.type === "certificate" && <CertificateDocument />}
          {doc.type === "receipt" && <ReceiptDocument />}
          {doc.type === "contract" && <ContractDocument />}
        </div>
      ))}
    </div>
  )
}

function PaperDocument() {
  return (
    <div className="w-48 h-64 bg-white border border-gray-300 shadow-md rounded-sm p-4 flex flex-col">
      <div className="w-full h-3 bg-gray-200 rounded-sm mb-2"></div>
      <div className="w-3/4 h-3 bg-gray-200 rounded-sm mb-4"></div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full h-2 bg-gray-100 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-100 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-100 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-100 rounded-sm"></div>
        <div className="w-full h-2 bg-gray-100 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-gray-100 rounded-sm"></div>
      </div>
    </div>
  )
}

function FolderDocument() {
  return (
    <div className="w-52 h-40 bg-amber-100 rounded-t-md shadow-md overflow-hidden">
      <div className="w-full h-8 bg-amber-200 border-b border-amber-300 mb-2"></div>
      <div className="px-3">
        <div className="w-full h-3 bg-amber-50 rounded-sm mb-2"></div>
        <div className="w-3/4 h-3 bg-amber-50 rounded-sm mb-2"></div>
        <div className="w-full h-3 bg-amber-50 rounded-sm"></div>
      </div>
    </div>
  )
}

function NoteDocument() {
  return (
    <div className="w-40 h-40 bg-yellow-100 shadow-md p-3 flex flex-col">
      <div className="w-3/4 h-2.5 bg-yellow-200 rounded-sm mb-2"></div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="w-full h-2 bg-yellow-50 rounded-sm"></div>
        <div className="w-full h-2 bg-yellow-50 rounded-sm"></div>
        <div className="w-full h-2 bg-yellow-50 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-yellow-50 rounded-sm"></div>
      </div>
    </div>
  )
}

function EnvelopeDocument() {
  return (
    <div className="w-56 h-32 bg-blue-50 shadow-md rounded-sm overflow-hidden flex flex-col">
      <div className="w-full h-6 bg-blue-100 border-b border-blue-200"></div>
      <div className="flex-1 p-3">
        <div className="w-full h-3 bg-blue-50 border border-blue-100 rounded-sm mb-2"></div>
        <div className="w-3/4 h-3 bg-blue-50 border border-blue-100 rounded-sm"></div>
      </div>
      <div className="w-full h-8 bg-blue-100 border-t border-blue-200 flex items-center justify-center">
        <div className="w-12 h-4 bg-blue-200 rounded-full"></div>
      </div>
    </div>
  )
}

function CertificateDocument() {
  return (
    <div className="w-52 h-36 bg-green-50 border-4 border-green-200 shadow-md p-3 flex flex-col">
      <div className="w-full h-4 bg-green-100 rounded-sm mb-2 flex items-center justify-center">
        <div className="w-16 h-2 bg-green-200 rounded-full"></div>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center">
        <div className="w-3/4 h-2 bg-green-100 rounded-sm"></div>
        <div className="w-1/2 h-2 bg-green-100 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-green-100 rounded-sm"></div>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-16 h-6 bg-green-100 rounded-sm"></div>
      </div>
    </div>
  )
}

function ReceiptDocument() {
  return (
    <div className="w-32 h-64 bg-gray-50 shadow-md p-2 flex flex-col">
      <div className="w-full h-3 bg-gray-200 rounded-sm mb-2 flex items-center justify-center">
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="w-1/2 h-2 bg-gray-100 rounded-sm"></div>
            <div className="w-1/4 h-2 bg-gray-100 rounded-sm"></div>
          </div>
        ))}
        <div className="w-full h-px bg-gray-200 my-1"></div>
        <div className="flex justify-between items-center">
          <div className="w-1/3 h-2.5 bg-gray-200 rounded-sm"></div>
          <div className="w-1/4 h-2.5 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
      <div className="w-full h-8 flex items-center justify-center">
        <div className="w-3/4 h-6 bg-gray-100 flex items-center justify-center">
          <div className="w-3/4 h-1 bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

function ContractDocument() {
  return (
    <div className="w-48 h-64 bg-indigo-50 border border-indigo-100 shadow-md p-4 flex flex-col">
      <div className="w-full h-4 bg-indigo-100 rounded-sm mb-3 flex items-center justify-center">
        <div className="w-24 h-2 bg-indigo-200 rounded-full"></div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-2 bg-indigo-50 border border-indigo-100 rounded-sm"></div>
        ))}
        <div className="w-full h-px bg-indigo-200 my-1"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="w-16 h-8 bg-indigo-100 rounded-sm"></div>
          <div className="w-16 h-8 bg-indigo-100 rounded-sm"></div>
        </div>
      </div>
    </div>
  )
}
