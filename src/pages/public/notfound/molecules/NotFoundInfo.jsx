import { Title } from "@/styles/reusable/elements.styled";
import React from "react";
import { CiKeyboard } from "react-icons/ci";

const NotFoundInfo = () => {
  return (
    <>
      <Title as="h2">NOT FOUND</Title>
      <CiKeyboard size={200} color="#F69D00" />
    </>
  );
};

export default NotFoundInfo;
