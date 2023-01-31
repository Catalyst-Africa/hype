import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import Banner from "@/pages/private/components/Banner";
import ProfileCard from "@/pages/private/profile/molecules/ProfileCard";


const index = () => {
  return (
    <>
      <Banner height="203px" />
      <PrivateContainer>
        <ProfileCard />
      </PrivateContainer>
    </>
  );
};

export default index;
