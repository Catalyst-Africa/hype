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
import {
  appreciationloveHypes,
  birthdayHypes,
  christianloveHypes,
  jobHypes,
  loveHypes,
  ValentineHypes,
} from "./samplehypes";
import { Loader } from "@/styles/reusable/elements.styled";
import hypesent from "../../../../assets/hypesent.svg";
import { Link } from "react-router-dom";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";

const SendHype = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user?.displayName?.split(" ")[0];

  const [displayName, setDisplayName] = useState(true);
  const [displayRecipientName, setDisplayRecipientName] = useState(true);

  const [toggleModal, setToggleModal] = useState(false);

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

  const [hypeMessage, sethypeMessage] = useState({
    valentineHypeMessage: ValentineHypes[0].message,
    jobHypesMessage: jobHypes[0].message,
    birthdayHypesMessage: birthdayHypes[0].message,
    loveHypesMessage: loveHypes[0].message,
    christianloveHypesMessage: christianloveHypes[0].message,
    appreciationloveHypesMessage: appreciationloveHypes[0].message,
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
      hype: hypeMessage,
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
                    <option value="valentine">🌷 Valentine wishes</option>
                    <option value="job"> 🎉 Congratulations on Job</option>
                    <option value="birthday"> 🎂 Birthday Messages</option>
                    <option value="love"> 💕 Love Hypes</option>
                    <option value="christian-love">
                      ❤️ Christian love messages
                    </option>
                    <option value="appreciation-love">
                      🙏 Appreciation love message
                    </option>
                  </SelectInputGroup>
                  {initialData.selecthype === "valentine" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          sethypeMessage({
                            valentineHypeMessage:
                              getRandomHypeMessage(ValentineHypes),
                          })
                        }
                      />
                    ))}
                  {initialData.selecthype === "job" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          sethypeMessage({
                            jobHypesMessage: getRandomHypeMessage(jobHypes),
                          })
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
                          sethypeMessage({
                            birthdayHypesMessage:
                              getRandomHypeMessage(birthdayHypes),
                          })
                        }
                      />
                    ))}
                  {initialData.selecthype === "love" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          sethypeMessage({
                            loveHypesMessage: getRandomHypeMessage(loveHypes),
                          })
                        }
                      />
                    ))}
                  {initialData.selecthype === "christian-love" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          sethypeMessage({
                            christianloveHypesMessage:
                              getRandomHypeMessage(christianloveHypes),
                          })
                        }
                      />
                    ))}
                  {initialData.selecthype === "appreciation-love" &&
                    (loader ? (
                      <Loader style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <BiRefresh
                        color="#F69D00"
                        cursor="pointer"
                        onClick={() =>
                          sethypeMessage({
                            appreciationloveHypesMessage: getRandomHypeMessage(
                              appreciationloveHypes,
                            ),
                          })
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
                      initialData.selecthype === "valentine"
                        ? hypeMessage.valentineHypeMessage +
                          (displayName ? "(" + firstname + ")" : "")
                        : initialData.selecthype === "job"
                        ? hypeMessage.jobHypesMessage +
                          (displayName ? "(" + firstname + ")" : "")
                        : initialData.selecthype === "birthday"
                        ? hypeMessage.birthdayHypesMessage +
                          (displayName ? "(" + firstname + ")" : "")
                        : initialData.selecthype === "love"
                        ? hypeMessage.loveHypesMessage +
                          (displayName ? "(" + firstname + ")" : "")
                        : initialData.selecthype === "christian-love"
                        ? hypeMessage.christianloveHypesMessage +
                          (displayName ? "(" + firstname + ")" : "")
                        : initialData.selecthype === "appreciation-love"
                        ? hypeMessage.appreciationloveHypesMessage +
                          (displayName ? "(" + firstname + ")" : "")
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
                  <CheckContainer onClick={() => setDisplayName(!displayName)}>
                    {displayName ? (
                      <BiCheckbox cursor="pointer" color="#F69D00" />
                    ) : (
                      <BiCheckboxSquare cursor="pointer" color="#F69D00" />
                    )}
                    <span>Send Anonymously</span>
                  </CheckContainer>
                  <CheckContainer
                    onClick={() =>
                      setDisplayRecipientName(!displayRecipientName)
                    }
                  >
                    {displayRecipientName ? (
                      <BiCheckboxSquare cursor="pointer" color="#F69D00" />
                    ) : (
                      <BiCheckbox cursor="pointer" color="#F69D00" />
                    )}
                    <span>Include recipient name</span>
                  </CheckContainer>
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
                    width="100%"
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
                    hypeMessage &&
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
                  hypeMessage &&
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
          <Link to="/dashboard">
            <AiFillCloseCircle
              color="#FFB328"
              cursor="pointer"
              onClick={handleToggleModal}
              size="50px"
            />
          </Link>
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
    margin-bottom: 100px;
  }
`;

const SendHypeInnerContainer = styled.div`
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

const FormShareGroupContainer = styled.div`
  display: flex;
  gap: 27px;

  ${({ theme }) => theme.breakpoints.down("xl")} {
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

  //use svg or a tag depending on if the react icon is nested inside the Link tag
  a {
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

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 10px 0px;
  span {
    cursor: pointer;
  }
`;
