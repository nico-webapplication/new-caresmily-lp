"use client";

import React from "react";

interface DocumentButtonProps {
  href: string;
  children: string;
  color: 'pink' | 'green' | 'blue' | 'yellow';
  position: { x: number; y: number; rotation: number };
  onClick?: () => void;
}

const colorMap = {
  pink: '#E879A6',
  green: '#4ADE80', 
  blue: '#3B82F6',
  yellow: '#FCD34D'
};

const DocumentButton = ({ 
  href, 
  children, 
  color, 
  position,
  onClick 
}: DocumentButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className="absolute cursor-pointer group hover:z-50"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        transformOrigin: 'center center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={handleClick}
    >
      <div
        className="w-52 h-36 relative transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-105"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))',
          transition: 'filter 0.3s ease, transform 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = `drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.1)) drop-shadow(0 0 20px ${colorMap[color]}40)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))';
        }}
      >
        {/* メイン書類 */}
        <div
          className="w-full h-full relative rounded-sm border border-gray-200"
          style={{
            background: `
              linear-gradient(to bottom, #ffffff 0%, #fefefe 50%, #fcfcfc 100%),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 18px,
                rgba(230, 230, 235, 0.4) 19px,
                rgba(230, 230, 235, 0.4) 20px
              )
            `,
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* 左マージン */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-8"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 182, 193, 0.3) 0%, transparent 100%)',
              borderRight: '1px solid rgba(255, 182, 193, 0.5)'
            }}
          />
          
          {/* 穴あけパンチの穴 */}
          <div className="absolute left-3 top-6 w-1.5 h-1.5 rounded-full bg-white border border-gray-300 shadow-inner" />
          <div className="absolute left-3 top-16 w-1.5 h-1.5 rounded-full bg-white border border-gray-300 shadow-inner" />
          <div className="absolute left-3 bottom-6 w-1.5 h-1.5 rounded-full bg-white border border-gray-300 shadow-inner" />
          
          {/* 右上の折り目 */}
          <div 
            className="absolute top-0 right-0 w-4 h-4"
            style={{
              background: 'linear-gradient(-45deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
              boxShadow: 'inset -1px -1px 2px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          {/* テキスト部分 */}
          <div className="absolute inset-0 flex items-center justify-center px-6 py-4">
            <div 
              className="font-semibold text-sm leading-tight text-center"
              style={{ 
                color: colorMap[color],
                fontFamily: "'Noto Sans JP', sans-serif",
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {children}
            </div>
          </div>
          
          {/* カラーアクセント */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${colorMap[color]} 0%, ${colorMap[color]}80 50%, ${colorMap[color]} 100%)`
            }}
          />
          
          {/* ホバー時のシマーエフェクト */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              animation: 'shimmer 1.8s ease-in-out infinite',
              transform: 'translateX(-100%)'
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

interface ScatteredDocumentButtonsProps {
  buttons: Array<{
    href: string;
    text: string;
    color: 'pink' | 'green' | 'blue' | 'yellow';
  }>;
}

export const ScatteredDocumentButtons = ({ buttons }: ScatteredDocumentButtonsProps) => {
  const positions = [
    { x: 15, y: 25, rotation: -8 },
    { x: 70, y: 20, rotation: 12 },
    { x: 25, y: 75, rotation: -15 },
    { x: 75, y: 80, rotation: 8 }
  ];

  return (
    <div className="relative w-full h-80 md:h-96">
      {buttons.map((button, index) => (
        <DocumentButton
          key={index}
          href={button.href}
          color={button.color}
          position={positions[index]}
        >
          {button.text}
        </DocumentButton>
      ))}
    </div>
  );
};

export default DocumentButton;