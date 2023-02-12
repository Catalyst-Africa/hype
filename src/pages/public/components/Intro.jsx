import { Title } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";

const Intro = ({ intro }) => {
  return (
    <IntroContainer>
      <Title as="h1" color="#fff">
        {intro}
      </Title>
    </IntroContainer>
  );
};

export default Intro;

const IntroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 136px;
  background: #f69d00;
`;
