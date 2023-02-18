import React from "react";
import PrivateContainer from "@/pages/private/components/PrivateContainer";
import TopStats from "@/pages/private/dashboard/molecules/TopStats";
import History from "@/pages/private/dashboard/molecules/History";
import Analytics from "@/pages/private/dashboard/molecules/Analytics";

const index = () => {
  return (
    <>
      <PrivateContainer>
        <TopStats />
        <History />
        <br />
        <br />
        {/* <Analytics /> */}
      </PrivateContainer>
    </>
  );
};

export default index;
