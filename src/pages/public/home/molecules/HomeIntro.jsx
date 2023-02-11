import { Title, FluidTitle, SubTitle } from "@/styles/reusable/elements.styled";
import { Button } from "@/styles/reusable/elements.styled";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeHeroImage1 from "../../../../assets/homeheroimage1.svg";
import HomeHeroImage2 from "../../../../assets/homeheroimage2.svg";
import HomeHeroImage3 from "../../../../assets/images/homeheroimage1.png";
import HomeHeroImageBg from "../../../../assets/homeheroimagebg.svg";
import SectionOneImage from "../../../../assets/homesection1.svg";
import SectionTwoImage from "../../../../assets/homesection2.svg";
import SectionThreeImage from "../../../../assets/homesection3.svg";
import { AiFillHeart } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import { Logo } from "@/components/ui";

const HomeIntro = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];
  const [width, setWidth] = useState(window.innerWidth);

  const TemplatesList = [
    {
      icon: <AiFillHeart size={112} color="#FF0000" />,
      bgColor: "#FCCFCF",
      name: "Love",
    },

    {
      icon: <FaBirthdayCake size={112} color="#6C63FF" />,
      bgColor: "#D2D1E0",
      name: "BirthDay",
    },

    {
      icon: <MdCelebration size={112} color="#FFB328" />,
      bgColor: "#FCE6BE",
      name: "Celebration",
    },
    {
      icon: <RiHeartsFill size={112} color="#FFEDFA" />,
      bgColor: "#6C63FF",
      name: "Valentines",
    },
  ];

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
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
      <MainContainer>
        <SectionContainer>
          <ImageContainer>
            <img src={SectionOneImage} alt="Share Love" />
          </ImageContainer>
          <SectionInfo>
            <FluidTitle>Share Love</FluidTitle>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur. In fermentum duis viverra
              libero enim ut diam felis vitae egestas viverra turpis.
            </p>
          </SectionInfo>
        </SectionContainer>
        <SectionContainer>
          <InnerSectionContainer>
            <SectionInfo>
              <FluidTitle>Send Birthday Wishes</FluidTitle>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur. In fermentum duis
                viverra libero enim ut diam felis vitae egestas viverra turpis.
              </p>
            </SectionInfo>
            <ImageContainer>
              <img src={SectionTwoImage} alt="Send Birthday Wishes<" />
            </ImageContainer>
          </InnerSectionContainer>
        </SectionContainer>
        <SectionContainer>
          <ImageContainer>
            <img src={SectionThreeImage} alt="Celebrate your friend today" />
          </ImageContainer>

          <SectionInfo>
            <FluidTitle>Celebrate your friend today</FluidTitle>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur. In fermentum duis viverra
              libero enim ut diam felis vitae egestas viverra turpis.
            </p>
          </SectionInfo>
        </SectionContainer>

        <TemplatesContainer>
          <Title as="h1" color="#F69D00">
            Templates for everything
          </Title>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur. In fermentum duis viverra.
          </p>
          <TemplatesInnerContainer>
            {TemplatesList
              ? TemplatesList.map((item, index) => {
                  return (
                    <TemplateCardContainer key={index}>
                      <TemplatesCard style={{ backgroundColor: item.bgColor }}>
                        {item.icon}
                      </TemplatesCard>
                      <p>{item.name}</p>
                    </TemplateCardContainer>
                  );
                })
              : ""}
          </TemplatesInnerContainer>
        </TemplatesContainer>
        <Divider />
        <br />
        <br />
        <HomeFooter>
          <FooterSection>
            <Logo />
          </FooterSection>
          <FooterSection>
            <SubTitle>Legal</SubTitle>
            <br />
            <ul>
              <li>Terms</li>
              <li>Privacy</li>
              <li>FAQ</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <SubTitle>Contact Us</SubTitle>
            <br />
            <ul>
              <a href="https://www.instagram.com/sharehype4fun/">
                <li>Instagram</li>
              </a>
              <a href="https://twitter.com/sharehype4fun/">
                <li>Twitter</li>
              </a>
            </ul>
          </FooterSection>
        </HomeFooter>
        <br />
        <br />
        <Divider />
        <br />
        <span>2023 Catalyst Africa. All rights reserved</span>
        <br />
      </MainContainer>
    </>
  );
};

export default HomeIntro;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 51px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0px 24px;
  }
`;
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

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 74px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 100px;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    margin-top: 100px;
  }
`;

const InnerSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 74px;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column-reverse;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const SectionInfo = styled.div`
  width: 100%;
`;

const TemplatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const TemplatesInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 84px;
  width: 100%;
  gap: 40px;
  max-width: 1200px;
  margin-bottom: 120px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
const TemplatesCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 228px;
  border-radius: 12px;
`;

const TemplateCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  width: 100%;
`;

const Divider = styled.div`
  border: 1px solid #eee;
`;

const HomeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: auto;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
