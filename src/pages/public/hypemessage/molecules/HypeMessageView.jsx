import { Button } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const HypeMessageView = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];

  const navigate = useNavigate();

  const { id } = useParams();
  const idNumber = Number(id);

  useEffect(() => {
    if (idNumber === 12345) {
      return;
    } else {
      navigate("*");
    }
  }, [idNumber]);

  console.log(123);
  return (
    <>
      <HypeMessageCardContainer>
        <HypeMessageCard>
          <SubTitle>You have received a hype from Daniel</SubTitle>
          <br />

          <SubTitle>To Unwana with love.</SubTitle>
          <br />
          <p>
            My dearest love, <br />
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

export default HypeMessageView;

const HypeMessageCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 100px 0px;
`;
const HypeMessageCard = styled.div`
  width: 50%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }
`;

const HypeMesageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 50px;
`;

const TryHype = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 36px;
  width: 100%;
  margin-top: 45px;

  a {
    max-width: 500px;
    width: 30%;
  }
  button {
    max-width: 500px;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
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
