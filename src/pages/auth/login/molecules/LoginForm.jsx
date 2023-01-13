import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button } from "@/styles/reusable/elements.styled";

const LoginForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const initialData = {
    email: "",
    password: "",
  };
  const { errors, handleBlur, checkIsValid, validateOnSubmit } =
    useFormValidation(initialData, validation);

  return (
    <>
      <AuthContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateOnSubmit();
          }}
        >
          <AuthHeader title="Welcome Back!" />
          <InputGroup
            type="email"
            id="email"
            label="Email address"
            placeholder="Email address"
            onBlur={(e) => handleBlur(e)}
            helperText={errors.email}
            helperTextType={checkIsValid("email")}
          />
          <InputGroup
            type="password"
            id="password"
            label="Password"
            placeholder="Enter Password"
            endIcon={
              passwordType ? (
                <AiOutlineEye onClick={() => setPasswordType(false)} />
              ) : (
                <AiOutlineEyeInvisible onClick={() => setPasswordType(true)} />
              )
            }
            onBlur={(e) => handleBlur(e)}
            helperText={errors.password}
            helperTextType={checkIsValid("password")}
          />
          <strong>Forgot password?</strong>
          <Button $fullWidth>Log In</Button>
          <div style={{ textAlign: "center" }}>
            <small>
              <strong>New to Hype?</strong>
              <Link to="/signup"> Sign Up here</Link>
            </small>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default LoginForm;
