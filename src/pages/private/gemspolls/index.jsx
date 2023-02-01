import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import Banner from "@/pages/private/components/Banner";
import ProfileHero from "@/pages/private/gemspolls/molecules/ProfileHero";
import ChartsSection from "@/pages/private/gemspolls/molecules/ChartsSection";

const index = () => {
  return (
    <>
      <Banner height="356px"/>
      <PrivateContainer>
        <ProfileHero />
        <ChartsSection />
      </PrivateContainer>
    </>
  );
};

export default index;
