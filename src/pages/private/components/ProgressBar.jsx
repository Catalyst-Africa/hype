import React from "react";
import styled from "styled-components";

const ProgressBar = ({ bgcolor, completed }) => {
  return (
    <ProgressBarContainer>
      <FillerStyles
        style={{ backgroundColor: bgcolor, width: `${completed}%` }}
      ></FillerStyles>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  height: 4px;
  width: 100%;
  max-width: 286px;
  background: #d9d9d9;
  border-radius: 4px;
  border-radius: 4px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: 100%;
  }
`;

const FillerStyles = styled.div`
  height: 100%;
  border-radius: "inherit";
  text-align: "right";
`;
