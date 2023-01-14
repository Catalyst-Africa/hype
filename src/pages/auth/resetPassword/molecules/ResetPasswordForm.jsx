import { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, FluidTitle } from "@/styles/reusable/elements.styled";

const ResetPasswordForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const initialData = {
    password: "",
    confirm_password: "",
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
            Reset Password
          </FluidTitle>

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

          <InputGroup
            type={passwordType ? "password" : "text"}
            id="password"
            label="Confirm Password"
            placeholder="Confirm Password"
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
            helperTextType={checkIsValid("confirm_password")}
          />
          <Button $fullWidth>Reset Password</Button>
        </form>
      </AuthContainer>
    </>
  );
};

export default ResetPasswordForm;
