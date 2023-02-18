import React, { useState } from "react";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { TextAreaInputGroup, SelectInputGroup } from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { Button } from "@/styles/reusable/elements.styled";
import sendhypebg from "@/assets/sendhypebg.png";
import { Loader } from "@/styles/reusable/elements.styled";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";
import { useUpdateHypeMutation } from "@/setup/redux/slices/api/nestedApis/adminApi";

const EditHype = () => {
  const location = useLocation();
  const [updateHype, { isLoading }] = useUpdateHypeMutation();

  //Loading for when adding hypes
  // const [loadingAdd, setLoadingAdd] = useState(false);

  //Hypes Initial Data
  const [initialData, setInitialData] = useState({
    category: location.state?.hypeData?.category,
    id: location.state?.hypeData?.id,
    message: location.state?.hypeData?.message,
  });

  const { errors, handleBlur, handleChange, checkIsValid, formData } =
    useFormValidation(initialData, validation);

  //Handle Add Hype Submit
  const handleEditHypeSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHype({ alteredValue: formData, staticValue: initialData });
      toast.success("Hype successfully updated");
    } catch (err) {
      console.log(err);
      toast.error(extractErrorMessage(err.message));
    }
  };

  return (
    <>
      <EditHypeContainer>
        <FluidTitle>Edit Hype</FluidTitle>
        <EditHypeInnerContainer>
          <HypeForm>
            <Form onSubmit={handleEditHypeSubmit}>
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
                    id="category"
                    onBlur={(e) => handleBlur(e)}
                    onChange={(e) => handleChange(e)}
                    helperText={errors.category}
                    helperTextType={checkIsValid("category")}
                    value={formData.category}
                    defaultValue="select"
                  >
                    <option value={formData.category}>
                      {formData.category}
                    </option>
                  </SelectInputGroup>
                </InputContainer>
              </FormGroupContainer>
              <FormGroupContainer>
                <InputContainer>
                  <TextAreaInputGroup
                    name="hype"
                    id="message"
                    placeholder="Hype message"
                    value={formData.message}
                    onBlur={(e) => handleBlur(e)}
                    onChange={(e) => handleChange(e)}
                    helperText={errors.hype}
                    helperTextType={checkIsValid("message")}
                    rows={15}
                    readOnly
                  />
                </InputContainer>
              </FormGroupContainer>

              <Button
                style={{
                  color: "#fff",
                  backgroundColor:
                    initialData.category && initialData.message
                      ? ""
                      : "#5E5E5E",
                }}
                disabled={
                  initialData.category && initialData.message ? false : true
                }
              >
                <span style={{ display: "flex", gap: "10px" }}>
                  {isLoading ? (
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
