import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { TextAreaInputGroup, SelectInputGroup } from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { useSelector } from "react-redux";
import { Button } from "@/styles/reusable/elements.styled";
import sendhypebg from "@/assets/sendhypebg.svg";
import { Loader } from "@/styles/reusable/elements.styled";
import { useParams } from "react-router-dom";

const EditHype = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user?.displayName?.split(" ")[0];

  //Loading for when adding hypes
  const [loadingAdd, setLoadingAdd] = useState(false);

  //Hypes Initial Data
  const [initialData, setInitialData] = useState({
    hypeCategory: "",
    hype: "",
    hypeId: "",
  });

  const { errors, handleBlur, checkIsValid } = useFormValidation(
    initialData,
    validation,
  );

  //Handle Hypes Changes
  const handleInitialDataChange = (event) => {
    let inputValue = event.target.value;
    if (/^\s/.test(inputValue)) {
      return;
    }
    setInitialData({
      ...initialData,
      [event.target.name]: inputValue,
    });
  };

  console.log(initialData);
  //Handle Add Hype Submit
  const handleAddHypeSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);
    // set the submitted data here. example console.log("the submited data", initialData);
    setLoadingAdd(false);
  };

  const { id } = useParams();

  return (
    <>
      <EditHypeContainer>
        <FluidTitle>Edit Hype</FluidTitle>
        <EditHypeInnerContainer>
          <HypeForm>
            <Form onSubmit={handleAddHypeSubmit}>
              <FormGroupContainer>
                <InputContainer
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                  }}
                >
                  <SelectInputGroup
                    name="hypeCategory"
                    id="hypeCategory"
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.hypeCategory}
                    helperTextType={checkIsValid("hypeCategory")}
                    value={initialData.hypeCategory}
                    defaultValue="select"
                  >
                    <option value="select"> Select hype category</option>
                    <option value="valentineHypes">🌷 Valentine wishes</option>
                    <option value="jobHypes">🎉 Congratulations on Job</option>
                    <option value="birthdayHypes">🎂 Birthday Messages</option>
                    <option value="loveHypes">💕 Love Hypes</option>
                    <option value="christianLoveHypes">
                      ❤️ Christian love messages
                    </option>
                    <option value="appreciationLoveHypes">
                      🙏 Appreciation love message
                    </option>
                  </SelectInputGroup>
                </InputContainer>
              </FormGroupContainer>
              <FormGroupContainer>
                <InputContainer>
                  <TextAreaInputGroup
                    name="hype"
                    id="hype"
                    placeholder="Hype message"
                    value={initialData.hype}
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.hype}
                    helperTextType={checkIsValid("hype")}
                    rows={15}
                    readOnly
                  />
                </InputContainer>
              </FormGroupContainer>

              <Button
                style={{
                  color: "#fff",
                  backgroundColor:
                    initialData.hypeCategory && initialData.hype
                      ? ""
                      : "#5E5E5E",
                }}
                disabled={
                  initialData.hypeCategory && initialData.hype ? false : true
                }
              >
                <span style={{ display: "flex", gap: "10px" }}>
                  {loadingAdd ? (
                    <Loader style={{ width: "20px", height: "20px" }} />
                  ) : (
                    ""
                  )}
                  <span>
                    <span>Update</span>
                    <span style={{ fontWeight: "100" }}> hype!</span>
                  </span>
                </span>
              </Button>
            </Form>
          </HypeForm>
          <HypeImage>
            <img
              src={sendhypebg}
              alt="sendhypebg"
              width="100%"
              height="656px"
            />
          </HypeImage>
        </EditHypeInnerContainer>
      </EditHypeContainer>
    </>
  );
};

export default EditHype;

const EditHypeContainer = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  padding: 38px 44px;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 38px 20px;
    margin-bottom: 100px;
  }
`;

const EditHypeInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 54px;
  margin-top: 34px;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
  }
`;

const HypeForm = styled.div`
  width: 100%;
`;

const HypeImage = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  width: 100%;

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
