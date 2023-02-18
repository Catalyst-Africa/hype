import { Button } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const AddHypeButton = () => {
  const { pathname } = useLocation();
  return pathname === "/admin/add-hype" ? (
    ""
  ) : (
    <Link to="/admin/add-hype">
      <AddHypeButtonContainer>
        <Button>
          <RiSendPlaneFill /> <span>Add Hype</span>
        </Button>
      </AddHypeButtonContainer>
    </Link>
  );
};

export default AddHypeButton;

const AddHypeButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 84px;
  right: 49px;
  z-index: 100;
  button {
    min-height: 63px;
    min-width: 172px;
    background-color: #009891;
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
