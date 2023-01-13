import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { InputGroup } from "@/components/ui";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import googleIcon from "@/assets/icons/google.svg";

const SignUpForm = () => {
  return (
    <>
      <AuthContainer>
        <div style={{ textAlign: "center" }}>
          <FluidTitle>Let's get you started</FluidTitle>
        </div>
        <GoogleAuthButton $type="outlined">
          <img src={googleIcon} alt="" />
          Continue with Google
        </GoogleAuthButton>
        <Fieldset>
          <legend>or Sign up with email</legend>
        </Fieldset>
        <InputGroup
          type="email"
          id="email"
          label="Email address"
          placeholder="This is a text field"
        />
        <InputGroup
          type="password"
          id="password"
          label="Password"
          placeholder="Enter Password"
          endIcon={<AiOutlineEye />}
        />
        <Button $fullWidth>Create account</Button>
        <div style={{ textAlign: "center" }}>
          <small>
            By continuing, you’re agreeing to our
            <strong> Terms of services</strong> and
            <strong> Privacy policy</strong>
            <br />
            <br />
          </small>
          <small>
            <strong>Already have an account?</strong> Sign In here
          </small>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignUpForm;

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
