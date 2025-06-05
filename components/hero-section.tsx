"use client";

import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
// Removed Lottie import for now - will add custom animations instead

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #38bdf8;
    --primary-dark: #0ea5e9;
    --secondary: #4ade80;
    --accent: #22c55e;
    --tw-bg-opacity: 1;
  }

  body {
    font-family: 'Noto Sans JP', sans-serif;
    overflow-x: hidden;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
    100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      text-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
    }
    50% {
      text-shadow: 0 0 30px rgba(239, 68, 68, 1), 0 0 40px rgba(239, 68, 68, 0.8);
    }
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 0.1;
    }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 0.1;
    }
  }
`;

// スタイルコンポーネント
const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 0 0; // 上だけ余白、下は無し
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  background-image: url("/images/many_documents.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const FlexContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const HeadingLarge = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-left: 450px;
  transform: rotate(-4.5deg);

  @media (max-width: 768px) {
    padding-left: 0;
    padding: 0 1rem;
    transform: rotate(0deg);
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const TextGradient = styled.span`
  color: rgb(26 43 74);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
  animation: fadeInUp 1.2s ease-out;
  display: inline-block;
`;

const TextGradientCross = styled.span`
  color: #ef4444;
  font-weight: 900;
  font-size: 1.5em;
  text-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
  filter: brightness(1.2);
  margin: 0 0.5rem;
  animation:
    scaleIn 1.5s ease-out 0.8s both,
    glowPulse 2s ease-in-out 2s infinite;
  display: inline-block;
`;

const TextGradientSelect = styled.span`
  color: rgb(26 43 74);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
  animation: fadeInUp 1.2s ease-out 1.2s both;
  display: inline-block;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeInUp 1.8s ease-out 2s both;
  padding-bottom: 400px;
  padding-left: 300px;
  transform: rotate(-4deg);

  @media (max-width: 768px) {
    padding-bottom: 2rem;
    padding-left: 0;
    padding: 0 1rem 2rem 1rem;
    transform: rotate(0deg);
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem 1rem 0.5rem;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  background: linear-gradient(135deg, #ff990a 0%, #ffe10a 100%);
  color: white;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(59, 130, 246, 0.3),
    0 4px 6px -2px rgba(59, 130, 246, 0.2)
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
  text-decoration: none;

&:hover {
  /* ほんのり明るいグラデーションに変化 */
  background: linear-gradient(135deg, #ffb30a 0%, #fff60a 100%);

  /* 暖色系の影に置き換え */
  box-shadow:
    0 10px 15px -3px rgba(255, 153, 10, 0.35),
    0  4px  6px -2px rgba(255, 225, 10, 0.25);

  transform: translateY(-2px);      /* 浮き上がり感を追加（任意） */
}

  svg {
    margin-left: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

const SecondaryButton = styled.a`
  background: linear-gradient(135deg, #eff6ff 0%, #eff6ff 100%);
  border: 2px solid #3b82f6;
  color: #3b82f6;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    background: #3b82f6;
    color: white;
    border-color: #2563eb;
  }

  svg {
    margin-right: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  z-index: 10;
  animation: fadeInDown 1s ease-out 0.5s both;
  padding-bottom: 300px;
  padding-right: 650px;
  transform: rotate(-4deg);

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    transform: scale(0.8);
  }
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(56, 189, 248, 0.15) 0%,
    rgba(74, 222, 128, 0.15) 100%
  );
  animation: floating 6s ease-in-out infinite;

  &.element-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &.element-2 {
    width: 60px;
    height: 60px;
    top: 60%;
    left: 15%;
    animation-delay: 2s;
  }

  &.element-3 {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 8%;
    animation-delay: 4s;
  }

  &.element-4 {
    width: 40px;
    height: 40px;
    top: 70%;
    right: 12%;
    animation-delay: 1s;
  }

  @media (max-width: 768px) {
    opacity: 0.5;

    &.element-1 {
      width: 50px;
      height: 50px;
    }
    &.element-2 {
      width: 40px;
      height: 40px;
    }
    &.element-3 {
      width: 60px;
      height: 60px;
    }
    &.element-4 {
      width: 30px;
      height: 30px;
    }
  }
`;

const LeftTextImage = styled.img`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 400px;
  width: 30%;
  height: auto;
  z-index: 10;
  animation: fadeInUp 1.5s ease-out 0.5s both;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3));

  @media (max-width: 1024px) {
    max-width: 300px;
    width: 35%;
    left: 3%;
  }

  @media (max-width: 768px) {
    max-width: 250px;
    width: 40%;
    left: 2%;
  }

  @media (max-width: 480px) {
    max-width: 200px;
    width: 45%;
    top: 40%;
  }
`;

const HeroSectionComponent = () => {
  const countersRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // AOSの初期化
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });

    // カウンターアニメーション
    const counters = countersRef.current;
    if (counters && counters.length > 0) {
      counters.forEach((counter: HTMLElement) => {
        if (!counter) return;

        const targetAttr = counter.getAttribute("data-target");
        if (!targetAttr) return;

        const target = Number.parseFloat(targetAttr);
        const suffix = counter.getAttribute("data-suffix") || "";
        let count = 0;
        const decimals = targetAttr.includes(".") ? 1 : 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = count.toFixed(decimals) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + suffix;
          }
        };

        updateCount();
      });
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
        <HeroBg />
        
        <LeftTextImage 
          src="/images/hero-text.png" 
          alt="専門家監修の膨大な文例×選択 あなたのケアプランが瞬時に形になる"
        />

        <Container>
          {/* <FlexContainer>
            <TextContainer>
              <HeadingLarge>
                <TextGradient>専門家監修の</TextGradient>
                <br />
                <TextGradient>膨大な文例</TextGradient>
                <br />
                <TextGradientCross>×</TextGradientCross>
                <br />
                <TextGradientSelect>簡単選択</TextGradientSelect>
              </HeadingLarge>
            </TextContainer>
          </FlexContainer>
          <ButtonContainer>
            <PrimaryButton href="/online-meeting">
              オンライン面談を予約
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </PrimaryButton>
            <SecondaryButton href="/document-request">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              資料請求はこちら
            </SecondaryButton>
          </ButtonContainer> */}
          
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
