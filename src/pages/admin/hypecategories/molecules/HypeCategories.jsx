import { FluidTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const HypeCategoriesList = [
  "ValentineHypes",
  "JobsHypes",
  "ChirstianLoveHypes",
  "AppreciationHypes",
  "LoveHypes",
];

const HypeCategories = () => {
  return (
    <>
      <HypeCategoriesContainer>
        <FluidTitle>Categories</FluidTitle>
        <br />
        {HypeCategoriesList
          ? HypeCategoriesList.sort().map((item, key) => {
              return (
                <CategoryCard key={key}>
                  <p>{item}</p>
                  <CardInner>
                    <FiEdit color="#FFB328" />
                    <RiDeleteBin2Line color="#ff0000" />
                  </CardInner>
                </CategoryCard>
              );
            })
          : []}
      </HypeCategoriesContainer>
    </>
  );
};

export default HypeCategories;

const HypeCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
  padding-bottom: 150px;
`;

const CategoryCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 10px;
`;

const CardInner = styled.div`
  display: flex;
  gap: 30px;

  svg {
    cursor: pointer;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    gap: 12px;
    svg {
      width: 15px;
    }
  }
`;
