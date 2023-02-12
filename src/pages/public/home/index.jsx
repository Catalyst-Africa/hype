import React from "react";
import HeroSection from "@/pages/public/home/molecules/HeroSection";
import HomeIntro from "@/pages/public/home/molecules/HomeIntro";
import PublicContainer from "@/pages/public/components/PublicContainer";

const index = () => {
  return (
    <>
      <HeroSection />
      <PublicContainer>
        <HomeIntro />
      </PublicContainer>
    </>
  );
};

export default index;
