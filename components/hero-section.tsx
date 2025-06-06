"use client";

import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { ScatteredDocumentButtons } from "./document-button";

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes fadeInText {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes titleTypewriter {
    0% {
      width: 0;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes slideInScale {
    0% {
      opacity: 0;
      transform: translateX(-30px) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }

  @keyframes rotateIn {
    0% {
      transform: rotate(-180deg) scale(0);
      opacity: 0;
    }
    100% {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }

  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes zoomInOut {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes colorShift {
    0%, 100% {
      filter: hue-rotate(0deg);
    }
    25% {
      filter: hue-rotate(10deg);
    }
    75% {
      filter: hue-rotate(-10deg);
    }
  }

  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    50% {
      text-shadow: 0 0 20px rgba(0,0,0,0.3), 0 0 30px rgba(0,0,0,0.2);
    }
  }

  @keyframes wiggle {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(1deg);
    }
    75% {
      transform: rotate(-1deg);
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes documentFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.07),
        0 1px 3px rgba(0, 0, 0, 0.1);
    }
    50% {
      transform: translateY(-2px) rotate(0.5deg);
      box-shadow: 
        0 6px 8px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  @keyframes paperRipple {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(4) rotate(180deg);
      opacity: 0;
    }
  }

  @keyframes floatUp {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(-10px) translateX(-5px);
    }
    75% {
      transform: translateY(-15px) translateX(8px);
    }
  }

  @keyframes waveAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// スタイルコンポーネント
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(-45deg, #f8f6f3, #faf8f5, #f3f1ee, #f6f4f1);
  background-size: 400% 400%;
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 6rem;
  min-height: 100vh;

  @media (max-width: 1200px) {
    gap: 4rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
    gap: 2rem;
    min-height: auto;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

const MainContent = styled.div`
  margin-bottom: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  animation: slideInScale 1.2s cubic-bezier(0.4, 0, 0.2, 1) both, textGlow 3s ease-in-out 2s infinite, wiggle 0.5s ease-in-out 4s infinite;
  letter-spacing: -0.02em;
  position: relative;
  background: linear-gradient(135deg, #111827 0%, #374151 50%, #111827 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  }
  
  &:hover {
    animation-play-state: paused;
    
    &::after {
      animation: pulse 1s ease-in-out infinite;
    }
  }

  @media (max-width: 1024px) {
    font-size: 3.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const CrossSymbol = styled.span`
  display: inline-block;
  font-size: 3rem;
  color: #ba0000;
  margin: 0 1rem;
  font-weight: 300;
  vertical-align: middle;
  
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin: 0 0.5rem;
  }
`;

const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeInText 1s ease-out 0.9s both;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  animation: slideInFromLeft 1.5s ease-out 0.5s both;
  
  & > *:nth-child(1) {
    animation: slideInScale 1s ease-out 0.8s both, pulse 2s ease-in-out 3s infinite;
  }
  
  & > *:nth-child(2) {
    animation: slideInScale 1s ease-out 1s both, pulse 2s ease-in-out 3.5s infinite;
  }
  
  & > *:nth-child(3) {
    animation: slideInScale 1s ease-out 1.2s both, pulse 2s ease-in-out 4s infinite;
  }
  
  & > *:nth-child(4) {
    animation: slideInScale 1s ease-out 1.4s both, pulse 2s ease-in-out 4.5s infinite;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const CTAButton = styled.a<{ $variant?: 'primary' | 'secondary' }>`
  background: 
    linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #ffffff 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 24px,
      rgba(0, 0, 0, 0.02) 25px,
      rgba(0, 0, 0, 0.02) 26px
    );
  color: ${props => props.$variant === 'secondary' ? '#2563eb' : '#1e40af'};
  border: 1px solid #e5e7eb;
  border-left: 4px solid ${props => props.$variant === 'secondary' ? '#ef4444' : '#3b82f6'};
  border-top: 1px solid #f3f4f6;
  padding: 20px 32px 20px 28px;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  width: fit-content;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  position: relative;
  overflow: visible;
  min-width: 240px;
  transform: translateZ(0) rotate(0deg);
  animation: documentFloat 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%,
      ${props => props.$variant === 'secondary' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'} 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 8px;
    height: 8px;
    background: ${props => props.$variant === 'secondary' ? '#ef4444' : '#3b82f6'};
    clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
    opacity: 0.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  &:hover {
    transform: translateY(-12px) translateZ(0) scale(1.03) rotate(-1deg);
    box-shadow: 
      0 25px 35px rgba(0, 0, 0, 0.15),
      0 15px 15px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2),
      0 0 25px ${props => props.$variant === 'secondary' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
    background: 
      linear-gradient(135deg, 
        ${props => props.$variant === 'secondary' ? '#ffffff 0%, #fef2f2 50%, #ffffff 100%' : '#f8fafc 0%, #ffffff 50%, #f8fafc 100%'}
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 24px,
        rgba(0, 0, 0, 0.03) 25px,
        rgba(0, 0, 0, 0.03) 26px
      );
    border-color: ${props => props.$variant === 'secondary' ? '#fca5a5' : '#bfdbfe'};
    border-left-color: ${props => props.$variant === 'secondary' ? '#dc2626' : '#2563eb'};
    border-left-width: 5px;
    animation-play-state: paused;
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 0.8;
      transform: scale(1.3);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
  
  &:active {
    transform: translateY(-6px) translateZ(0) scale(1.02) rotate(-0.5deg);
    box-shadow: 
      0 15px 20px rgba(0, 0, 0, 0.1),
      0 8px 10px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    font-size: 1rem;
    padding: 18px 28px 18px 24px;
    min-width: 200px;
  }
`;


const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  animation: slideInFromLeft 1s ease-out 0.3s both, zoomInOut 2s ease-in-out 3s infinite;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
  animation: float 4s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 25px rgba(0, 0, 0, 0.15));
  }
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;


const RightSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;

  @media (max-width: 1024px) {
    min-height: 80vh;
    padding: 1.5rem 0;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    min-height: 60vh;
    padding: 1rem 0;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
    padding: 0.5rem 0;
  }
`;

const CircularFrame = styled.div`
  position: absolute;
  width: 1200px;
  height: 900px;
  border-color: #000;
  border-radius: 45%;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: 0;

  @media (max-width: 1200px) {
    width: min(85vw, 700px);
    height: min(65vh, 550px);
  }

  @media (max-width: 1024px) {
    width: min(80vw, 600px);
    height: min(60vh, 450px);
  }

  @media (max-width: 768px) {
    width: min(90vw, 500px);
    height: min(50vh, 350px);
    margin-right: 0;
  }

  @media (max-width: 480px) {
    width: min(95vw, 400px);
    height: min(45vh, 300px);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(135, 206, 250, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
  transition: all 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.02);
    box-shadow: 
      0 35px 70px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(135, 206, 250, 0.4),
      inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      rgba(135, 206, 250, 0.8) 0%, 
      rgba(70, 130, 180, 0.8) 25%,
      rgba(30, 144, 255, 0.8) 50%,
      rgba(70, 130, 180, 0.8) 75%,
      rgba(135, 206, 250, 0.8) 100%);
    border-radius: 27px;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255,255,255,0.15) 0%, 
      rgba(255,255,255,0.05) 50%,
      rgba(255,255,255,0.1) 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 25px;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 85%;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 90%;
  }
  
  @keyframes borderGlow {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`;
const GlowEffect = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(circle, rgba(135, 206, 250, 0.2) 0%, transparent 70%);
  border-radius: 50px;
  z-index: -2;
  animation: glow 3s ease-in-out infinite alternate;
  
  @keyframes glow {
    0% {
      opacity: 0.3;
      transform: scale(1);
    }
    100% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;
  position: relative;
  z-index: 1;
  filter: brightness(1.05) contrast(1.1) saturate(1.1);
  
  &::-webkit-media-controls {
    display: none !important;
  }
  
  &::-webkit-media-controls-panel {
    display: none !important;
  }
  
  &::-webkit-media-controls-play-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(135, 206, 250, 0.1) 0%,
    rgba(70, 130, 180, 0.05) 50%,
    rgba(30, 144, 255, 0.1) 100%
  );
  z-index: 3;
  pointer-events: none;
  border-radius: 25px;
  opacity: 0.7;
`;

// Animated background elements
const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingParticle = styled.div<{ $delay: number; $size: number; $left: number; $duration: number }>`
  position: absolute;
  left: ${props => props.$left}%;
  bottom: -50px;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
  border-radius: 50%;
  animation: floatUp ${props => props.$duration}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  filter: blur(1px);
  
  &:nth-child(even) {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3));
  }
  
  &:nth-child(3n) {
    background: linear-gradient(135deg, rgba(245, 101, 101, 0.3), rgba(239, 68, 68, 0.3));
  }
`;

const GeometricShape = styled.div<{ $type: 'circle' | 'square' | 'triangle'; $delay: number; $left: number; $top: number }>`
  position: absolute;
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  width: 20px;
  height: 20px;
  animation: particleFloat 8s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.1;
  
  ${props => props.$type === 'circle' && `
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  `}
  
  ${props => props.$type === 'square' && `
    background: linear-gradient(135deg, #10b981, #059669);
    transform: rotate(45deg);
  `}
  
  ${props => props.$type === 'triangle' && `
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #f59e0b;
    background: transparent;
  `}
`;

const WaveOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(59, 130, 246, 0.05) 25%, 
    rgba(139, 92, 246, 0.05) 50%, 
    rgba(59, 130, 246, 0.05) 75%, 
    transparent 100%);
  animation: waveAnimation 20s linear infinite;
  z-index: 2;
`;

const LightRay = styled.div<{ $delay: number; $angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform-origin: top;
  transform: translate(-50%, -100%) rotate(${props => props.$angle}deg);
  animation: rotateIn 10s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.3;
`;

const HeroSectionComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationElements, setAnimationElements] = useState<{
    particles: Array<{ id: number; delay: number; size: number; left: number; duration: number; }>;
    shapes: Array<{ id: number; type: 'circle' | 'square' | 'triangle'; delay: number; left: number; top: number; }>;
    lightRays: Array<{ id: number; delay: number; angle: number; }>;
  }>({
    particles: [],
    shapes: [],
    lightRays: []
  });

  useEffect(() => {
    // Generate random positions and properties for animated elements on client side
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      size: Math.random() * 15 + 5,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15
    }));

    const shapes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      delay: Math.random() * 8,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));

    const lightRays = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      angle: (360 / 8) * i
    }));

    setAnimationElements({ particles, shapes, lightRays });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoLoad = async () => {
        try {
          // 確実にミュートにする
          video.muted = true;
          video.playsInline = true;
          
          // 動画の再生を試行
          await video.play();
        } catch (error) {
          console.log('動画の自動再生に失敗しました:', error);
          
          // ユーザーの操作を待つためのイベントリスナーを追加
          const handleUserInteraction = async () => {
            try {
              await video.play();
              // 成功したらイベントリスナーを削除
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
            } catch (e) {
              console.log('ユーザー操作後の再生にも失敗しました:', e);
            }
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
        }
      };

      // 動画がロードされていれば即座に再生、そうでなければロードを待つ
      if (video.readyState >= 3) {
        handleVideoLoad();
      } else {
        video.addEventListener('canplay', handleVideoLoad, { once: true });
        video.addEventListener('loadedmetadata', handleVideoLoad, { once: true });
      }

      // Intersection Observer で画面に表示されたときに再生を確認
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && video.paused) {
              handleVideoLoad();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />

      <HeroSection>
        <BackgroundAnimation>
          {/* Floating particles */}
          {animationElements.particles.map((particle) => (
            <FloatingParticle
              key={particle.id}
              $delay={particle.delay}
              $size={particle.size}
              $left={particle.left}
              $duration={particle.duration}
            />
          ))}
          
          {/* Geometric shapes */}
          {animationElements.shapes.map((shape) => (
            <GeometricShape
              key={shape.id}
              $type={shape.type}
              $delay={shape.delay}
              $left={shape.left}
              $top={shape.top}
            />
          ))}
          
          {/* Light rays */}
          {animationElements.lightRays.map((ray) => (
            <LightRay
              key={ray.id}
              $delay={ray.delay}
              $angle={ray.angle}
            />
          ))}
          
          {/* Wave overlay */}
          <WaveOverlay />
        </BackgroundAnimation>
        
        <Container>
          <LeftSection>

            <MainContent>
              <LogoContainer>
                <LogoImage src="/images/caresmily-logo.png" alt="CareSmily Logo" />
              </LogoContainer>
              
              <MainTitle>
                膨大な文例
                <CrossSymbol>×</CrossSymbol>
                選択
              </MainTitle>
            

            </MainContent>
            
            <CTASection>
              <ScatteredDocumentButtons
                buttons={[
                  {
                    href: "/online-meeting",
                    text: "オンライン面談予約はこちら",
                    color: "pink"
                  },
                  {
                    href: "/contact",
                    text: "お問い合わせはこちら",
                    color: "blue"
                  },
                  {
                    href: "/document-request",
                    text: "資料請求はこちら",
                    color: "green"
                  },
                  {
                    href: "/media",
                    text: "CareSmilyについてのその他動画はこちら",
                    color: "yellow"
                  }
                ]}
              />
            </CTASection>
          </LeftSection>

          <RightSection>
            <CircularFrame>
              <GlowEffect />
              
              <VideoContainer>
                <StyledVideo
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  src="/images/CareSmily広告動画.mp4"
                />
                <VideoOverlay />
              </VideoContainer>
            </CircularFrame>
          </RightSection>
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
