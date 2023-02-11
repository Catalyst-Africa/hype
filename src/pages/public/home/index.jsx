import React from "react";
import HomeIntro from "@/pages/public/home/molecules/HomeIntro";
import PublicContainer from "@/pages/public/components/PublicContainer";

const index = () => {
  return (
    <>
      <PublicContainer style={{ backgroundColor: "#fff" }}>
        <HomeIntro />
      </PublicContainer>
    </>
  );
};

export default index;
