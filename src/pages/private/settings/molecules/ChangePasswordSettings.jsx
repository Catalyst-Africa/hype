import React, { useState } from "react";
import { SubTitle } from "@/styles/reusable/elements.styled";
import styled from "styled-components";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { InputGroup } from "@/components/ui";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/styles/reusable/elements.styled";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "@/setup/redux/slices/auth/extraReducers";
import { OverlayLoader } from "@/components/ui";

const ChangePasswordSettings = () => {
  const [passwordType, setPasswordType] = useState(true);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const initialData = {
    oldpassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateOnSubmit() && dispatch(await updateUserPassword(formData));
  };
  return (
    <ChangePasswordSettingsContainer>
      <SubTitle style={{ color: "#5B5A5B" }}>Change your password.</SubTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroupContainer>
          <InputContainer>
            <InputGroup
              type={passwordType ? "password" : "text"}
              id="oldpassword"
              label="Old Password"
              placeholder="Enter Password"
              defaultValue="********"
              endIcon={
                passwordType ? (
                  <AiOutlineEye onClick={() => setPasswordType(false)} />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setPasswordType(true)}
                  />
                )
              }
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.oldpassword}
              helperTextType={checkIsValid("oldpassword")}
            />
          </InputContainer>
          <InputContainer>
            <InputGroup
              type={passwordType ? "password" : "text"}
              id="password"
              label="New Password"
              placeholder="Enter Password"
              endIcon={
                passwordType ? (
                  <AiOutlineEye onClick={() => setPasswordType(false)} />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setPasswordType(true)}
                  />
                )
              }
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.password}
              helperTextType={checkIsValid("password")}
            />
          </InputContainer>
          <InputContainer>
            <InputGroup
              type={passwordType ? "password" : "text"}
              id="confirm_password"
              label="Confirm New Password"
              placeholder="Enter Password"
              endIcon={
                passwordType ? (
                  <AiOutlineEye onClick={() => setPasswordType(false)} />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setPasswordType(true)}
                  />
                )
              }
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.confirm_password}
              helperTextType={checkIsValid("confirm_password")}
            />
          </InputContainer>
        </FormGroupContainer>
        <Button type="submit" style={{ maxWidth: "200px" }}>
          Change Password
        </Button>
      </Form>
      {loading && <OverlayLoader transparent />}
    </ChangePasswordSettingsContainer>
  );
};

export default ChangePasswordSettings;

const ChangePasswordSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-top: 3px solid #eeeeee;
  padding-top: 20px;
`;

const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }
`;
