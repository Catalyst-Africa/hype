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
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";
import { updateLoading } from "@/setup/redux/slices/auth/authSlice";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);
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

  // Handle Submit for changes to user information
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      bio: bio || user?.bio,
      username:
        username[0] === "@" ? username : `@${username}` || user?.username,
      phonenumber: phonenumber || user?.phonenumber || "",
    });

    dispatch(updateLoading());
    setSubmitted(false);
    toast.success("Profile Successfully Updated");
  };

  // Function to Pop-up browse computer
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      handleImageSubmit(e.target.files[0]);
    }
  };

  // Function to instruct the browser how to save image
  const handleImageSubmit = async (image) => {
    console.log(image);
    try {
      const imageRef = ref(storage, `profilePhoto${user.username}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      console.log(url);

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        photoUrl: url,
      });
      dispatch(updateLoading());
    } catch (err) {
      console.log(err);
      // toast.error(extractErrorMessage(err.msg));
    }
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
            <InputGroup
              type="number"
              id="phonenumber"
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
              value={formData.bio}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              maxLength="200"
            />
          </InputContainer>
        </FormGroupContainer>
        <Button style={{ maxWidth: "200px" }}>Update Profile</Button>
      </Form>
      {submitted && <OverlayLoader transparent />}
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
