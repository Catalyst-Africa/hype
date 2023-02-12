import React from "react";
import { Logo } from "@/components/ui";
import { SubTitle } from "@/styles/reusable/elements.styled";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <br />
      <br />
      <Divider />

      <FooterContainer>
        <FooterSection>
          <Logo />
        </FooterSection>
        <FooterSection>
          <SubTitle>Legal</SubTitle>
          <br />
          <ul>
            <Link to="/terms">
              <li>Terms</li>
            </Link>
            <li>Privacy</li>
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
          </ul>
        </FooterSection>
      </FooterContainer>

      <Divider />
      <span>2023 Catalyst Africa. All rights reserved</span>
    </>
  );
};

export default Footer;

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
