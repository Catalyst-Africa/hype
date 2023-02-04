import React from "react";
import { FluidTitle, SubTitle } from "@/styles/reusable/elements.styled";
import styled from "styled-components";
import { IoDiamond } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import { BsFillBarChartFill } from "react-icons/bs";

const SingleChart = ({
  type,
  title,
  count,
  countColor,
  bgColor,
  iconColor,
  displayCondition,
}) => {
  return (
    <SingleChartContainer style={{ display: displayCondition }}>
      <ChartIcon style={{ backgroundColor: bgColor }}>
        {type === "Gems" ? (
          <IoDiamond size="80px" />
        ) : (
          <BsFillBarChartFill color="#D9D9D9" size="80px" />
        )}
      </ChartIcon>
      <FluidTitle color="#393939" style={{ opacity: "0.25" }}>
        {title}
      </FluidTitle>
      <ChartStats>
        {type === "Gems" ? (
          <IoDiamond style={{ color: "#f69d00", opacity: "0.25" }}></IoDiamond>
        ) : (
          <FaPoll style={{ color: "#EF4444", opacity: "0.25" }}></FaPoll>
        )}
        <SubTitle style={{ color: countColor, opacity: "0.25" }}>
          {count}
        </SubTitle>
      </ChartStats>
      <ChartInnerContainer>
        {type === "Gems" ? (
          <IoDiamond
            style={{
              opacity: "0.25",
            }}
            color={iconColor}
            size="250px"
          />
        ) : (
          <BsFillBarChartFill
            style={{
              opacity: "0.25",
            }}
            color="#00819D"
            size="250px"
          />
        )}

        <ComingSoonBanner>
          <FluidTitle color="#fff">Coming Soon</FluidTitle>
        </ComingSoonBanner>
      </ChartInnerContainer>
    </SingleChartContainer>
  );
};

export default SingleChart;

const SingleChartContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 27px 4px rgba(0, 0, 0, 0.15);
  border-radius: 22px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 460px;
  gap: 18px;
`;

const ChartInnerContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChartIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115px;
  height: 115px;
  border: 4px solid #d9d9d9;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  margin-top: -50px;
`;

const ChartStats = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ComingSoonBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(246, 157, 0, 0.7);
  box-shadow: 0px 2px 27px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 18px 18px;
  width: 100%;
  height: 76px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
`;
