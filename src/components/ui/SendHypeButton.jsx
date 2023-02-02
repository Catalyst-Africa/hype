import { Button } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SendHypeButton = () => {
  return (
    <Link to="/send-hype">
      <SendHypeButtonContainer>
        <Button>
          <RiSendPlaneFill />{" "}
          <span>Send Hype</span>
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
