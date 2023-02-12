import React from "react";
import Terms from "@/pages/public/terms/molecules/Terms";
import PublicContainer from "@/pages/public/components/PublicContainer";
import Intro from "@/pages/public/components/Intro";
import Footer from "@/pages/public/components/Footer";

const index = () => {
  return (
    <>
      <Intro intro="Terms of Use" />
      <PublicContainer>
        <Terms />
        <Footer />
      </PublicContainer>
    </>
  );
};

export default index;
