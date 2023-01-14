import { Link } from "react-router-dom";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";

const ForgotPasswordForm = () => {
  const initialData = {
    email: "",
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
          <FluidTitle style={{ textAlign: "center" }}>
            Forgot Password?
          </FluidTitle>
          <Message>
            Input the email address to your account and we will send you a
            password reset link.
          </Message>
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
          <Button $fullWidth>Send password reset link</Button>
          <div style={{ textAlign: "center" }}>
            <small>
              <strong>Remember password?</strong>
              <Link to="/login"> Sign in here</Link>
            </small>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default ForgotPasswordForm;

const Message = styled.span`
  color: #4b4b4b;
`;
