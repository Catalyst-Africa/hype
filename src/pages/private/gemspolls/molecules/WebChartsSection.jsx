import React from "react";
import styled from "styled-components";
import SingleChart from "@/pages/private/gemspolls/molecules/SingleChart";

const WebChartsSection = () => {
  return (
    <>
      <ChartsContainer>
        <SingleChart
          type="Gems"
          title="Your Gems"
          count="2k"
          countColor="#f69d00"
          iconColor="#f69d00"
          bgColor="#f69d00"
        />
        <SingleChart
          type="Polls"
          title="Your Polls"
          count="80"
          countColor="#EF4444"
          iconColor="#EF4444"
          bgColor="#F5AF32"
        />
      </ChartsContainer>
    </>
  );
};

export default WebChartsSection;

const ChartsContainer = styled.div`
  display: flex;
  gap: 107px;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 107px;

  ${({ theme }) => theme.breakpoints.down("xl")} {
    width: 100%;
    gap: 40px;
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;
