"use client";

import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";
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

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }

  /* Semi-transparent overlay to dim the video */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    z-index: 1;
  }

  /* Fallback background for unsupported devices */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  @media (max-width: 768px) {
    &::before {
    }
  }
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
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: rgb(10, 37, 64);
  text-align: center;

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
`;

const TextGradient = styled.span`
  background: linear-gradient(90deg, #4b5563, #4b5563);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const TextGradientCross = styled.span`
  background: linear-gradient(90deg, #e40505, #e40505);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding: 300px;
`;

const TextGradientSelect = styled.span`
  background: linear-gradient(90deg, #4b5563, #4b5563);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding: 200px;
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
  text-align: center;
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
        <HeroBg>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-video2.mp4" type="video/mp4" />
          </video>
        </HeroBg>

        <Container>
          <FlexContainer>
            {/* Left content */}
            <TextContainer>
              <HeadingLarge>
                <TextGradient>専門家監修の膨大な文例</TextGradient>
              <br/>
                <TextGradientCross>×</TextGradientCross>
                <br/>
                <TextGradientSelect>簡単選択</TextGradientSelect>
                 <br/>
                <br/>
                <UnderlinedText>あなただけのケアプランが</UnderlinedText>
                <br />
                <UnderlinedText>瞬時に形になる</UnderlinedText>
              </HeadingLarge>

              <Description>
                介護現場の書類作成時間を<strong>60%削減</strong>
                する文例特化型アプリ。
                <br />
                <strong>10万件以上</strong>
                の専門家監修文例で、あなたの業務を革新します。
              </Description>
            </TextContainer>
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
          </FlexContainer>

          {/* Stats section removed */}
        </Container>
      </HeroSection>
    </>
  );
};

export default HeroSectionComponent;
