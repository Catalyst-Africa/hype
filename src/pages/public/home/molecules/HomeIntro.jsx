import { FluidTitle } from "@/styles/reusable/elements.styled";
import { Button } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeIntro = () => {
  const user = useSelector((state) => state.auth.user);
   const firstname = user.displayName?.split(" ")[0];
   
  return (
    <>
      <HypeMessageCardContainer>
        <HypeMessageCard>
          <FluidTitle>Today's Hype!</FluidTitle>
          <br />
          <p>
            <br />
            On this Valentine's Day, I just wanted to let you know how much you
            mean to me. You bring so much joy and happiness into my life, and I
            am so grateful to have you by my side. Your love and support mean
            the world to me, and I am so lucky to have such an amazing partner.
            <br />
            <br />I love you more and more each day, and I am so excited to
            spend this special day with you. Let's make this Valentine's Day one
            to remember and celebrate our love together. Yours always, Daniel.
          </p>
          <br />
          <br />
        </HypeMessageCard>
      </HypeMessageCardContainer>
      <HypeMesageFooter>
        {firstname ? (
          <TryHype>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </TryHype>
        ) : (
          <TryHype>
            <p>Join us to send hypes!</p>
            <Link to="/signup">
              <Button>Try hype</Button>
            </Link>
          </TryHype>
        )}
      </HypeMesageFooter>
    </>
  );
};

export default HomeIntro;

const HypeMessageCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 22px 51px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 37px 24px;
  }
`;
const HypeMessageCard = styled.div`
  margin-top: 50px;
  width: 50%;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 100%;
    padding: 0px 0px;
  }
`;

const HypeMesageFooter = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  width: 100%;
  background-color: #fff;
  margin: auto;
  padding: 20px 51px;
  background: #ffb328;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
  }
`;

const TryHype = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 36px;
  width: 100%;

  a {
    max-width: 500px;
    width: 30%;
  }
  button {
    max-width: 500px;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    a {
      max-width: 500px;
      width: 100%;
    }
    button {
      max-width: 500px;
      width: 100%;
    }
  }
`;
