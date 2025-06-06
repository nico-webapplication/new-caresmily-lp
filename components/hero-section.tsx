"use client";

import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    overflow-x: hidden;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }

  @keyframes pathExpand1 {
    0% { 
      stroke-dasharray: 0 1000;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 500 500;
      opacity: 1;
    }
    100% { 
      stroke-dasharray: 1000 0;
      opacity: 0.8;
    }
  }

  @keyframes pathExpand2 {
    0% { 
      stroke-dasharray: 0 800;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 400 400;
      opacity: 1;
    }
    100% { 
      stroke-dasharray: 800 0;
      opacity: 0.8;
    }
  }

  @keyframes pathExpand3 {
    0% { 
      stroke-dasharray: 0 1200;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 600 600;
      opacity: 1;
    }
    100% { 
      stroke-dasharray: 1200 0;
      opacity: 0.8;
    }
  }

  @keyframes pathExpand4 {
    0% { 
      stroke-dasharray: 0 900;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 450 450;
      opacity: 1;
    }
    100% { 
      stroke-dasharray: 900 0;
      opacity: 0.8;
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
`;

// スタイルコンポーネント
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
`;

const LogoContainer = styled.div`
  flex: 0 0 auto;
  margin-right: 4rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  animation: fadeInText 1s ease-out 0.5s both;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

const MainHeading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin: 0;
  animation: fadeInText 1s ease-out 1s both;

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
        <AnimatedBackground>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1400 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Green curved line */}
            <path
              d="M-50,300 Q200,100 400,200 T800,150 Q1000,100 1200,200 T1450,250"
              stroke="#22c55e"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              style={{
                animation: "pathExpand1 4s ease-in-out infinite alternate",
              }}
            />
            
            {/* Blue curved line */}
            <path
              d="M-50,400 Q150,500 350,400 T650,350 Q850,300 1050,400 T1450,450"
              stroke="#3b82f6"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              style={{
                animation: "pathExpand2 4s ease-in-out infinite alternate 1s",
              }}
            />
            
            {/* Yellow curved line */}
            <path
              d="M-50,100 Q300,50 500,150 T900,200 Q1100,250 1300,150 T1450,100"
              stroke="#fbbf24"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              style={{
                animation: "pathExpand3 4s ease-in-out infinite alternate 2s",
              }}
            />
            
            {/* Pink curved line */}
            <path
              d="M-50,600 Q250,700 450,600 T750,550 Q950,500 1150,600 T1450,650"
              stroke="#ec4899"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              style={{
                animation: "pathExpand4 4s ease-in-out infinite alternate 3s",
              }}
            />
            
            {/* Additional curved paths for complexity */}
            <path
              d="M200,50 Q400,150 600,100 T1000,50 Q1200,0 1400,100"
              stroke="#22c55e"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              style={{
                animation: "pathExpand1 5s ease-in-out infinite alternate 0.5s",
              }}
            />
            
            <path
              d="M100,750 Q300,650 500,700 T900,750 Q1100,800 1300,700"
              stroke="#3b82f6"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              style={{
                animation: "pathExpand2 5s ease-in-out infinite alternate 1.5s",
              }}
            />
          </svg>
        </AnimatedBackground>

        <Container>
          <LogoContainer>
            <LogoImage 
              src="/images/CareSmily_ロゴ.png"
              alt="CareSmily Social Action"
            />
          </LogoContainer>
          
          <TextContainer>
            <MainHeading>
              各専門家監修の<br />膨大な文例<br />
              ✖️<br />
              簡単な選択<br />
              <br />
              あなただけのケアプランが瞬時に形になる
            </MainHeading>
          </TextContainer>
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
