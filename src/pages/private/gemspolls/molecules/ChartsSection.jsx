import React from "react";

import MobileChartsSection from "@/pages/private/gemspolls/molecules/MobileChartsSection";
import WebChartsSection from "@/pages/private/gemspolls/molecules/WebChartsSection";

const ChartsSection = () => {
  return (
    <>
      <WebChartsSection />
      <MobileChartsSection />
    </>
  );
};

export default ChartsSection;

