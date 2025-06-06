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

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
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
  justify-content: center;
  align-items: center;
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
  align-items: right;
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
                膨大な文例
                <CrossSymbol>×</CrossSymbol>
                簡単な選択
              </MainTitle>
              
              <SubtitleText>
                介護施設で多くの手間と時間がかかる書類作成を効率化するための文例特化型WEBアプリケーションです。様々な書類に使用できる 

              </SubtitleText>

            </MainContent>
          </LeftSection>

          <RightSection>
            <CircularFrame>
              

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
