import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/styles/reusable/elements.styled";
import { InputGroup, TextAreaInputGroup } from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/setup/firebase/firebase";
import { OverlayLoader } from "@/components/ui";
import { extractErrorMessage } from "@/helpers/helpers";
import {
  updateUserData,
  updateUserDP,
} from "@/setup/redux/slices/auth/extraReducers";
import { updateLoading } from "@/setup/redux/slices/auth/authSlice";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const firstname = user.displayName;
  const initialData = {
    name: firstname,
    email: user.email,
    username: user.username,
    phonenumber: user.phoneNumber || "",
    bio: user.bio,
  };
  const {
    formData,
    errors,
    handleBlur,
    handleChange,
    checkIsValid,
    validateOnSubmit,
  } = useFormValidation(initialData, validation);

  // Destructured form data
  const { bio, username, phonenumber } = formData;

  const [phoneNumber, setPhoneNumber] = useState(phonenumber);

  // Handle Submit for changes to user information
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserData({ user, bio, username, phonenumber: phoneNumber }));
    dispatch(updateLoading());
  };

  // Function to Pop-up browse computer
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      handleImageSubmit(e.target.files[0]);
    }
  };

  // Function to instruct the browser how to save image
  const handleImageSubmit = async (image) => {
    try {
      const imageRef = ref(storage, `profilePhoto${user.username}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      dispatch(updateUserDP(url));
      dispatch(updateLoading());
    } catch (err) {}
  };

  return (
    <AccountSettingsContainer>
      <SubTitle style={{ color: "#9D9D9D" }}>Your Profile Picture</SubTitle>
      <ProfilePhotoContainer>
        <ProfilePhoto src={user.photoURL} alt={user.displayName} />
        <label htmlFor="upload">
          Upload New
          <input
            id="upload"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
        </label>
        <Button style={{ backgroundColor: "#D0D0D0" }}>
          Remove Profile Photo
        </Button>
      </ProfilePhotoContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroupContainer>
          <InputContainer>
            <InputGroup
              type="name"
              id="name"
              label="Name"
              placeholder="Name"
              value={formData.name}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.name}
              helperTextType={checkIsValid("name")}
              disabled
            />
          </InputContainer>
          <InputContainer>
            <InputGroup
              type="email"
              id="email"
              label="Email address"
              placeholder="Email address"
              value={formData.email}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.email}
              helperTextType={checkIsValid("email")}
              disabled
            />
          </InputContainer>
        </FormGroupContainer>
        <FormGroupContainer>
          <InputContainer>
            <InputGroup
              type="username"
              id="username"
              label="Username"
              placeholder="@Username"
              value={formData.username}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              helperText={errors.username}
              helperTextType={checkIsValid("username")}
              maxLength="20"
            />
          </InputContainer>
          <InputContainer>
            <PhoneInputContainer>
              <>
                <Label>Phone number</Label>
                <PhoneInputGroup
                  style={
                    isValidPhoneNumber(phoneNumber || "")
                      ? { border: "" }
                      : { border: "1px solid #ff0000" }
                  }
                  onBlur={(e) => handleBlur(e)}
                >
                  <PhoneInput
                    international
                    countryCallingCodeEditable={true}
                    placeholder="Enter phone number"
                    name="whatsappnumber"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                </PhoneInputGroup>
                {phoneNumber && isValidPhoneNumber(phoneNumber || "") ? (
                  ""
                ) : (
                  <HelperText style={{ color: "#ff0000" }}>
                    please enter a valid number
                  </HelperText>
                )}
              </>
            </PhoneInputContainer>
          </InputContainer>
        </FormGroupContainer>
        <FormGroupContainer>
          <InputContainer>
            <TextAreaInputGroup
              type="bio"
              id="bio"
              label="Bio"
              placeholder="Bio"
              value={formData.bio}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              maxLength="200"
            />
          </InputContainer>
        </FormGroupContainer>
        <Button style={{ maxWidth: "200px" }}>Update Profile</Button>
      </Form>
      {loading && <OverlayLoader transparent />}
    </AccountSettingsContainer>
  );
};

export default AccountSettings;

const AccountSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-top: 3px solid #eeeeee;
  padding-top: 20px;

  .PhoneInputInput {
    background: transparent;
    border: none;
    color: black;
    height: 100%;
    outline: none;
    width: 100%;
    display: flex;
    font-size: 14px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  display: inline-block;
  margin-top: 3px;
`;

const PhoneInputGroup = styled.div`
  width: 100%;
  height: 35px;
  background: transparent;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  outline: none;
  padding: 0px 12px;
  gap: 12px;
  font-size: 12px;
  display: flex;
  align-items: center;

  :hover {
    border: 1px solid;
  }
`;

const PhoneInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
`;

const HelperText = styled.small`
  margin-top: 2px;
  display: inline-block;
  color: #000;
`;

const ProfilePhotoContainer = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #eeeeee;
  width: 100%;
  position: relative;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    img {
      width: 100px;
      height: 100px;
    }
  }

  label {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 6px;
    padding: 0px 8px;
    min-width: 100px;
    min-height: 38px;
    font-size: 14px;
    font-weight: 700;
    -webkit-transition: ease-in 0.3s;
    transition: ease-in 0.3s;
    cursor: pointer;
    background: #f69d00;
    color: #fff;

    &:hover {
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
        0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    }
  }

  input[type="file"] {
    display: none;
  }
`;

const ProfilePhoto = styled.img`
  border: 4px solid #f69d00;
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const FormGroupContainer = styled.div`
  display: flex;
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
`;
