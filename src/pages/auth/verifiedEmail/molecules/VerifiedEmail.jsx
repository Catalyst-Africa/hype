import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";
import { OverlayLoader } from "@/components/ui";
import verifiedicon from "@/assets/verified.svg";
import { verifyEmail } from "@/setup/redux/slices/auth/extraReducers";
import { auth } from "@/setup/firebase/firebase";

const VerifiedEmail = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { oobCode } = Object.fromEntries([...searchParams]);
  const loading = useSelector((state) => state.auth.loading);
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);
  const navigate = useNavigate();

  useEffect(() => {
    if (oobCode) {
      if (loggedIn && !emailVerified) {
        dispatch(verifyEmail(oobCode));
        signOut(auth);
      } else navigate("/404");
    } else {
      toast.error("Invalid request, missing parameter");
      navigate("/verify-email");
    }
  }, []);

  return (
    <>
      {loading ? (
        <OverlayLoader />
      ) : (
        emailVerified && (
          <AuthContainer>
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

              <Button $fullWidth onClick={() => navigate("/login")}>
                Continue
              </Button>
            </VerifiedEmailContainer>
          </AuthContainer>
        )
      )}
    </>
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
