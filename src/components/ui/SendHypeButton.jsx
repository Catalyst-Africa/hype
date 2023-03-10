import { Button } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";


const SendHypeButton = () => {
  const { pathname } = useLocation();
  return pathname === "/send-hype" ? (
    ""
  ) : (
    <Link to="/send-hype">
      <SendHypeButtonContainer>
        <Button>
          <RiSendPlaneFill /> <span>Send Hype</span>
        </Button>
      </SendHypeButtonContainer>
    </Link>
  );
};

export default SendHypeButton;

const SendHypeButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 84px;
  right: 49px;
  z-index: 100;
  button {
    min-height: 63px;
    min-width: 172px;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    button {
      min-height: 52px;
      min-width: 72px;
    }

    span {
      display: none;
    }
  }
`;
