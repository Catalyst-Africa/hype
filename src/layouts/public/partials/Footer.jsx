import React from "react";
import { Logo } from "@/components/ui";
import { SubTitle } from "@/styles/reusable/elements.styled";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <FooterMainContainer>
        <br />
        <br />
        <Divider />
        <br />
        <br />
        <FooterContainer>
          <FooterSection>
            <Logo />
          </FooterSection>
          <FooterSection>
            <SubTitle>Legal</SubTitle>
            <br />
            <ul>
              <NavLink to="/terms">
                <li>Terms</li>
              </NavLink>
              <NavLink to="/privacy">Privacy</NavLink>
              <li>FAQ</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <SubTitle>Contact Us</SubTitle>
            <br />
            <ul>
              <a href="https://www.instagram.com/sharehype4fun/">
                <li>Instagram</li>
              </a>
              <a href="https://twitter.com/sharehype4fun/">
                <li>Twitter</li>
              </a>
              <a href="mailto:support@sharehype.fun">
                <li>Support@sharehype.fun</li>
              </a>
            </ul>
          </FooterSection>
        </FooterContainer>
        <br />
        <br />
        <Divider />
        <br />
        <span>2023 Catalyst Africa. All rights reserved</span>
        <br />
      </FooterMainContainer>
    </>
  );
};

export default Footer;

const FooterMainContainer = styled.div`
  padding: 18px 48px;
  width: 100%;
  .active {
    color: #f69d00;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;

const Divider = styled.div`
  border: 1px solid #eee;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: auto;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
