import PropTypes from "prop-types";
import styled from "styled-components";

import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import googleIcon from "@/assets/icons/google.svg";

const AuthHeader = ({ title }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <FluidTitle>{title}</FluidTitle>
      </div>
      <GoogleAuthButton type="button" $type="outlined">
        <img src={googleIcon} alt="" />
        Continue with Google
      </GoogleAuthButton>
      <Fieldset>
        <legend>or Sign in with email</legend>
      </Fieldset>
    </>
  );
};

AuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AuthHeader;

const GoogleAuthButton = styled(Button)`
  border: 1px solid lightgrey;
  color: rgb(36, 24, 24);
  font-weight: 400;

  &:hover,
  &:active,
  &:focus {
    background: none;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
      0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  }
`;

const Fieldset = styled.fieldset`
  border-bottom: none;
  border-right: none;
  border-left: none;
  border-top: 1px solid lightgrey;
  text-align: center;

  legend {
    padding: 0 16px;
  }
`;
