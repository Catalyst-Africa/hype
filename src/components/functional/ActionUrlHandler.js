import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleEmailVerification } from "@/setup/slices/auth/authSlice";
// handleEmailVerification

const ActionUrlHandler = () => {
  const [searchParams] = useSearchParams();
  const { mode, oobCode } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (mode) {
      case "resetPassword":
        navigate(`/reset-password?oobCode=${oobCode}`);
        break;
      case "verifyEmail":
        // navigate(`/email-verification?oobCode=${oobCode}`);
        dispatch(handleEmailVerification(oobCode));
        break;
      default:
        break;
    }
  }, []);

  return null;
};

export default ActionUrlHandler;
