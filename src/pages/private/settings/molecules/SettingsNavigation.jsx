import { FluidTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SettingsNavigation = () => {
  const { pathname } = useLocation();
  return (
    <>
      <FluidTitle>Settings</FluidTitle>
      <SettingsNavigationContainer>
        <Link to="/settings">
          <NavigationItem
            style={{
              border: pathname === "/settings" ? "2px solid #f8bb52" : "",
              color: pathname === "/settings" ? "#F8BB52" : " #c9c9c9",
            }}
          >
            Account Settings
          </NavigationItem>
        </Link>
        <Link to="/settings/interface-theme">
          <NavigationItem
            style={{
              border:
                pathname === "/settings/interface-theme"
                  ? "2px solid #f8bb52"
                  : "",
              color:
                pathname === "/settings/interface-theme"
                  ? "#F8BB52"
                  : " #c9c9c9",
            }}
          >
            Interface Theme
          </NavigationItem>
        </Link>
        <Link to="/settings/password">
          <NavigationItem
            style={{
              border:
                pathname === "/settings/password" ? "2px solid #f8bb52" : "",
              color: pathname === "/settings/password" ? "#F8BB52" : " #c9c9c9",
            }}
          >
            Change Password
          </NavigationItem>
        </Link>
      </SettingsNavigationContainer>
    </>
  );
};

export default SettingsNavigation;

const SettingsNavigationContainer = styled.div`
  display: flex;
  gap: 85px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    gap: 8px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

const NavigationItem = styled.div`
  border-radius: 12px;
  padding: 10px 24px;
  border: 2px solid transparent;
  cursor: pointer;
  :hover {
    border: 2px solid #f8bb52;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 10px 8px;
  }
`;
