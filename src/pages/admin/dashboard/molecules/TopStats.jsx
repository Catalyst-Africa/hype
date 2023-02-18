import React from "react";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import { Link } from "react-router-dom";
import { useGetAdminStatisticsQuery } from "@/setup/redux/slices/api/nestedApis/adminApi";

const TopStats = () => {
  const { data } = useGetAdminStatisticsQuery();
  const Stats = [
    {
      name: "Users",
      count: data?.[0]?.users || 0,
      link: "/admin/users",
    },
    {
      name: "Sent Hypes",
      count: data?.[0]?.sentHypes || 0,
      link: "/admin/sent-hypes",
    },
    {
      name: "Recieved Hypes",
      count: data?.[0]?.sentHypes || 0,
    },
    {
      name: "Gems Used",
      count: data?.[0]?.gemsUsed || 0,
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
                    style={{ cursor: !item.link ? "default" : "pointer" }}
                  >
                    <FluidTitle>{item.count || 0}</FluidTitle>
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
