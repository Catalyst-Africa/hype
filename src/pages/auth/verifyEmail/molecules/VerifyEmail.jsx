import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle, Loader } from "@/styles/reusable/elements.styled";
import verifyicon from "@/assets/verify.svg";

import {
  sendEmailVerificationLink,
  logOut,
} from "@/setup/redux/slices/auth/extraReducers";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      <AuthContainer>
        <VerifyEmailContainer>
          <div style={{ textAlign: "center" }}>
            <img src={verifyicon} alt="verify-icon" />
            <br />
            <br />
            <FluidTitle>Verify Your Email Address</FluidTitle>
            <Message>
              We sent a verification link to your email address, please click on
              the link to verify your email and complete your registration
            </Message>
          </div>

          <div style={{ textAlign: "center" }}>
            <small>
              <strong>Didn’t receive a link?</strong>
            </small>
          </div>
          <Button
            $fullWidth
            type="button"
            onClick={() => dispatch(sendEmailVerificationLink())}
          >
            {loading ? <Loader /> : "Resend Verification Link"}
          </Button>
          <Button
            $type="outlined"
            type="button"
            onClick={() => dispatch(logOut())}
          >
            Sign Out
          </Button>
        </VerifyEmailContainer>
      </AuthContainer>
    </>
  );
};

export default VerifyEmail;

const Message = styled.span`
  color: #4b4b4b;
`;

const VerifyEmailContainer = styled.div``;
