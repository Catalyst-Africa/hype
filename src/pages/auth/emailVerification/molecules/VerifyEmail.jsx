import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import verifyicon from "@/assets/verify.svg";
import verifiedicon from "@/assets/verified.svg";

const VerifyEmail = () => {
  return (
    <>
      <AuthContainer>
        {true ? (
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
                <strong>Didn’t receive a link?</strong> Resend Link
              </small>
            </div>
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
