import { useSearchParams } from "react-router-dom";
import React from "react";

import { ResetPassword, VerifiedEmail } from "@/pages/auth";
import { AuthLayout } from "@/layouts";

const ActionUrlHandler = () => {
  const [searchParams] = useSearchParams();
  const { mode } = Object.fromEntries([...searchParams]);

  return (
    <>
      <AuthLayout renderChildren>
        {mode === "verifyEmail" && <VerifiedEmail />}
        {mode === "resetPassword" && <ResetPassword />}
      </AuthLayout>
    </>
  );
};

export default ActionUrlHandler;
