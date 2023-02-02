import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import {
  InputGroup,
  TextAreaInputGroup,
  SelectInputGroup,
} from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { validation } from "@/pages/auth/validation";
import { useSelector } from "react-redux";
import { Button } from "@/styles/reusable/elements.styled";
import sendhypebg from "@/assets/sendhypebg.svg";
import { BiRefresh } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { birthdayHypes, celebrateHypes, loveHypes } from "./samplehypes";
import { Loader } from "@/styles/reusable/elements.styled";
import hypesent from "../../../../assets/hypesent.svg";

const SendHype = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user?.displayName?.split(" ")[0];

  const [toggleModal, setToggleModal] = useState(false);

  const [hypeLoveMessage, setHypeLoveMessage] = useState(loveHypes[0].message);
  const [hypeBirthdayMessage, setHypeBirthdayMessage] = useState(
    birthdayHypes[0].message,
  );
  const [hypeCelebrateMessage, setHypeCelebrateMessage] = useState(
    celebrateHypes[0].message,
  );

  const [loader, setLoader] = useState(false);
  const [loaderSend, setLoaderSend] = useState(false);

  const [initialData, setInitialData] = useState({
    name: "",
    selecthype: "",
    hype: "",
    selectsocial: "",
    whatsappnumber: "",
    twitterusername: "",
    smsnumber: "",
  });

  const { errors, handleBlur, checkIsValid } = useFormValidation(
    initialData,
    validation,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaderSend(true);
    setInitialData({
      ...initialData,
      hype: hypeLoveMessage || birthdayHypes || hypeCelebrateMessage,
    });

    setTimeout(() => {
      setToggleModal(true);
    }, 1000);
  };

  const handleInitialDataChange = (e) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.value });
  };

  const handleToggleModal = () => {
    setToggleModal(false);
    setInitialData({
      name: "",
      selecthype: "",
      hype: "",
      selectsocial: "",
      whatsappnumber: "",
      twitterusername: "",
      smsnumber: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!loader) {
      return;
    }

    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loader]);

  useEffect(() => {
    if (!loaderSend) {
      return;
    }
    const timer = setTimeout(() => {
      setLoaderSend(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loaderSend]);

  const getRandomHypeMessage = (arr) => {
    setLoader(true);
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex].message;
  };

  console.log(initialData);
  return (
    <>
      <SendHypeContainer style={{ opacity: toggleModal ? "0.1" : "" }}>
        <FluidTitle>Send a hype!</FluidTitle>
        <SendHypeInnerContainer>
          <HypeForm>
            <Form onSubmit={handleSubmit}>
              <FormGroupContainer>
                <InputContainer>
                  <InputGroup
                    name="name"
                    id="name"
                    label="Spread Positivity"
                    placeholder="Enter recipients name"
                    value={initialData.name}
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.name}
                    helperTextType={checkIsValid("name")}
                  />
                </InputContainer>
                <InputContainer
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                  }}
                >
                  <SelectInputGroup
                    name="selecthype"
                    id="selecthype"
                    value={initialData.selecthype}
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.selecthype}
                    helperTextType={checkIsValid("selecthype")}
                  >
                    <option value="" disabled hidden>
                      Select your hype
                    </option>
                    <option value="love">❤️ For that special someone</option>
                    <option value="birthday">
                      🎂 On a special day for the special one
                    </option>
                    <option value="celebrate"> 🎉 Celebrate a friend</option>
                  </SelectInputGroup>
                  {initialData.selecthype === "love" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          setHypeLoveMessage(getRandomHypeMessage(loveHypes))
                        }
                      />
                    ))}
                  {initialData.selecthype === "birthday" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          setHypeBirthdayMessage(
                            getRandomHypeMessage(birthdayHypes),
                          )
                        }
                      />
                    ))}
                  {initialData.selecthype === "celebrate" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          setHypeCelebrateMessage(
                            getRandomHypeMessage(celebrateHypes),
                          )
                        }
                      />
                    ))}
                </InputContainer>
              </FormGroupContainer>
              <FormGroupContainer>
                <InputContainer>
                  <TextAreaInputGroup
                    name="hype"
                    id="hype"
                    placeholder="Hype message"
                    value={
                      initialData.selecthype === "love"
                        ? hypeLoveMessage || loveHypes[0].message
                        : initialData.selecthype === "birthday"
                        ? hypeBirthdayMessage || birthdayHypes[0].message
                        : initialData.selecthype === "celebrate"
                        ? hypeCelebrateMessage || celebrateHypes[0].message
                        : initialData.hype
                    }
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.hype}
                    helperTextType={checkIsValid("hype")}
                    rows={15}
                    style={{
                      pointerEvents: initialData.selecthype ? "" : "none",
                    }}
                  />
                </InputContainer>
              </FormGroupContainer>
              <FormShareGroupContainer>
                <InputContainer>
                  <SelectInputGroup
                    name="selectsocial"
                    id="selectsocial"
                    label="Select Social"
                    value={initialData.selectsocial}
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.selectsocial}
                    helperTextType={checkIsValid("selectsocial")}
                  >
                    <option value="" disabled hidden>
                      Choose
                    </option>
                    <option value="whatsapp">Whatsapp</option>
                    <option value="twitter">Twitter</option>
                    <option value="sms">SMS</option>
                  </SelectInputGroup>
                </InputContainer>
                <InputContainer>
                  {initialData.selectsocial === "whatsapp" && (
                    <InputGroup
                      name="whatsappnumber"
                      type="number"
                      id="whatsappnumber"
                      label="Whatsapp number"
                      placeholder="Recipients whatsapp number"
                      value={initialData.whatsappnumber}
                      onBlur={(e) => handleBlur(e)}
                      onChange={handleInitialDataChange}
                      helperText={errors.whatsappnumber}
                      helperTextType={checkIsValid("whatsappnumber")}
                    />
                  )}

                  {initialData.selectsocial === "twitter" && (
                    <InputGroup
                      name="twitterusername"
                      type="text"
                      id="twitterusername"
                      label="Twitter username"
                      placeholder="Recipients twitter username"
                      value={initialData.twitterusername}
                      onBlur={(e) => handleBlur(e)}
                      onChange={handleInitialDataChange}
                      helperText={errors.twitterusername}
                      helperTextType={checkIsValid("twitterusername")}
                    />
                  )}

                  {initialData.selectsocial === "sms" && (
                    <InputGroup
                      name="smsnumber"
                      type="number"
                      id="smsnumber"
                      label="Phone Number"
                      placeholder="Recipients phone number"
                      value={initialData.smsnumber}
                      onBlur={(e) => handleBlur(e)}
                      onChange={handleInitialDataChange}
                      helperText={errors.whatsappnumber}
                      helperTextType={checkIsValid("smsnumber")}
                    />
                  )}
                </InputContainer>
              </FormShareGroupContainer>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor:
                    initialData.name &&
                    initialData.selecthype &&
                    (hypeLoveMessage ||
                      hypeBirthdayMessage ||
                      hypeLoveMessage) &&
                    initialData.selectsocial &&
                    (initialData.whatsappnumber ||
                      initialData.twitterusername ||
                      initialData.smsnumber)
                      ? ""
                      : "#5E5E5E",
                }}
                disabled={
                  initialData.name &&
                  initialData.selecthype &&
                  (hypeLoveMessage || hypeBirthdayMessage || hypeLoveMessage) &&
                  initialData.selectsocial &&
                  (initialData.whatsappnumber ||
                    initialData.twitterusername ||
                    initialData.smsnumber)
                    ? false
                    : true
                }
              >
                <span style={{ display: "flex", gap: "10px" }}>
                  {loaderSend ? (
                    <Loader style={{ width: "20px", height: "20px" }} />
                  ) : (
                    ""
                  )}
                  <span>
                    <span>Share</span>
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
        </SendHypeInnerContainer>
      </SendHypeContainer>
      {toggleModal ? (
        <SentHypeModalContainer>
          <AiFillCloseCircle
            color="#FFB328"
            cursor="pointer"
            onClick={handleToggleModal}
            size="50px"
          />
          <Modal>
            <img src={hypesent} alt="hypesent" width="80%" />
            <br />
            <br />
            <FluidTitle>hype sent</FluidTitle>
          </Modal>
        </SentHypeModalContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default SendHype;

const SendHypeContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  padding: 48px 44px;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 18px 20px;
  }
`;

const SendHypeInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 54px;
  margin-top: 34px;
  background: rgba(255, 255, 255, 0.2);

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

const FormShareGroupContainer = styled.div`
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

const SentHypeModalContainer = styled.div`
  display: flex;
  justify-content: center;
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: auto;

  height: 100%;
  background: #f3f3f3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);

  svg {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
