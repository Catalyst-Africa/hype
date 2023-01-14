import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button } from "@/styles/reusable/elements.styled";

const SignUpForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const initialData = {
    email: "",
    password: "",
  };
  const { errors, handleBlur, handleChange, checkIsValid, validateOnSubmit } =
    useFormValidation(initialData, validation);

  return (
    <>
      <AuthContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateOnSubmit();
          }}
          autoComplete="off"
        >
          <AuthHeader title="Let's get you started" />
          <InputGroup
            type="email"
            id="email"
            label="Email address"
            placeholder="Email address"
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            helperText={errors.email}
            helperTextType={checkIsValid("email")}
          />
          <InputGroup
            type={passwordType ? "password" : "text"}
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
            onChange={(e) => handleChange(e)}
            helperText={errors.password}
            helperTextType={checkIsValid("password")}
          />
          <Button $fullWidth>Create account</Button>
          <div style={{ textAlign: "center" }}>
            <small>
              By continuing, you’re agreeing to our
              <strong> Terms of services</strong> and
              <strong> Privacy policy</strong>
              <br />
              <br />
            </small>
            <small>
              <strong>Already have an account?</strong>
              <Link to="/login"> Sign In here</Link>
            </small>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default SignUpForm;
