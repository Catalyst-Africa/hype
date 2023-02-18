import { SubTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  maintainAspectRatio: false,
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [100, 0, 100, 4, 50, 60, 17, 82, 9, 10, 11, 0]),
      backgroundColor: "#FFB328",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [0, 50, 3, 4, 50, 6, 7, 80, 0, 30, 2, 12]),
      backgroundColor: "#49DBD2",
    },
  ],
};

const Analytics = () => {
  return (
    <AnalyticsContainer>
      <TitleContainer>
        <SubTitle>Hypes Analytics</SubTitle>
        <SubTitle style={{ color: "rgba(57, 57, 57, 0.38)" }}>
          as of 10 January 2023, 09:36PM
        </SubTitle>
      </TitleContainer>
      <AnalyticsCard>
        <BarContainer>
          <Bar options={options} data={data} height={262} />
        </BarContainer>
      </AnalyticsCard>
    </AnalyticsContainer>
  );
};

export default Analytics;

const AnalyticsContainer = styled.div`
  margin-bottom: 86px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AnalyticsCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding: 19px 15px;
  width: 100%;
  background-color: #fff;
`;

const BarContainer = styled.div`
  width: 99%;
  position: relative;
`;