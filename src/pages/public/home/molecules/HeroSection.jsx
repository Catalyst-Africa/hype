import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import HomeHeroImage1 from "../../../../assets/homeheroimage1.svg";
import HomeHeroImage2 from "../../../../assets/homeheroimage2.svg";
import HomeHeroImage3 from "../../../../assets/images/homeheroimage1.png";
import HomeHeroImageBg from "../../../../assets/homeheroimagebg.svg";
import { Title, SubTitle } from '@/styles/reusable/elements.styled';
import { Button } from '@/styles/reusable/elements.styled';
import { Link } from 'react-router-dom';

const HeroSection = () => {
   const [width, setWidth] = useState(window.innerWidth);
     useEffect(() => {
       const handleResize = () => setWidth(window.innerWidth);
       window.addEventListener("resize", handleResize);
       return () => {
         window.removeEventListener("resize", handleResize);
       };
     }, []);
  return (
    <Hero>
      <HeroInner1>
        <Title as="h1" color="#F69D00">
          Celebrate your loved ones
        </Title>
        <SubTitle>Share a hype today</SubTitle>
        <Link to="/send-hype">
          <Button>Send a Hype</Button>
        </Link>
      </HeroInner1>
      <HeroInner2>
        <br />
        <img
          src={width > 1199 ? HomeHeroImage2 : HomeHeroImage3}
          alt="Hero image"
        />
      </HeroInner2>
    </Hero>
  );
}

export default HeroSection

const Hero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: url(${HomeHeroImageBg});
  background-size: contain;
  background-repeat: no-repeat;
  padding: 0px 51px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 24px;
    padding-top: 70px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const HeroInner1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  button {
    max-width: 180px;
    padding: 0px 32px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    button {
      margin: auto;
    }
  }
`;
const HeroInner2 = styled.div`
  width: 100%;
  img {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    padding-top: 120px;
  }
`;

