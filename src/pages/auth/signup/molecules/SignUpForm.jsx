import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, Loader } from "@/styles/reusable/elements.styled";
import { signUp } from "@/setup/redux/slices/auth/extraReducers";

const SignUpForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const initialData = {
    name: "",
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
    validateOnSubmit() && dispatch(signUp(formData));
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <AuthHeader title="Let's get you started" />
          <InputGroup
            type="text"
            id="name"
            label="Name"
            placeholder="Enter your name"
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            helperText={errors.name}
            helperTextType={checkIsValid("name")}
          />
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
          <Button $fullWidth>{loading ? <Loader /> : "Create account"}</Button>
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
