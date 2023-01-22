import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, Loader } from "@/styles/reusable/elements.styled";
import { signIn } from "@/setup/redux/slices/auth/extraReducers";

const LoginForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const initialData = {
    email: "",
    password: "",
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
    if (validateOnSubmit()) {
      dispatch(signIn(formData));
    }
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <AuthHeader title="Welcome Back!" />
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
          <Link to="/forgot-password">
            <small>
              <strong>Forgot password?</strong>
            </small>
          </Link>
          <Button $fullWidth>{loading ? <Loader /> : "Log In"}</Button>
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
