import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle, Loader } from "@/styles/reusable/elements.styled";
import verifyicon from "@/assets/verify.svg";
import verifiedicon from "@/assets/verified.svg";
import {
  handleEmailVerificationLink,
  handleSignout,
} from "@/setup/slices/auth/authSlice";
import { auth } from "@/setup/firebase/firebase";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const emailVerified = useSelector((state) => state.user.emailVerified);

  return (
    <>
      <AuthContainer>
        {emailVerified ? (
          <VerifiedEmailContainer>
            <div style={{ textAlign: "center" }}>
              <img src={verifiedicon} alt="verified-icon" />
              <br />
              <br />
              <FluidTitle>Email Verification Successful!</FluidTitle>
              <br />
              <Message>
                We have successfully verified your email address
              </Message>
            </div>

            <Button $fullWidth onClick={() => dispatch(handleSignout(auth))}>
              Continue
            </Button>
          </VerifiedEmailContainer>
        ) : (
          <VerifyEmailContainer>
            <div style={{ textAlign: "center" }}>
              <img src={verifyicon} alt="verify-icon" />
              <br />
              <br />
              <FluidTitle>Verify Your Email Address</FluidTitle>
              <Message>
                We sent a verification link to your email address, please click
                on the link to verify your email and complete your registration
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
              onClick={() => dispatch(handleEmailVerificationLink())}
            >
              {loading ? <Loader /> : "Resend Verification Link"}
            </Button>
            <Button
              $type="outlined"
              type="button"
              onClick={() => dispatch(handleSignout(auth))}
            >
              Sign Out
            </Button>
          </VerifyEmailContainer>
        )}
      </AuthContainer>
    </>
  );
};

export default VerifyEmail;

const Message = styled.span`
  color: #4b4b4b;
`;

const VerifiedEmailContainer = styled.div`
  a {
    width: 100%;
    color: #fff;
  }
`;
const VerifyEmailContainer = styled.div``;
