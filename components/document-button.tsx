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
        className="w-48 h-32 relative transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-105"
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
          className="w-full h-full relative rounded border border-gray-300"
          style={{
            background: 'linear-gradient(-45deg, transparent 0%, transparent 45%, rgba(0, 0, 0, 0.1) 50%, transparent 55%, transparent 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
          }}

          />

          {/* 紙の線 */}
          <div className="absolute top-5 left-5 right-5 bottom-5">
            <div className="absolute top-5 left-0 right-0 h-px bg-white/20" />
            <div className="absolute top-8 left-0 right-0 h-px bg-white/20" />
        </div>
        {/* テキスト */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-white font-bold text-sm leading-tight text-center text-shadow-lg">
            {children}
          </div>
        </div>

        {/* シマーエフェクト */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
            animation: 'shimmer 1.5s ease-in-out infinite',
            transform: 'translateX(-100%)'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
          }
          .text-shadow-lg {
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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