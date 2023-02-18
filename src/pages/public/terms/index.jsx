import React from "react";
import Terms from "@/pages/public/terms/molecules/Terms";
import PublicContainer from "@/pages/public/components/PublicContainer";
import Intro from "@/pages/public/components/Intro";

const index = () => {
  return (
    <>
      <Intro intro="Terms of Use" />
      <PublicContainer>
        <Terms />
      </PublicContainer>
    </>
  );
};

export default index;
