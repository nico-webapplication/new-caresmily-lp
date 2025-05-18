"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

// Generate many more documents for a fuller effect
// Use a seeded random sequence so server and client renders match
const getSeededRandom = (seed: number, max: number) => {
  const x = Math.sin(seed) * 10000;
  return (x - Math.floor(x)) * max;
};

const documents = Array.from({ length: 150 }, (_, i) => {
  // Using the index as seed for consistent random values between server and client
  const typeIndex = Math.floor(getSeededRandom(i, 7));
  const documentTypes = ["paper", "folder", "note", "envelope", "certificate", "receipt", "contract"];
  
  return {
    id: i + 1,
    type: documentTypes[typeIndex] as string,
    rotation: getSeededRandom(i + 1000, 30) - 15, // -15 to 15
    scale: 0.6 + getSeededRandom(i + 2000, 0.7), // 0.6 to 1.3
    zIndex: Math.floor(getSeededRandom(i + 3000, 10)) + 1, // 1 to 10
    opacity: 0.8 + getSeededRandom(i + 4000, 0.2), // 0.8 to 1
  }
})

export function DocumentScatter() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation is controlled from the parent component
    return () => {
      if (containerRef.current) {
        const documents = containerRef.current.querySelectorAll(".document")
        gsap.killTweensOf(documents)
      }
    }
  }, [])

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
            // Initially position documents off-screen at the top
            // Using the seeded random value instead of window object for SSR compatibility
            transform: `translateY(-100vh) translateX(${getSeededRandom(doc.id + 5000, 1000) - 500}px) rotate(${doc.rotation}deg) scale(${doc.scale})`,
            willChange: "transform, opacity", // パフォーマンス最適化
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
