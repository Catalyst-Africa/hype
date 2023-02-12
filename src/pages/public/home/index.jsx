import React from "react";
import HeroSection from "@/pages/public/home/molecules/HeroSection";
import HomeIntro from "@/pages/public/home/molecules/HomeIntro";
import PublicContainer from "@/pages/public/components/PublicContainer";
import Footer from "@/pages/public/components/Footer";

const index = () => {
  return (
    <>
      <HeroSection />
      <PublicContainer>
        <HomeIntro />
        <Footer />
      </PublicContainer>
    </>
  );
};

export default index;
