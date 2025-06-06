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
    }
    100% {
      width: 100%;
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

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes gradient {
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

  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(-10px) translateX(-15px);
    }
    75% {
      transform: translateY(-30px) translateX(5px);
    }
  }

  @keyframes shapeRotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  @keyframes lightRay {
    0% {
      opacity: 0;
      transform: rotate(var(--angle)) scaleY(0);
    }
    50% {
      opacity: 0.6;
      transform: rotate(var(--angle)) scaleY(1);
    }
    100% {
      opacity: 0;
      transform: rotate(var(--angle)) scaleY(0);
    }
  }

  @keyframes wave {
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
  max-width: auto;
  margin: 0 auto;
  padding: 0 4rem;
  gap: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
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

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.2;
  color: #2d3748;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideInFromLeft 1s ease-out 0.6s both;
  position: relative;
  overflow: hidden;
`;

const CrossSymbol = styled.span`
  color: #e53e3e;
  font-weight: 900;
  margin: 0 0.5rem;
  display: inline-block;
  animation: bounceIn 1s ease-out 1.2s both;
  text-shadow: 2px 2px 4px rgba(229, 62, 62, 0.3);
`;

const CTASection = styled.div`
  margin-top: 3rem;
  width: 100%;
  
  button {
    font-size: 1rem;
    padding: 16px 24px;
    min-width: 200px;
  }
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const CircularFrame = styled.div`
  position: relative;
  width: 1100px;
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

  @media (max-width: 1024px) {
    width: 750px;
    height: 500px;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 600px;
    height: 400px;
    margin-right: 0;
    align-items: center;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 75%;
  height: 50%;
  border-radius: 25px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(135, 206, 250, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.2);
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

// 動画上映中バナーのスタイル
const VideoBanner = styled.div`
  position: absolute;
  top: 20px;
  left: 600px;
  z-index: 10;
  animation: float 3s ease-in-out infinite;
  
  img {
    height: 300px;
    width: auto;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3));
    }
  }

  @media (max-width: 1024px) {
    img {
      height: 100px;
    }
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    
    img {
      height: 80px;
    }
  }
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
`;

const FloatingParticle = styled.div<{
  $delay: number;
  $size: number;
  $left: number;
  $duration: number;
}>`
  position: absolute;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background: radial-gradient(circle, rgba(135, 206, 250, 0.6), rgba(135, 206, 250, 0.2));
  border-radius: 50%;
  top: 100%;
  left: ${(props) => props.$left}%;
  animation: particleFloat ${(props) => props.$duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  opacity: 0.4;
`;

const GeometricShape = styled.div<{
  $type: 'circle' | 'square' | 'triangle';
  $delay: number;
  $left: number;
  $top: number;
}>`
  position: absolute;
  width: 20px;
  height: 20px;
  left: ${(props) => props.$left}%;
  top: ${(props) => props.$top}%;
  animation: shapeRotate 8s linear infinite;
  animation-delay: ${(props) => props.$delay}s;
  opacity: 0.3;
  
  ${(props) => {
    switch (props.$type) {
      case 'circle':
        return `
          background: linear-gradient(45deg, #68d391, #38b2ac);
          border-radius: 50%;
        `;
      case 'square':
        return `
          background: linear-gradient(45deg, #f6ad55, #ed8936);
          border-radius: 4px;
        `;
      case 'triangle':
        return `
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 20px solid #9f7aea;
        `;
      default:
        return '';
    }
  }}
`;

const LightRay = styled.div<{
  $delay: number;
  $angle: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6), transparent);
  transform-origin: bottom;
  animation: lightRay 3s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  opacity: 0.3;
  --angle: ${(props) => props.$angle}deg;
`;

const WaveOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(135, 206, 250, 0.1), transparent);
  animation: wave 10s linear infinite;
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
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(console.error);
            } else {
              video.pause();
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
                膨大な文例<br/>
                <CrossSymbol>×</CrossSymbol>
                選択
              </MainTitle>
            </MainContent>
            
            {/* 動画上映中バナー */}
            <VideoBanner>
              <img src="/について.png" alt="CareSmily について 動画上映中" />
            </VideoBanner>

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
                    href: "https://www.youtube.com/@CareSmily",
                    target: "_blank",
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
              </VideoContainer>
            </CircularFrame>
          </RightSection>
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;