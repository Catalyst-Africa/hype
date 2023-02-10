import React from "react";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import { Link } from "react-router-dom";

const TopStats = () => {
  const Stats = [
    {
      name: "Users",
      count: "750k",
      link: "/admin/users",
    },
    {
      name: "Total Hypes",
      count: "538",
      link: "/admin/hypes",
    },
    {
      name: "Sent Hypes",
      count: "7500",
      link: "/admin/sent-hypes",
    },

    {
      name: "Gems Used",
      count: "176k",
      link: "#",
    },
  ];
  return (
    <>
      <StatsContainer>
        {Stats
          ? Stats.map((item, index) => {
              return (
                <StatsCard key={index}>
                  <Link
                    to={item.link}
                    style={{ cursor: item.link === "#" ? "default" : "pointer" }}
                  >
                    <FluidTitle>{item.count}</FluidTitle>
                    <SubTitle style={{ color: "8A92A6", fontWeight: "400" }}>
                      {item.name}
                    </SubTitle>
                  </Link>
                </StatsCard>
              );
            })
          : ""}
      </StatsContainer>
    </>
  );
};

export default TopStats;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  padding: 28.5px 70px;
  gap: 40px;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down("touch")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    padding: 18px 24px;
    h6 {
      font-size: 10px;
    }

    /* grid-template-columns: repeat(1, minmax(0, 1fr)); */
  }
`;

const StatsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;
