import { Title, FluidTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SectionOneImage from "../../../../assets/homesection1.svg";
import SectionTwoImage from "../../../../assets/homesection2.svg";
import SectionThreeImage from "../../../../assets/homesection3.svg";
import { AiFillHeart } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";

const HomeIntro = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];

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

  return (
    <>
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
      </MainContainer>
    </>
  );
};

export default HomeIntro;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  text-align: center;
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
