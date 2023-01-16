import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import verifiedicon from "@/assets/verified.svg";
import {
  handleEmailVerification,
  handleSignout,
} from "@/setup/slices/auth/authSlice";
import { OverlayLoader } from "@/components/ui";
import { useEffect } from "react";

const VerifiedEmail = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { oobCode } = Object.fromEntries([...searchParams]);
  const loading = useSelector((state) => state.auth.loading);
  const emailVerified = useSelector((state) => state.user.emailVerified);
  const navigate = useNavigate();

  useEffect(() => {
    if (oobCode) {
      dispatch(handleEmailVerification(oobCode));
    } else {
      navigate("/404");
    }
  }, []);

  return (
    <AuthContainer>
      {!loading ? (
        emailVerified && (
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

            <Button $fullWidth onClick={dispatch(handleSignout())}>
              Continue
            </Button>
          </VerifiedEmailContainer>
        )
      ) : (
        <OverlayLoader />
      )}
    </AuthContainer>
  );
};

export default VerifiedEmail;

const Message = styled.span`
  color: #4b4b4b;
`;

const VerifiedEmailContainer = styled.div`
  a {
    width: 100%;
    color: #fff;
  }
`;
