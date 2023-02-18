import { FluidTitle, SubTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from "@/components/ui/Modal";
import { Button } from "@/styles/reusable/elements.styled";
import { useDispatch } from "react-redux";
import { deleteHype } from "@/setup/redux/slices/app/extraReducers";
import { useRef } from "react";
import { useGetAllHypeQuery } from "@/setup/redux/slices/api/nestedApis/adminApi";

const ViewHypes = () => {
  const dispatch = useDispatch();
  const { data: hypesList } = useGetAllHypeQuery();
  const deleteMessage = useRef("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpenDeleteHype, setIsOpenDeleteHype] = useState(false);

  const filteredHypes =
    selectedCategory === "All"
      ? hypesList
      : hypesList.filter((item) => item.category === selectedCategory);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredHypes?.length / itemsPerPage);

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
    ...new Set(hypesList?.map((item) => item.category)),
  ];

  const handleDeleteOpenModal = (hype) => {
    setIsOpenDeleteHype(true);
    deleteMessage.current = hype;
  };
  const handleDeleteCloseModal = () => {
    setIsOpenDeleteHype(false);
  };
  const handleDeleteHype = () => {
    dispatch(deleteHype(deleteMessage.current));
    handleDeleteCloseModal();
  };

  return (
    <>
      <ViewHypesContainer>
        <FluidTitle>{`Hypes [${hypesList?.length}]`}</FluidTitle>
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
            ? currentHypes.map((hypeData, index) => {
                return (
                  <HypeCard key={index}>
                    <p>{hypeData.message}</p>
                    <InfoContainer>
                      <p>{hypeData.category}</p>
                      <EditContainer>
                        <Link
                          to={`/admin/edit-hype/${hypeData.category}/${hypeData.id}`}
                          state={{ hypeData }}
                        >
                          <FiEdit />
                        </Link>

                        <RiDeleteBin2Line
                          color="#ff0000"
                          onClick={() => {
                            handleDeleteOpenModal(hypeData);
                          }}
                        />
                      </EditContainer>
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

      {isOpenDeleteHype && (
        <Modal handleClose={handleDeleteCloseModal}>
          <FluidTitle>Delete Hype</FluidTitle>
          <br />
          <p>
            {deleteMessage.current.message}
            {/* On this Valentine's Day, I just wanted to let you know how much you
            mean to me On this Valentine's Day, I just wanted to let you know
            how much you mean to me On this Valentine's Day, I just wanted to
            let you know how much you mean to me */}
          </p>
          <br />
          <p>Are you sure you want to delete this hype?</p>
          <br />
          <ButtonDeleteContainer>
            <Button
              onClick={() => {
                handleDeleteHype();
              }}
              style={{ backgroundColor: "#ff0000" }}
            >
              Delete
            </Button>
          </ButtonDeleteContainer>
        </Modal>
      )}
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

  p {
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

  ${({ theme }) => theme.breakpoints.down("md")} {
    justify-content: flex-start;
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

const EditContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ButtonDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
