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
      className="absolute cursor-pointer transition-all duration-500 ease-out hover:z-50"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        transformOrigin: 'center center'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translate(-50%, -50%) rotate(${position.rotation + 2}deg) scale(1.05) translateY(-15px)`;
        el.style.boxShadow = `0 25px 35px rgba(0, 0, 0, 0.2), 0 15px 25px rgba(0, 0, 0, 0.15), 0 0 20px ${colorMap[color]}40`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translate(-50%, -50%) rotate(${position.rotation}deg) scale(1) translateY(0)`;
        el.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div
        className="w-48 h-32 rounded-xl relative overflow-hidden border border-white/20 shadow-lg"
        style={{
          background: `linear-gradient(145deg, ${colorMap[color]} 0%, ${colorMap[color]}E6 50%, ${colorMap[color]} 100%)`,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* 紙の折り目 */}
        <div 
          className="absolute top-0 right-0 w-5 h-5"
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