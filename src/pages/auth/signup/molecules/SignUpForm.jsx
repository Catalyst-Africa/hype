import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import AuthContainer from "@/pages/auth/components/AuthContainer";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { Button, Loader } from "@/styles/reusable/elements.styled";
import { useSignUpMutation } from "@/setup/redux/slices/api/nestedApis/authApi";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";

const SignUpForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [signUp, { isLoading }] = useSignUpMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateOnSubmit() &&
        (await signUp(formData).unwrap(),
        toast.success("Successfully created an account!"));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
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
            maxLength="50"
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
            maxLength="50"
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
          <Button $fullWidth>
            {isLoading ? <Loader /> : "Create account"}
          </Button>
          <div style={{ textAlign: "center" }}>
            <small>
              By continuing, you’re agreeing to our
              <strong> Terms of services</strong> and
              <strong> Privacy policy</strong>
              <br />
              <br />
            </small>
            <small>
              <strong>Already have an account? </strong>
              <Link to="/login">Sign In here</Link>
            </small>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default SignUpForm;
