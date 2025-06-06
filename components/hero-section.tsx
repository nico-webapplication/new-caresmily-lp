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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

const QuestionSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  animation: fadeInText 0.8s ease-out;
`;

const SmileyIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  animation: float 3s ease-in-out infinite;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
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
  font-size: 3.5rem;
  font-weight: 900;
  color: #111827;
  line-height: 1.2;
  margin: 0 0 2rem 0;
  animation: fadeInText 1s ease-out 0.3s both;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const CrossSymbol = styled.span`
  display: block;
  font-size: 2.5rem;
  color: #ef4444;
  margin: 1rem 0;
  font-weight: 300;
`;

const SubtitleText = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: #374151;
  line-height: 1.7;
  margin: 0 0 2rem 0;
  animation: fadeInText 1s ease-out 0.6s both;
`;

const SpeechBubble = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  animation: fadeInText 1s ease-out 0.9s both;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
`;

const SpeechText = styled.p`
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
  font-weight: 500;
`;

const IllustrationContainer = styled.div`
  display: flex;
  align-items: flex-end;
  animation: fadeInText 1.2s ease-out 1.2s both;
`;

const PersonIllustration = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 1s ease-out 0.5s both;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const CircularFrame = styled.div`
  position: relative;
  width: 1200px;
  height: 900px;
  border-radius: 40%;
  background: linear-gradient(135deg, #ff9a8b 0%, #a8a8a8 50%, #ffcc70 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: -150px;

  @media (max-width: 1024px) {
    width: 750px;
    height: 500px;
    margin-right: -100px;
  }

  @media (max-width: 768px) {
    width: 600px;
    height: 400px;
    margin-right: -80px;
  }
`;

const EventCard = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EventHeader = styled.div`
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 2rem;
  z-index: 10;
`;

const HeaderIcon = styled.div`
  width: 24px;
  height: 16px;
  background: linear-gradient(45deg, #3b82f6, #1e40af);
  border-radius: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: white;
    border-radius: 1px;
  }
`;

const HeaderText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.5px;
`;

const HeaderSeparator = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0.5rem;
`;

const BookContainer = styled.div`
  position: relative;
  width: 200px;
  height: 280px;
  margin: 3rem 0 2rem auto;
  transform: perspective(600px) rotateY(-15deg);
  transition: transform 0.3s ease;
`;

const BookCover = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
`;

const BookSpine = styled.div`
  position: absolute;
  right: -8px;
  top: 0;
  width: 16px;
  height: 100%;
  background: linear-gradient(to bottom, #0891b2 0%, #0e7490 100%);
  border-radius: 0 8px 8px 0;
`;

const BookContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
  margin-bottom: 1rem;
  text-align: center;
`;

const BookAccent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
`;

const DateSection = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const DateLarge = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #1f2937;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const DateMonth = styled.span`
  font-size: 2.5rem;
`;

const DateDay = styled.span`
  font-size: 2.5rem;
`;

const DateYear = styled.span`
  font-size: 1.2rem;
  color: #6b7280;
`;

const DateWeek = styled.span`
  font-size: 1.2rem;
  color: #6b7280;
  margin-left: 0.5rem;
`;

const TagSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.85rem;
  color: #374151;
  
  span:first-child {
    font-weight: 600;
  }
  
  span:last-child {
    font-weight: 400;
    color: #6b7280;
  }
`;

const TagLine = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  color: #6b7280;
  
  span {
    background: #f3f4f6;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
  }
`;

const EventDescription = styled.p`
  font-size: 0.9rem;
  color: #374151;
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
  font-weight: 600;
`;

const NavigationDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Dot = styled.div<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? '#1f2937' : '#d1d5db'};
`;

const NavArrows = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  pointer-events: none;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
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
                ふんこもは、京都大学文学研究科のイノベーションコモンズです。
                <br /><br />
                オープンスペース・イベントスペースとしてお使いのいただける
                「オフラインの場」であることとと、文学研究科のいろい
                ろなWebを発信する「オンラインの場」でもあります。
              </SubtitleText>

              <SpeechBubble>
                <SpeechText>"ふんこも"についてもっと知りたい？</SpeechText>
              </SpeechBubble>

              <IllustrationContainer>
                <PersonIllustration>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* Person reading illustration */}
                    <circle cx="60" cy="40" r="20" fill="#1f2937" />
                    <ellipse cx="60" cy="85" rx="25" ry="30" fill="#1f2937" />
                    <rect x="45" y="95" width="30" height="15" rx="7" fill="#1f2937" />
                  </svg>
                </PersonIllustration>
                <svg width="60" height="40" viewBox="0 0 60 40">
                  {/* Cat illustration */}
                  <ellipse cx="30" cy="25" rx="20" ry="12" fill="#1f2937" />
                  <circle cx="20" cy="20" r="8" fill="#1f2937" />
                  <circle cx="40" cy="20" r="8" fill="#1f2937" />
                  <polygon points="25,10 30,5 35,10" fill="#1f2937" />
                  <polygon points="35,10 40,5 45,10" fill="#1f2937" />
                </svg>
              </IllustrationContainer>
            </MainContent>
          </LeftSection>

          <RightSection>
            <CircularFrame>
              <EventCard>
                <EventHeader>
                  <HeaderIcon />
                  <HeaderText>WEB MAGAZINE</HeaderText>
                  <HeaderSeparator>——</HeaderSeparator>
                  <HeaderText>PICK UP</HeaderText>
                </EventHeader>

                <BookContainer>
                  <BookCover>
                    <BookSpine />
                    <BookContent>
                      <BookTitle>
                        自由に<br />
                        生きよう。<br />
                        変でも<br />
                        いいじゃん。
                      </BookTitle>
                    </BookContent>
                    <BookAccent />
                  </BookCover>
                </BookContainer>

                <DateSection>
                  <DateLarge>
                    <DateMonth>03</DateMonth>
                    <DateDay>.03</DateDay>
                    <DateYear>2025</DateYear>
                    <DateWeek>MON</DateWeek>
                  </DateLarge>
                  
                  <TagSection>
                    <span>● コラム</span>
                    <span>ふんこも編集部</span>
                  </TagSection>
                  
                  <TagLine>
                    <span>#倫理学</span>
                    <span>#哲学</span>
                    <span>#著者</span>
                    <span>#新刊紹介</span>
                  </TagLine>
                  
                  <EventDescription>
                    新書『哲学古典授業 ミル『自由論』の歩き方』ができるまで
                  </EventDescription>

                  <NavigationDots>
                    <Dot />
                    <Dot $active={true} />
                    <Dot />
                    <Dot />
                    <Dot />
                  </NavigationDots>
                </DateSection>
              </EventCard>

              <NavArrows>
                <ArrowButton>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10 12l-4-4 4-4" />
                  </svg>
                </ArrowButton>
                <ArrowButton>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 12l4-4-4-4" />
                  </svg>
                </ArrowButton>
              </NavArrows>

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
