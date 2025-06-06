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
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: 
    linear-gradient(135deg, 
      #f8f9fa 0%, 
      #fff3e0 20%, 
      #ffe0b3 40%, 
      #ffcc80 60%, 
      #ffb74d 80%, 
      #ff9800 100%
    );
  
  @media (max-width: 768px) {
    min-height: 80vh;
  }
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
  padding: 0 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 4rem;
  position: relative;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const QuestionSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  animation: fadeInText 0.8s ease-out;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SmileyIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  animation: float 3s ease-in-out infinite;
`;

const QuestionText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
  border-bottom: 2px dotted #9ca3af;
  padding-bottom: 0.5rem;
`;

const MainContent = styled.div`
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: #1a1a1a;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  animation: fadeInText 1s ease-out 0.3s both;
  letter-spacing: 0.02em;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const CrossSymbol = styled.span`
  font-size: 3rem;
  color: #1a1a1a;
  margin: 0 0.5rem;
  font-weight: 300;
  display: inline-block;
`;

const SubtitleText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 1.8;
  margin: 1.5rem 0 3rem 0;
  animation: fadeInText 1s ease-out 0.6s both;
  max-width: 500px;
`;

const IllustrationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  animation: fadeInText 1.2s ease-out 1.2s both;
`;

const PersonIllustration = styled.div`
  position: relative;
  margin-right: 2rem;
  
  svg {
    width: 120px;
    height: 120px;
  }
`;

const CatIllustration = styled.div`
  position: relative;
  
  svg {
    width: 80px;
    height: 80px;
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  top: -60px;
  left: 20px;
  background: white;
  border: 2px solid #333;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #333;
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 22px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid white;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 1s ease-out 0.5s both;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const CircularFrame = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateX(20%);

  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
    transform: translateX(10%);
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    transform: translateX(0);
  }
`;

const EventCard = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #1a1a2e;
  color: white;
  border-radius: 12px;
  padding: 16px;
  width: 280px;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    width: 200px;
    padding: 12px;
    font-size: 0.75rem;
  }
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  .web-magazine {
    font-size: 0.7rem;
    color: #ff6b6b;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .pickup {
    background: #ff6b6b;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.6rem;
  }
`;

const EventImage = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(45deg, #2c3e50, #34495e);
  border-radius: 8px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '第6回';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const EventDate = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  
  .year {
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

const EventTitle = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 12px;
`;

const EventDots = styled.div`
  display: flex;
  gap: 4px;
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #666;
    
    &.active {
      background: white;
    }
  }
`;

const CircularStamp = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 80px;
  height: 80px;
  border: 3px solid #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 0.65rem;
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
            <QuestionSection>
              <SmileyIcon>😊</SmileyIcon>
              <QuestionText>What is "ふんこも"?</QuestionText>
            </QuestionSection>

            <MainContent>
              <MainTitle>
                ONLINE
                <CrossSymbol>×</CrossSymbol>
                OFFLINE
              </MainTitle>
              
              <SubtitleText>
                ふんこもは、文京大学文学部資料のイノベーションコミュニティです。
                オープンスペース・イベントスペースとして使われる
                「オフラインの場」であることにも、文学資料のいろい
                ろなWebを意識する「オンラインの場」でもあります。
              </SubtitleText>
            </MainContent>

            <IllustrationContainer>
              <PersonIllustration>
                <SpeechBubble>
                  "ふんこも"についてもっと知りたい!
                </SpeechBubble>
                <svg viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="40" r="25" fill="#333"/>
                  <path d="M35 50 C35 60, 45 85, 60 85 C75 85, 85 60, 85 50" fill="#333"/>
                  <circle cx="55" cy="35" r="2" fill="white"/>
                  <circle cx="65" cy="35" r="2" fill="white"/>
                  <path d="M50 45 Q60 50 70 45" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </PersonIllustration>
              
              <CatIllustration>
                <svg viewBox="0 0 80 80" fill="none">
                  <ellipse cx="40" cy="50" rx="20" ry="15" fill="#333"/>
                  <path d="M25 35 L30 25 L35 35" fill="#333"/>
                  <path d="M45 35 L50 25 L55 35" fill="#333"/>
                  <circle cx="35" cy="45" r="2" fill="white"/>
                  <circle cx="45" cy="45" r="2" fill="white"/>
                  <path d="M35 52 Q40 55 45 52" stroke="white" strokeWidth="1" fill="none"/>
                  <path d="M20 60 Q40 70 60 60" stroke="#333" strokeWidth="3" fill="none"/>
                </svg>
              </CatIllustration>
            </IllustrationContainer>
          </LeftSection>

          <RightSection>
            <CircularFrame>
              <EventCard>
                <EventHeader>
                  <div className="web-magazine">
                    <span>📰</span>
                    <span>WEB MAGAZINE ——— PICK UP</span>
                  </div>
                </EventHeader>
                
                <EventImage />
                
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <EventDate>
                    12.25
                    <span className="year">2024</span>
                    <div style={{ fontSize: '0.7rem', fontWeight: 'normal', marginTop: '4px' }}>WED</div>
                  </EventDate>
                  
                  <div style={{ fontSize: '0.7rem', textAlign: 'right', lineHeight: '1.3' }}>
                    <div>• イベントレポート</div>
                    <div>『学問名をテ　名誉　名誉席展示』</div>
                    <div>『第6回ろうさ　　ふんこもは展開室』</div>
                  </div>
                </div>
                
                <EventTitle>
                  百万通りサロン｜第6回　映画音楽カミタキ★ー
                  の音楽が去るうのI?　情感景観さんをお迎えして
                </EventTitle>
                
                <EventDots>
                  <div className="dot active"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </EventDots>
              </EventCard>
              
              <CircularStamp>
                PAGE TOP<br />
                ふんこも展示室
              </CircularStamp>
            </CircularFrame>
          </RightSection>
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
