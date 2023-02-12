import { Title } from "@/styles/reusable/elements.styled";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Intro = ({ intro }) => {
  const { pathname } = useLocation();
  return (
    <>
      <BreadCrumb>
        <NavLink to="/">Home</NavLink>
        <span>{">"}</span>
        <NavLink to="/" style={{ pointerEvents: "none" }}>
          Legal
        </NavLink>
        <span>{">"}</span>
        {pathname === "/terms" && <NavLink to="/terms">Terms</NavLink>}
        {pathname === "/privacy" && <NavLink to="/privacy">Privacy</NavLink>}
      </BreadCrumb>
      <IntroContainer>
        <Title as="h1" color="#fff">
          {intro}
        </Title>
      </IntroContainer>
    </>
  );
};

export default Intro;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 136px;
  background: #f69d00;
`;

const BreadCrumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 24px 48px;
  color: #b0b0b0;

  .active {
    color: #f69d00;
  }
  a {
    color: #b0b0b0;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;
