import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHype,
  getAllHypeSent,
} from "@/setup/redux/slices/app/extraReducers";

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

const label = ["Statistics"];

const Analytics = () => {
  const dispatch = useDispatch();
  const hypesListSent = useSelector((state) => state.app.allHypeSent);
  const hypesList = useSelector((state) => state.app.hypes);

  useEffect(() => {
    dispatch(getAllHype());
    dispatch(getAllHypeSent());
  }, []);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Total Hypes",
        data: [hypesList?.length || 0],
        backgroundColor: "#36BFFA",
      },
      {
        label: "Sent Hypes",
        data: [hypesListSent.length || 0],
        backgroundColor: "#12B76A",
      },
    ],
  };

  return (
    <AnalyticsContainer>
      <TitleContainer>
        <SubTitle>Conversions</SubTitle>
      </TitleContainer>
      <AnalyticsCard>
        <BarContainer>
          <Bar options={options} data={data} height={362} />
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
  justify-content: space-between;
  gap: 8px;
  align-items: center;
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

const SelectDate = styled.select`
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  font-weight: 400;
  font-size: 16px;
  line-height: 175%;
  color: #8a92a6;

  :focus {
    outline: none;
  }
`;
