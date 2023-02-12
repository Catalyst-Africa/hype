import React, { useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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
import { Loader } from "@/styles/reusable/elements.styled";
import hypesent from "../../../../assets/hypesent.svg";
import { Link } from "react-router-dom";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { db } from "@/setup/firebase/firebase";
import { useEffect } from "react";

const SendHype = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user?.displayName?.split(" ")[0];

  //Displayname toggle Send annonymous hype
  const [displayName, setDisplayName] = useState(true);

  //DisplayReciepentName toggle Include recipient name
  const [displayRecipientName, setDisplayRecipientName] = useState(true);

  //The Hypes Selected Categories
  const [selectedHypesCategories, setSelectedHypesCategories] = useState({});

  //Current Hype Index
  const [currentIndex, setCurrentIndex] = useState(0);

  //Success Hype Modal
  const [toggleModal, setToggleModal] = useState(false);

  //Loading for random hypes
  const [loading, setLoading] = useState(false);

  //Loading for when sending hypes
  const [loadingSend, setLoadingSend] = useState(false);

  const [hypes, setHypes] = useState([]);

  //Get data from the backend
  useEffect(() => {
    const getAllHype = async () => {
      const x = [];
      try {
        const querySnapshot = await getDocs(collection(db, "hype"));
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          x.push({ id, ...doc.data() });
        });
        setHypes(x);
      } catch (err) {
        err;
      }
    };
    getAllHype();
  }, []);

  useEffect(() => {}, []);

  //Hypes Initial Data
  const [initialData, setInitialData] = useState({
    name: "",
    selecthype: "select",
    hype: "",
    hypeId: "",
    selectsocial: "",
    whatsappnumber: "",
    smsnumber: "",
  });

  const { errors, handleBlur, checkIsValid } = useFormValidation(
    initialData,
    validation,
  );
  //Close Hype Sent Successful Modal
  const handleToggleModal = () => {
    setToggleModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Handle Hypes Changes
  const handleInitialDataChange = (event) => {
    let inputValue = event.target.value;
    setCurrentIndex(0);

    hypes?.forEach((hype) => {
      if (event.target.name === "selecthype") {
        if (event.target.value === "select") {
          setInitialData({
            ...initialData,
            hype: "",
            selecthype: "select",
          });
          setSelectedHypesCategories({});
        } else if (
          event.target.value === Object.values(hype)[0]
          // ||
          // event.target.value === Object.keys(hype)[1][0].category
        ) {
          setSelectedHypesCategories(Object.values(hype)[1]);
          setInitialData({
            ...initialData,
            hype:
              Object.values(hype)[1][1]?.message === undefined
                ? //Returns message for array that are equal to 1
                  Object.values(hype)[1][0].message
                : //Returns message for array that are more than 1
                  Object.values(hype)[1][1]?.message,
            hypeId: hype.id,
            selecthype: Object.keys(hype)[1],
          });
        }
      } else {
        if (/^[a-zA-Z0-9]+$/.test(inputValue) || inputValue === "") {
          setInitialData({
            ...initialData,
            [event.target.name]: inputValue,
          });
        }
      }
    });
  };

  const handleHypesPrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setInitialData({
      ...initialData,
      hype: selectedHypesCategories[currentIndex - 1].message,
    });
  };

  //Handle Hypes Next Pagination
  const handleHypesNext = () => {
    setCurrentIndex(currentIndex + 1);
    setInitialData({
      ...initialData,
      hype: selectedHypesCategories[currentIndex + 1].message,
    });
  };

  //Get Random Hypes
  const handleRandomHypes = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const randomIndex = Math.floor(
      Math.random() * selectedHypesCategories.length,
    );
    setCurrentIndex(randomIndex);
    setInitialData({
      ...initialData,
      hype: selectedHypesCategories[randomIndex].message,
    });

    setLoading(false);
  };

  //Handle Send Hype Submit
  const handleSendHypeSubmit = async (e) => {
    e.preventDefault();
    setLoadingSend(true);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "sentHypes"), {
      userId: user.uid,
      ...initialData,
      timeStamp: serverTimestamp(),
      sender: displayName ? firstname : "",
    });

    console.log(`https://hype-dev.netlify.app/hype/message/${docRef.id}`);

    // set the submitted data here. example console.log("the submited data", initialData);
    setInitialData({
      name: "",
      selecthype: "",
      hype: "",
      selectsocial: "",
      whatsappnumber: "",
      smsnumber: "",
    });
    setToggleModal(true);
    setSelectedHypesCategories({});
    setLoadingSend(false);
  };

  return (
    <>
      <SendHypeContainer style={{ opacity: toggleModal ? "0.1" : "" }}>
        <FluidTitle>Send a hype!</FluidTitle>
        <SendHypeInnerContainer>
          <HypeForm>
            <Form onSubmit={handleSendHypeSubmit}>
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
                    maxLength="50"
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
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.selecthype}
                    helperTextType={checkIsValid("selecthype")}
                    defaultValue="select"
                  >
                    <option value="select"> Select your hype</option>
                    {hypes?.map((hype) => (
                      <option
                        key={Object.values(hype)[0]}
                        value={Object.values(hype)[0]}
                      >
                        {Object.values(hype)[0]
                          .split(/(?=[A-Z])/)
                          .join(" ")}
                      </option>
                    ))}
                  </SelectInputGroup>

                  {loading ? (
                    <Loader style={{ width: "20px", height: "20px" }} />
                  ) : initialData.selecthype !== "select" ? (
                    <BiRefresh
                      color="#F69D00"
                      cursor="pointer"
                      onClick={handleRandomHypes}
                    />
                  ) : (
                    ""
                  )}
                </InputContainer>
              </FormGroupContainer>
              <FormGroupContainer>
                <InputContainer>
                  <TextAreaInputGroup
                    name="hype"
                    id="hype"
                    placeholder="Hype message"
                    value={`${
                      displayRecipientName && initialData.name
                        ? `${initialData.name}\n\n`
                        : ""
                    }${
                      selectedHypesCategories[currentIndex]?.message
                        ? selectedHypesCategories[currentIndex]?.message
                        : ""
                    }${
                      selectedHypesCategories[currentIndex]?.message &&
                      displayName
                        ? "\n\n" + firstname
                        : ""
                    }`}
                    onBlur={(e) => handleBlur(e)}
                    onChange={handleInitialDataChange}
                    helperText={errors.hype}
                    helperTextType={checkIsValid("hype")}
                    rows={15}
                    readOnly
                  />
                  <InnerContainer>
                    <CheckContainerMain>
                      <CheckContainer
                        onClick={() => setDisplayName(!displayName)}
                      >
                        {displayName ? (
                          <BiCheckbox cursor="pointer" color="#F69D00" />
                        ) : (
                          <BiCheckboxSquare cursor="pointer" color="#F69D00" />
                        )}
                        <span>Send anonymously</span>
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
                    </CheckContainerMain>
                    {selectedHypesCategories[currentIndex]?.message ? (
                      <HypesNavigation>
                        <AiFillBackward
                          color={currentIndex === 0 ? "#e1e1e1" : "#F69D00"}
                          cursor="pointer"
                          size={30}
                          pointerEvents={
                            currentIndex === 0 ? "none" : undefined
                          }
                          onClick={handleHypesPrevious}
                        />
                        <AiFillForward
                          color={
                            currentIndex === selectedHypesCategories.length - 1
                              ? "#e1e1e1"
                              : "#F69D00"
                          }
                          cursor="pointer"
                          size={30}
                          pointerEvents={
                            currentIndex === selectedHypesCategories.length - 1
                              ? "none"
                              : undefined
                          }
                          onClick={handleHypesNext}
                        />
                      </HypesNavigation>
                    ) : (
                      ""
                    )}
                  </InnerContainer>
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

                  {initialData.selectsocial === "sms" && (
                    <InputGroup
                      name="smsnumber"
                      type="number"
                      id="smsnumber"
                      label="Phone number"
                      placeholder="Recipients phone number"
                      value={initialData.smsnumber}
                      onBlur={(e) => handleBlur(e)}
                      onChange={handleInitialDataChange}
                      helperText={errors.smsnumber}
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
                    initialData.selecthype !== "select" &&
                    initialData.hype.length > 1 &&
                    (initialData.selectsocial === "whatsapp"
                      ? initialData.whatsappnumber.length > 10
                      : initialData.selectsocial === "sms" &&
                        initialData.smsnumber.length > 10)
                      ? ""
                      : "#5E5E5E",
                }}
                disabled={
                  initialData.name &&
                  initialData.selecthype &&
                  initialData.selecthype !== "select" &&
                  initialData.hype.length > 1 &&
                  (initialData.selectsocial === "whatsapp"
                    ? initialData.whatsappnumber.length > 10
                    : initialData.selectsocial === "sms" &&
                      initialData.smsnumber.length > 10)
                    ? false
                    : true
                }
              >
                <span style={{ display: "flex", gap: "10px" }}>
                  {loadingSend ? (
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
  z-index: 1000;
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

const CheckContainerMain = styled.div``;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 10px 0px;
  width: fit-content;
  span {
    cursor: pointer;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const HypesNavigation = styled.div`
  display: flex;
  gap: 30px;
  margin: 12px 0px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    justify-content: center;
  }
`;
