"use client";

import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

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
`;

// スタイルコンポーネント
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -2;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  z-index: 10;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LeftContent = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const RightContent = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const HeadingSmall = styled.h5`
  font-size: 1.125rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const HeadingLarge = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: rgb(10, 37, 64);

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const TextGradient = styled.span`
  background: linear-gradient(90deg, #38bdf8, #4ade80);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const UnderlinedText = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    width: 100%;
    height: 0.25rem;
    background: linear-gradient(135deg, #38bdf8 0%, #4ade80 100%);
  }
`;

const Description = styled.p`
  color: #4b5563;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 32rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  background: linear-gradient(135deg, #38bdf8 0%, #4ade80 100%);
  color: white;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
  text-decoration: none;

  &:hover {
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  svg {
    margin-left: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

const SecondaryButton = styled.a`
  border: 1px solid #60a5fa;
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
    background-color: #eff6ff;
  }

  svg {
    margin-right: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
`;

const FloatingImage = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  animation: floating 3s ease-in-out infinite;

  img {
    border-radius: 0.75rem;
    width: 100%;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  animation: floating 3s ease-in-out infinite;
  display: flex;
  align-items: center;

  &.top-left {
    top: -2.5rem;
    left: -2.5rem;
    width: 12rem;
    animation-delay: 0.5s;
  }

  &.bottom-right {
    bottom: -2.5rem;
    right: 0;
    width: 13rem;
    animation-delay: 0.8s;
  }
`;

const IconCircle = styled.div`
  flex-shrink: 0;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.blue {
    background-color: #dbeafe;

    svg {
      color: #3b82f6;
    }
  }

  &.green {
    background-color: #dcfce7;

    svg {
      color: #22c55e;
    }
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

const CardContent = styled.div`
  margin-left: 0.75rem;

  p.label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
  }

  p.value {
    font-size: 1.25rem;
    font-weight: 700;
  }

  p.value.blue {
    color: #3b82f6;
  }

  p.value.green {
    color: #22c55e;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(56, 189, 248, 0.2);
  }
`;

const StatValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-variant-numeric: tabular-nums;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }

  &.blue {
    color: #3b82f6;
  }

  &.green {
    color: #22c55e;
  }

  &.teal {
    color: #14b8a6;
  }

  &.cyan {
    color: #06b6d4;
  }

  span {
    font-size: 1.125rem;
  }
`;

const StatLabel = styled.p`
  color: #4b5563;
`;

const HeroSectionComponent = () => {
  const countersRef = useRef([]);

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
      counters.forEach((counter) => {
        if (!counter) return;

        const target = Number.parseFloat(counter.getAttribute("data-target"));
        const suffix = counter.getAttribute("data-suffix") || "";
        let count = 0;
        const decimals = counter.getAttribute("data-target").includes(".")
          ? 1
          : 0;
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
      <GlobalStyle />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <HeroSection>
        <HeroBg />

        <Container>
          <FlexContainer>
            {/* Left content */}
            <LeftContent data-aos="fade-right">
                <img
                  src="/images/fukidashi.png"
                  alt="吹き出し"
                  style={{ width: '200px', height: 'auto' ,animation: 'floating 3s ease-in-out infinite'}}
                />
              <HeadingLarge>
                膨大な<TextGradient>文例</TextGradient>×
                <TextGradient>選択</TextGradient>で<br />
                <UnderlinedText>あなたのケアプランが</UnderlinedText>
                <br />
                <UnderlinedText>瞬時に形になる</UnderlinedText>
              </HeadingLarge>

              <Description>
                介護現場の書類作成時間を<strong>60%削減</strong>
                する文例特化型アプリ。
                <strong>10万件以上</strong>
                の専門家監修文例で、あなたの業務を革新します。
              </Description>

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
              </ButtonContainer>
            </LeftContent>

            {/* Right content - Image */}
            <RightContent data-aos="fade-left" data-aos-delay="200">
              <ImageContainer>
                {/* Hero image removed */}
              </ImageContainer>
            </RightContent>
          </FlexContainer>

          {/* Stats section removed */}
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
