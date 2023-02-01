import React, { useState } from "react";
import styled from "styled-components";
import { SubTitle } from "@/styles/reusable/elements.styled";
import SingleChart from "@/pages/private/gemspolls/molecules/SingleChart";

const MobileChartsSection = () => {
  const [toggleMobileChartTab1, setToggleMobileChartTab1] = useState(true);
  const [toggleMobileChartTab2, setToggleMobileChartTab2] = useState(false);

  const toggleMobileChartTab1Handler = () => {
    setToggleMobileChartTab1(true);
    setToggleMobileChartTab2(false);
  };

  const toggleMobileChartTab2Handler = () => {
    setToggleMobileChartTab2(true);
    setToggleMobileChartTab1(false);
  };
  return (
    <>
      <ChartsContainer>
        <MobileChartTab>
          <GemsTab
            onClick={toggleMobileChartTab1Handler}
            style={{
              backgroundColor: toggleMobileChartTab1 ? "#f69d00" : "#ffffff",
              color: toggleMobileChartTab1
                ? "#fbfffd"
                : "rgba(79, 94, 113, 0.5)",
            }}
          >
            <SubTitle>Gems</SubTitle>
          </GemsTab>
          <PollsTab
            onClick={toggleMobileChartTab2Handler}
            style={{
              backgroundColor: toggleMobileChartTab2 ? "#f69d00" : "#ffffff",
              color: toggleMobileChartTab2
                ? "#fbfffd"
                : "rgba(79, 94, 113, 0.5)",
            }}
          >
            <SubTitle>Polls</SubTitle>
          </PollsTab>
        </MobileChartTab>

        <SingleChart
          type="Gems"
          title="Your Gems"
          count="2k"
          countColor="#f69d00"
          iconColor="#f69d00"
          bgColor="#f69d00"
          displayCondition={toggleMobileChartTab1 ? "flex" : "none"}
        />
        <SingleChart
          type="Polls"
          title="Your Polls"
          count="80"
          countColor="#EF4444"
          iconColor="#EF4444"
          bgColor="#F5AF32"
          displayCondition={toggleMobileChartTab2 ? "flex" : "none"}
        />
      </ChartsContainer>
    </>
  );
};

export default MobileChartsSection;

const ChartsContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 107px;
  margin-top: 100px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: flex;
  }
`;

const MobileChartTab = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 50px;
  width: 100%;
`;

const GemsTab = styled.div`
  border: 1px solid #bac7d5;
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  padding: 11px 12px;
  border-right: none;
  cursor: pointer;
`;

const PollsTab = styled.div`
  background: #ffffff;
  border: 1px solid #bac7d5;
  border-radius: 0px 5px 5px 0px;
  width: 100%;
  padding: 11px 12px;
  border-left: none;
  cursor: pointer;
`;
