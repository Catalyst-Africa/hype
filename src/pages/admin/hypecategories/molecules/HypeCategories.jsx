import { FluidTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button } from "@/styles/reusable/elements.styled";
import Modal from "@/components/ui/Modal";
import { InputGroup } from "@/components/ui";
import { useFormValidation } from "@/hooks";
import { SubTitle } from "@/styles/reusable/elements.styled";
import { validation } from "@/pages/auth/validation";

import { OverlayLoader } from "@/components/ui";
import { useRef } from "react";
import {
  useAddHypeCategoryMutation,
  useGetAllHypeCategoriesQuery,
  useDeleteHypeCategoryMutation,
} from "@/setup/redux/slices/api/nestedApis/adminApi";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";

const HypeCategories = () => {
  const { data: hypeCategoriesList } = useGetAllHypeCategoriesQuery();
  const [addHypeCategory, { isLoading: addHypeLoading }] =
    useAddHypeCategoryMutation();
  const [deleteHypeCategory, { isLoading: deleteHypeLoading }] =
    useDeleteHypeCategoryMutation();

  const deleteCategoryRef = useRef();

  // Logic for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(hypeCategoriesList?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategoriesList = hypeCategoriesList?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const [isOpenDeleteCategory, setIsOpenDeleteEditCategory] = useState(false);

  // Handlers for opening and closing modals
  const handleAddOpenModal = () => {
    setIsOpenAddCategory(true);
  };
  const handleAddCloseModal = () => {
    setIsOpenAddCategory(false);
  };

  const handleEditOpenModal = (item) => {
    setInitialData({ ...initialData, category: item });
    setIsOpenEditCategory(true);
  };
  const handleEditCloseModal = () => {
    setIsOpenEditCategory(false);
  };

  const handleDeleteOpenModal = (item) => {
    deleteCategoryRef.current = item;
    setIsOpenDeleteEditCategory(true);
  };
  const handleDeleteCloseModal = () => {
    setIsOpenDeleteEditCategory(false);
  };

  // Handler for adding new categories
  const handleAddCategory = async () => {
    try {
      await addHypeCategory(formData.category).unwrap();
      setIsOpenAddCategory(false);
      toast.success("Hype category added successfully");
      formData.category = "";
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  };

  const handleEditCategory = () => {};

  const handleDeleteCategory = async () => {
    try {
      await deleteHypeCategory(deleteCategoryRef.current).unwrap();
      setIsOpenDeleteEditCategory(false);
      toast.success("Hype Category successfully deleted");
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  };

  const [initialData, setInitialData] = useState({
    category: "",
  });

  const {
    errors,
    handleBlur,
    handleChange,
    checkIsValid,
    formData,
    validateOnSubmit,
  } = useFormValidation(initialData.category, validation);
  return (
    <>
      <HypeCategoriesContainer>
        <FluidTitle>
          Categories{` [${hypeCategoriesList?.length || 0}]`}
        </FluidTitle>
        <ButtonContainer>
          <Button onClick={handleAddOpenModal}>Add a Category</Button>
        </ButtonContainer>
        <br />
        {currentCategoriesList
          ? currentCategoriesList.sort().map((item, key) => {
              return (
                <CategoryCard key={key}>
                  <p>{item}</p>
                  <CardInner>
                    {/* <FiEdit
                      color="#FFB328"
                      onClick={() => handleEditOpenModal(item)}
                    /> */}
                    <RiDeleteBin2Line
                      color="#ff0000"
                      onClick={(e) => handleDeleteOpenModal(item)}
                    />
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
          {hypeCategoriesList?.length > 0
            ? `${currentPage} of ${totalPages}`
            : ""}
          {/* {currentPage} of {totalPages} */}
          {currentPage < totalPages && (
            <IoIosArrowForward
              onClick={() => handlePageChange(currentPage + 1)}
              size={30}
              color="#FFB328"
            />
          )}
        </CategoriesNavigation>
      </HypeCategoriesContainer>

      {isOpenAddCategory && (
        <Modal handleClose={handleAddCloseModal}>
          <FluidTitle>Add Category</FluidTitle>
          <br />
          <InputGroup
            type="text"
            id="category"
            placeholder="Enter Category Name"
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            helperText={errors.category}
            value={formData.category}
            helperTextType={checkIsValid("category")}
          />
          <br />
          <ButtonUpdateContainer>
            <Button type="button" onClick={handleAddCategory}>
              Add
            </Button>
          </ButtonUpdateContainer>
        </Modal>
      )}

      {isOpenEditCategory && (
        <Modal handleClose={handleEditCloseModal}>
          <FluidTitle>Edit Category</FluidTitle>
          <br />
          <InputGroup
            type="text"
            id="category"
            placeholder="Edit Category"
            defaultValue={initialData.category}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            helperText={errors.category}
            value={formData.category}
            helperTextType={checkIsValid("category")}
          />
          <br />
          <ButtonUpdateContainer>
            <Button>Update</Button>
          </ButtonUpdateContainer>
        </Modal>
      )}

      {isOpenDeleteCategory && (
        <Modal handleClose={handleDeleteCloseModal}>
          <FluidTitle>Delete Category</FluidTitle>
          <br />
          {/* <SubTitle>ValentineHypes</SubTitle> */}
          <p>Are you sure you want to delete this category?</p>
          <br />
          <ButtonUpdateContainer>
            <Button
              onClick={handleDeleteCategory}
              style={{ backgroundColor: "#ff0000" }}
            >
              Delete
            </Button>
          </ButtonUpdateContainer>
        </Modal>
      )}
      {addHypeLoading || deleteHypeLoading ? <OverlayLoader transparent /> : ""}
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
  p {
    max-width: 700px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    p {
      max-width: 200px;
    }
  }
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

const ButtonUpdateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
