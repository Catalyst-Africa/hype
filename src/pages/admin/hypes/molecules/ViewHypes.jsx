import { FluidTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Button } from "@/styles/reusable/elements.styled";

const hypesList = [
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "ValentineHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "LoveHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },

  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
  {
    category: "JobsHypes",
    hype: "On this Valentine's Day, I just wanted to let you know how much you mean to me...",
  },
];

const ViewHypes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredHypes =
    selectedCategory === "All"
      ? hypesList
      : hypesList.filter((item) => item.category === selectedCategory);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredHypes.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHypes = filteredHypes?.slice(startIndex, endIndex);

  const uniqueHypesCategories = [
    ...new Set(hypesList.map((item) => item.category)),
  ];

  return (
    <>
      <ViewHypesContainer>
        <FluidTitle>Hypes</FluidTitle>
        <SelectHypeCategoryContainer>
          <SelectHypeCategory
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All">All</option>
            {uniqueHypesCategories
              ? uniqueHypesCategories.map((hype, index) => {
                  return (
                    <option key={index} value={hype}>
                      {hype}
                    </option>
                  );
                })
              : ""}
          </SelectHypeCategory>
        </SelectHypeCategoryContainer>
        <ViewHypesInnerContainer>
          {currentHypes
            ? currentHypes.map((hype, index) => {
                return (
                  <HypeCard key={index}>
                    <p>{hype.hype}</p>
                    <InfoContainer>
                      <p>{hype.category}</p>
                      <FiEdit />
                    </InfoContainer>
                  </HypeCard>
                );
              })
            : ""}
        </ViewHypesInnerContainer>
        <HypesNavigation>
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
        </HypesNavigation>
      </ViewHypesContainer>
    </>
  );
};

export default ViewHypes;

const ViewHypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 18px;
  padding-bottom: 150px;
`;

const ViewHypesInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;

  ${({ theme }) => theme.breakpoints.down("touch")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const HypeCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  background: #fff;
  border-radius: 4px;
  color: #000;
  gap: 20px;
  box-shadow: 0px 10px 13px rgba(17, 38, 146, 0.05);
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  color: #009891;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

const HypesNavigation = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;

  svg {
    cursor: pointer;
  }
`;

const SelectHypeCategory = styled.select`
  padding: 10px 5px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SelectHypeCategoryContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HypeNav = styled.div`
  display: flex;
  gap: 30px;

  svg {
    cursor: pointer;
    color: #ffb328;
  }
`;
