import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, FluidTitle, Loader } from "@/styles/reusable/elements.styled";
import { resetPassword } from "@/setup/redux/slices/auth/extraReducers";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { oobCode } = Object.fromEntries([...searchParams]);
  const loading = useSelector((state) => state.auth.loading);
  const [passwordType, setPasswordType] = useState(true);
  const initialData = {
    password: "",
    confirm_password: "",
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
    validateOnSubmit() &&
      dispatch(resetPassword({ oobCode, password: formData.password }));
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
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
            id="confirm_password"
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
            helperText={errors.confirm_password}
            helperTextType={checkIsValid("confirm_password")}
          />
          <Button $fullWidth>{loading ? <Loader /> : "Reset Password"}</Button>
          <center>
            <strong>
              <Link to="/login">Click here to Login</Link>
            </strong>
          </center>
        </form>
      </AuthContainer>
    </>
  );
};

export default ResetPasswordForm;
