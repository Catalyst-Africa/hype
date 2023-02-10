import { FluidTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button } from "@/styles/reusable/elements.styled";

const HypeCategoriesList = [
  "ValentineHypes",
  "JobsHypes",
  "ChirstianLoveHypes",
  "AppreciationHypes",
  "LoveHypes",
];

const HypeCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(HypeCategoriesList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategoriesList = HypeCategoriesList?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <HypeCategoriesContainer>
        <FluidTitle>Categories</FluidTitle>
        <ButtonContainer>
          <Button>Add a Category</Button>
        </ButtonContainer>
        <br />
        {currentCategoriesList
          ? currentCategoriesList.sort().map((item, key) => {
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

        <br />
        <CategoriesNavigation>
          {currentPage > 1 && (
            <IoIosArrowBack
              onClick={() => handlePageChange(currentPage - 1)}
              size={30}
              color="#FFB328"
            />
          )}
          {currentPage} of {totalPages}
          {currentPage < totalPages && (
            <IoIosArrowForward
              onClick={() => handlePageChange(currentPage + 1)}
              size={30}
              color="#FFB328"
            />
          )}
        </CategoriesNavigation>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    padding: 10px 15px;
  }
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
      width: 25px;
    }
  }
`;

const CategoriesNavigation = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;

  svg {
    cursor: pointer;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    justify-content: flex-start;
  }
`;
