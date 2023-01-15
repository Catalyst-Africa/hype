import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ActionUrlHandler = () => {
  const [searchParams] = useSearchParams();
  const { mode, oobCode } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  switch (mode) {
    case "resetPassword":
      navigate(`/reset-password?oobCode=${oobCode}`);
      break;
    case "verifyEmail":
      navigate(`/email-verification?oobCode=${oobCode}`);
      break;
    default:
      break;
  }

  return null;
};

export default ActionUrlHandler;
