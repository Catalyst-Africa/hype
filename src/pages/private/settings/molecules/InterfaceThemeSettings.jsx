import React, { useState } from "react";
import styled from "styled-components";
import { SubTitle } from "@/styles/reusable/elements.styled";
import theme1 from "../../../../assets/theme1.svg";
import theme2 from "../../../../assets/theme2.svg";
import { Button } from "@/styles/reusable/elements.styled";

const InterfaceThemeSettings = () => {
  const [checkBoxToggle, setCheckBoxToggle] = useState(false);
  const [activeTheme1, setActiveTheme1] = useState(true);
  const [activeTheme2, setActiveTheme2] = useState(false);

  const activeTheme1Toggle = () => {
    setActiveTheme1(true);
    setActiveTheme2(false);
  };

  const activeTheme2Toggle = () => {
    setActiveTheme2(true);
    setActiveTheme1(false);
  };
  return (
    <InterfaceThemeSettingsContainer>
      <SubTitle style={{ color: "#5B5A5B" }}>
        Change your dashboard appearance.
      </SubTitle>

      <SubTitle style={{ color: "#5B5A5B" }}>
        {/* <Legend onClick={() => setCheckBoxToggle(!checkBoxToggle)}>
          {checkBoxToggle ? (
            <BiCheckboxSquare size={34} color="#FFB328" />
          ) : (
            <BiCheckbox size={34} color="#FFB328" />
          )}
          <em>
            Automatically switch between light and dark themes when your system
            does.
          </em>
        </Legend> */}
      </SubTitle>
      <ThemesContainer>
        <Theme1
          onClick={activeTheme1Toggle}
          style={{
            boxShadow: activeTheme1 ? "0px 0px 8px rgba(0, 0, 0, 0.12)" : "",
          }}
        >
          <img src={theme1} alt="light theme" />
        </Theme1>
        <Theme2
          onClick={activeTheme2Toggle}
          style={{
            boxShadow: activeTheme2 ? "0px 0px 8px rgba(0, 0, 0, 0.12)" : "",
          }}
        >
          <img src={theme2} alt="dark theme" />
          <ComingSoonBanner>
            <p>Coming Soon</p>
          </ComingSoonBanner>
        </Theme2>
      </ThemesContainer>
      <br />
      <Button style={{ maxWidth: "200px", cursor: "auto" }} disabled>
        Change Theme
      </Button>
    </InterfaceThemeSettingsContainer>
  );
};

export default InterfaceThemeSettings;

const InterfaceThemeSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-top: 3px solid #eeeeee;
  padding-top: 20px;
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const ThemesContainer = styled.div`
  display: flex;
  margin-top: 46px;
  gap: 83px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-direction: column;
    gap: 53px;
  }
`;

const Theme1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 28px;
  background: #fcfcfc;
  border-radius: 17px;
  border: 2px solid #f69d00;
  /* min-height: 225.56px; */
  /* cursor: pointer; */
  width: 100%;
  :hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  }
  img {
    width: 100%;
  }
`;

const Theme2 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 20px 28px;
  background: #252728;
  border-radius: 17px;
  /* min-height: 225.56px; */
  /* cursor: pointer; */
  width: 100%;
  :hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  }
  img {
    width: 100%;
  }
`;

const ComingSoonBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f69d00;
  padding: 18px 18px;
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
