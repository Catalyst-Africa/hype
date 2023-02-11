import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import SentHypes from "@/pages/private/hypes/molecules/SentHypes";
import RecievedHypes from "@/pages/private/hypes/molecules/RecievedHypes";
import { useLocation } from "react-router-dom";

const index = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/sent-hypes" ? (
        <PrivateContainer>
          <SentHypes />
        </PrivateContainer>
      ) : (
        pathname === "/recieved-hypes" && (
          <PrivateContainer>
            <RecievedHypes />
          </PrivateContainer>
        )
      )}
    </>
  );
};

export default index;
