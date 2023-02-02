import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <>
      <PrivateContainer>
        <Outlet />
        <br />
      </PrivateContainer>
    </>
  );
};

export default index;
