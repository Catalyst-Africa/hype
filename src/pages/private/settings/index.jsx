import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import PrivateInnerContainer from "@/pages/private/components/PrivateInnerContainer";
import { Outlet } from "react-router-dom";
import SettingsNavigation from "@/pages/private/settings/molecules/SettingsNavigation";

const index = () => {
  return (
    <>
      <PrivateContainer>
        <PrivateInnerContainer>
          <SettingsNavigation />
          <Outlet />
        </PrivateInnerContainer>
        <br />
      </PrivateContainer>
    </>
  );
};

export default index;
