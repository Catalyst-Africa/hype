import React from "react";
import styled from "styled-components";
import { FaGem } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiTrendingUp } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import ProgressBar from "@/pages/private/components/ProgressBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopStats = () => {
  const streak = useSelector((state) => state.auth?.user?.streak);
  return (
    <>
      <StatsContainer>
        <FirstCard>
          <GemBlock>
            {/* <GemInnerBlock>
              <FaGem color="#FFB328" size={42} />
              <GemTitle>
                <FluidTitle>0</FluidTitle>
                <SubTitle>Gems</SubTitle>
              </GemTitle>
            </GemInnerBlock> */}
            <ProgressBlock>
              <ProgressTitle>
                You’re on a streak, {streak || 0} Days out 7days
              </ProgressTitle>
              <ProgressBar bgcolor="#FFB328" completed={streak * 14.3} />
            </ProgressBlock>
          </GemBlock>
        </FirstCard>
        <SecondCard>
          <Link to="/send-hype">
            <SmallCard>
              <RiSendPlaneFill color="#FFB328" size={24} />
              <SubTitle>Send Hypes</SubTitle>
            </SmallCard>
          </Link>

          {/* <Link to="">
            <SmallCard>
              <BiTrendingUp color="#FFB328" size={24} />
              <SubTitle>Trending Hypes</SubTitle>
            </SmallCard>
          </Link> */}

          {/* <SmallCard>
            <MdFavorite color="#FFB328" size={24} />
            <SubTitle>Favourites</SubTitle>
          </SmallCard> */}
        </SecondCard>
      </StatsContainer>

      <SecondCardMobile>
        {/* <Link to="/send-hype">
          <SmallCard>
            <RiSendPlaneFill color="#FFB328" size={24} />
            <SubTitle>Send Hypes</SubTitle>
          </SmallCard>
        </Link> */}
        {/* <Link to="">
          <SmallCard>
            <BiTrendingUp color="#FFB328" size={24} />
            <SubTitle>Trending Hypes</SubTitle>
          </SmallCard>
        </Link> */}

        {/* <SmallCard>
          <MdFavorite color="#FFB328" size={24} />
          <SubTitle>Favourites</SubTitle>
        </SmallCard> */}
      </SecondCardMobile>
    </>
  );
};

export default TopStats;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  padding: 28.5px 28px;
  gap: 20px;
  width: 100%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 18px 24px;
  }
`;

const FirstCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const SecondCard = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  /* gap: 40px; */
  /* padding: 10px 0px; */

  align-items: center;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
    /* flex-direction: column;
    align-items: flex-end;
    gap: 10px; */
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: row;
    align-items: flex-start;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    /* gap: 50px; */
  }
  h6 {
    width: 100%;
    ${({ theme }) => theme.breakpoints.down("xl")} {
      font-size: 14px;
    }

    ${({ theme }) => theme.breakpoints.down("md")} {
      font-size: 12px;
    }
  }
`;

const SecondCardMobile = styled.div`
  display: none;
  justify-content: center;
  gap: 40px;
  align-items: center;
  /* padding: 32px 47px; */

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
    /* padding: 32px 2px; */
  }

  h6 {
    ${({ theme }) => theme.breakpoints.down("touch")} {
      font-size: 14px;
    }

    ${({ theme }) => theme.breakpoints.down("md")} {
      font-size: 12px;
    }
  }
`;

const GemBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100%;
  ${({ theme }) => theme.breakpoints.down("touch")} {
    gap: 20px;
  }
`;

const GemInnerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

const GemTitle = styled.div``;

const ProgressBlock = styled.div`
  width: 100%;
`;

const ProgressTitle = styled.div`
  font-size: 12px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 10px;
  }
`;

const SmallCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    gap: 2px;
  }
`;
