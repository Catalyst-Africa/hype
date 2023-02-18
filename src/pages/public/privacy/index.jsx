import React from "react";
import Privacy from "@/pages/public/privacy/molecules/Privacy";
import PublicContainer from "@/pages/public/components/PublicContainer";
import Intro from "@/pages/public/components/Intro";

const index = () => {
  return (
    <>
      <Intro intro="Privacy Policy" />
      <PublicContainer>
        <Privacy />
      </PublicContainer>
    </>
  );
};

export default index;
