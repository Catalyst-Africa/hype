import React from "react";
import styled from "styled-components";

const Banner = ({ height }) => {
  return <BannerContainer style={{ minHeight: height }}></BannerContainer>;
};

export default Banner;

const BannerContainer = styled.div`
  background: #f69d00;
  box-shadow: 0px 0px 32px 2px rgba(0, 0, 0, 0.12);
`;
