import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleEmailVerification } from "@/setup/slices/auth/authSlice";

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
        dispatch(handleEmailVerification(oobCode));
        break;
      default:
        break;
    }
  }, []);

  return null;
};

export default ActionUrlHandler;
