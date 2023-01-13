import styled from "styled-components";
import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import verifyicon from "@/assets/verify.svg";
import verifiedicon from "@/assets/verified.svg";
import { OtpInput } from "@/components/ui";
import { useEffect, useState } from "react";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const onChange = (value) => setOtp(value);
  const [addClassName, setAddClassName] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (otp === "1010") {
      setIsVerified(true);
    } else if (otp.length === 4 && otp !== "1010") {
      setAddClassName(true);
    }
  }, [otp]);

  return (
    <>
      <AuthContainer>
        {isVerified ? (
          <div>
            <div style={{ textAlign: "center" }}>
              <img src={verifiedicon} alt="verified-icon" />
              <br />
              <br />
              <FluidTitle>Email Verification Successful!</FluidTitle>
              <Legend>We have successfully verified your email address</Legend>
            </div>
            <Button $fullWidth>Continue</Button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: "center" }}>
              <img src={verifyicon} alt="verify-icon" />
              <br />
              <br />
              <FluidTitle>Verify Your Email Address</FluidTitle>
              <Legend>
                We sent a verification code to uwanadaniel@gmail.com Enter the
                4-digit code to verify your email address
              </Legend>
            </div>
            <OtpContainer>
              <OtpInput
                value={otp}
                valueLength={4}
                onChange={onChange}
                className={addClassName ? "optInvalid" : ""}
              />
            </OtpContainer>
            <Button $fullWidth>Verify email address</Button>
            <div style={{ textAlign: "center" }}>
              <small>
                <strong>Didn’t receive a code?</strong> Resend
              </small>
            </div>
          </div>
        )}
      </AuthContainer>
    </>
  );
};

export default OtpForm;

const Legend = styled.legend`
  padding: 16px 16px;
  color: #4b4b4b;
`;

const OtpContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;

  .optInvalid {
    border: 1px solid #ff0000;
  }
`;
