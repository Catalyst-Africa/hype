import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, FluidTitle, Loader } from "@/styles/reusable/elements.styled";
import { forgotPassword } from "@/setup/redux/slices/auth/extraReducers";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const initialData = {
    email: "",
  };
  const {
    formData,
    errors,
    handleBlur,
    handleChange,
    checkIsValid,
    validateOnSubmit,
  } = useFormValidation(initialData, validation);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateOnSubmit() && dispatch(forgotPassword(formData));
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
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
          <Button $fullWidth>
            {loading ? <Loader /> : "Send password reset link"}
          </Button>
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
