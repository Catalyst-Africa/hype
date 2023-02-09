import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
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

const getCurrentMonthName = (parameter) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[parameter];
};

const labelsDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const LabelYear = [
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

const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
const last30DaysMonth = last30Days.getMonth();
const currentMonth = new Date().getMonth();

const labelsMonth = [getCurrentMonthName(currentMonth)];

const Label30days = [getCurrentMonthName(last30DaysMonth)];

const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const data = {
    labels:
      selectedOption === "thisweek"
        ? labelsDays
        : selectedOption === "thismonth"
        ? labelsMonth
        : selectedOption === "last30days"
        ? Label30days
        : selectedOption === "thisyear"
        ? LabelYear
        : selectedOption === "lastyear"
        ? LabelYear
        : labelsDays,
    datasets: [
      {
        label: "Sent Hypes",
        data: [
          7500, 4000, 8000, 8000, 6500, 7800, 5000, 5820, 8900, 7100, 6100,
          5000,
        ],
        backgroundColor: "#36BFFA",
      },
      {
        label: "Recieved Hypes",
        data: [
          7000, 7500, 7000, 7000, 5400, 4000, 4820, 7800, 5000, 7000, 6000,
          4000,
        ],
        backgroundColor: "#12B76A",
      },
    ],
  };

  return (
    <AnalyticsContainer>
      <TitleContainer>
        <SubTitle>Conversions</SubTitle>
        <SubTitle style={{ color: "rgba(57, 57, 57, 0.38)" }}>
          <SelectDate value={selectedOption} onChange={handleChange}>
            {/* <option value="">Select...</option> */}
            <option value="thisweek">This Week</option>
            <option value="thismonth">This Month</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisyear">This Year</option>
            <option value="lastyear">Last Year</option>
          </SelectDate>
        </SubTitle>
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
