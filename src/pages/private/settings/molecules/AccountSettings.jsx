import { SubTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button } from "@/styles/reusable/elements.styled";
import { InputGroup, TextAreaInputGroup } from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { getDoc, doc } from "firebase/firestore";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);

  const firstname = user.displayName.split(" ")[0];
  const initialData = {
    name: firstname,
    email: user?.email,
    username: `@${firstname}`,
    phonenumber: user?.phoneNumber || "",
    bio: user?.bio,
  };
  const {
    formData,
    errors,
    handleBlur,
    handleChange,
    checkIsValid,
    validateOnSubmit,
  } = useFormValidation(initialData, validation);

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AccountSettingsContainer>
      <SubTitle style={{ color: "#9D9D9D" }}>Your Profile Picture</SubTitle>
      <ProfilePhotoContainer>
        <ProfilePhoto src={user.photoURL} alt={user.displayName} />
        <Button>Upload New</Button>
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
            />
          </InputContainer>
          <InputContainer>
            <InputGroup
              type="tel"
              id="number"
              label="Phone number"
              placeholder="Phone number"
              value={formData.phonenumber}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
          </InputContainer>
        </FormGroupContainer>
        <FormGroupContainer>
          <InputContainer>
            <TextAreaInputGroup
              type="bio"
              id="bio"
              label="Bio"
              placeholder="Bio"
              // defaultValue={user.bio ? user.bio : ""}
              value={formData.bio}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
            />
          </InputContainer>
        </FormGroupContainer>
        <Button style={{ maxWidth: "200px" }}>Update Profile</Button>
      </Form>
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
`;

const ProfilePhotoContainer = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #eeeeee;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    img {
      width: 30%;
      height: 30%;
    }
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
