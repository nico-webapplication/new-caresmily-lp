"use client";

import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";

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
`;

// スタイルコンポーネント
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: 
    radial-gradient(ellipse 120% 150% at 15% 75%, rgba(135, 206, 250, 0.7) 0%, rgba(30, 144, 255, 0.5) 35%, transparent 80%),
    radial-gradient(ellipse 130% 120% at 85% 15%, rgba(135, 206, 250, 0.5) 0%, rgba(70, 130, 180, 0.4) 45%, transparent 90%),
    radial-gradient(ellipse 110% 140% at 55% 55%, rgba(100, 149, 237, 0.4) 0%, transparent 75%),
    linear-gradient(135deg, #f5f5dc 0%, #f0e68c 15%, #f5deb3 30%, #e6ddd4 60%, #d4c5b9 100%);
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
  padding: 0 2rem;
  gap: 12rem;

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

const MainTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  animation: fadeInText 1s ease-out 0.3s both;
  letter-spacing: -0.02em;

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
  color: #ef4444;
  margin: 0 1rem;
  font-weight: 300;
  vertical-align: middle;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin: 0 0.5rem;
  }
`;

const SubtitleText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 2.5rem 0;
  animation: fadeInText 1s ease-out 0.6s both;
  max-width: 90%;
`;

const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeInText 1s ease-out 0.9s both;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  width: fit-content;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const VideoPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
`;

const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pointRight 2s ease-in-out infinite;
  
  &::after {
    content: '→';
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  @keyframes pointRight {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(8px);
    }
  }
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;


const RightSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 1s ease-out 0.5s both;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const CircularFrame = styled.div`
  position: absolute;
  width: 1200px;
  height: 900px;
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
  height: 65%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(135, 206, 250, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
  transition: all 0.3s ease;
  animation: float 6s ease-in-out infinite;
  
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
    animation: borderGlow 3s ease-in-out infinite;
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
  
  @keyframes borderGlow {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`;

const DecorationElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 4;
`;

const FloatingElement = styled.div<{ top: string; left: string; delay: number; size: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(135, 206, 250, 0.6));
  border-radius: 50%;
  animation: floatDeco ${props => 4 + props.delay}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 4px 20px rgba(135, 206, 250, 0.3);
  
  @keyframes floatDeco {
    0%, 100% {
      transform: translateY(0px) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-15px) scale(1.1);
      opacity: 0.9;
    }
  }
`;

const BrandOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  animation: fadeInUp 1s ease-out 1s both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const FeatureTag = styled.div<{ position: string }>`
  position: absolute;
  ${props => props.position};
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  z-index: 5;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  animation: popIn 0.8s ease-out both;
  
  &:nth-child(1) {
    animation-delay: 1.2s;
  }
  
  &:nth-child(2) {
    animation-delay: 1.5s;
  }
  
  &:nth-child(3) {
    animation-delay: 1.8s;
  }
  
  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(20px);
    }
    80% {
      transform: scale(1.1) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
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

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
  
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 18px solid #1f2937;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 4px;
  }
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    50% {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 15px rgba(255, 255, 255, 0);
    }
  }
`;

const CircularStamp = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 80px;
  height: 80px;
  border: 3px solid #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
  color: #1f2937;
  transform: rotate(15deg);
`;

const HeroSectionComponent = () => {
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
        <Container>
          <LeftSection>

            <MainContent>
              <MainTitle>
                <HighlightText>膨大な文例</HighlightText>
                <CrossSymbol>×</CrossSymbol>
                簡単な選択
              </MainTitle>
              
              <SubtitleText>
                介護施設で多くの手間と時間がかかる書類作成を効率化するための文例特化型WEBアプリケーションです。AI技術により、適切な文例を瞬時に選択して効率的な書類作成を実現します。
              </SubtitleText>

            </MainContent>
            
            <CTASection>
              <CTAButton>
                今すぐ始める
              </CTAButton>
              
              <VideoPrompt>
                <ArrowIcon />
                動画でCareSmily の使い方を確認
              </VideoPrompt>
            </CTASection>
          </LeftSection>

          <RightSection>
            <CircularFrame>
              <GlowEffect />
              
              <VideoContainer>
                <StyledVideo
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/images/CareSmily広告動画.mp4"
                />
                <VideoOverlay />
                <PlayIcon />
                
                <BrandOverlay>
                  <LogoIcon>C</LogoIcon>
                  CareSmily
                </BrandOverlay>
              </VideoContainer>

              <DecorationElements>
                <FloatingElement 
                  top="15%" 
                  left="10%" 
                  delay={0} 
                  size="20px" 
                />
                <FloatingElement 
                  top="25%" 
                  left="80%" 
                  delay={1} 
                  size="15px" 
                />
                <FloatingElement 
                  top="70%" 
                  left="15%" 
                  delay={2} 
                  size="18px" 
                />
                <FloatingElement 
                  top="60%" 
                  left="85%" 
                  delay={1.5} 
                  size="12px" 
                />
              </DecorationElements>

              <FeatureTag position="top: 10%; left: 20%;">
                AI書類作成
              </FeatureTag>
              
              <FeatureTag position="top: 30%; right: 15%;">
                簡単操作
              </FeatureTag>
              
              <FeatureTag position="bottom: 15%; left: 15%;">
                時短効率化
              </FeatureTag>
            </CircularFrame>
          </RightSection>
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
