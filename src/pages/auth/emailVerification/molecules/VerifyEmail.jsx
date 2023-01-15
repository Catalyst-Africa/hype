import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle, Loader } from "@/styles/reusable/elements.styled";
import verifyicon from "@/assets/verify.svg";
import verifiedicon from "@/assets/verified.svg";
import {
  handleEmailVerificationLink,
  handleEmailVerification,
} from "@/setup/slices/auth/authSlice";
import { useEffect } from "react";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const emailVerified = useSelector((state) => state.user.emailVerified);
  const [searchParams] = useSearchParams();
  const { oobCode } = Object.fromEntries([...searchParams]);

  // useEffect(() => {
  //   if (oobCode) {
  //     dispatch(handleEmailVerification(oobCode));
  //   }
  // }, []);

  return (
    <>
      <AuthContainer>
        {emailVerified ? (
          loading ? (
            <Loader />
          ) : (
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
              <Button $fullWidth>Continue</Button>
            </VerifiedEmailContainer>
          )
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

const VerifiedEmailContainer = styled.div``;
const VerifyEmailContainer = styled.div``;
