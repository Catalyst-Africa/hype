import { FluidTitle, SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Modal from "@/components/ui/Modal";
import { Button } from "@/styles/reusable/elements.styled";
import { BsWhatsapp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { receiveSentHypeByUser } from "@/setup/redux/slices/app/extraReducers";

const RecievedHypes = () => {
  const dispatch = useDispatch();
  const hypesList = useSelector((state) => state.app.usersReceivedHype);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(receiveSentHypeByUser(user));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpenDeleteHype, setIsOpenDeleteHype] = useState(false);

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

  const handleDeleteOpenModal = () => {
    setIsOpenDeleteHype(true);
  };
  const handleDeleteCloseModal = () => {
    setIsOpenDeleteHype(false);
  };

  const colors = [
    "#FFDFDF",
    "#F2D6F9",
    "#D2D1E0",
    "#FCE6BE",
    "#D2D1E0",
    "#FCCFCF",
  ];

  return (
    <>
      <RecievedHypesContainer>
        <FluidTitle>{`Recieved Hypes [${hypesList.length}]`}</FluidTitle>
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
          {currentHypes.length > 0 ? (
            currentHypes.map((hype, index) => {
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <HypeCard key={index} style={{ backgroundColor: randomColor }}>
                  <p>{hype.hype}</p>
                  <br />
                  <InfoCard1 style={{ color: "#868686" }}>
                    <span>
                      Received from:{" "}
                      <b>
                        {hype?.sender?.length > 0 ? hype?.sender : "anonymous"}
                      </b>
                    </span>
                    <span>
                      {new Date(hype?.timeStamp?.seconds * 1000)
                        .toLocaleDateString()
                        .split("/")
                        .join(".")}
                    </span>
                    <span>{hype.category}</span>
                  </InfoCard1>
                  <br />
                  <InfoCard2>
                    <InfoSocial>
                      <BsWhatsapp color="#4BBB16" />
                      <p style={{ color: "#868686" }}>Whatsapp</p>
                    </InfoSocial>
                    <ViewHypeContainer>
                      <Link to="#">
                        <em>View Hype</em>
                      </Link>
                    </ViewHypeContainer>
                  </InfoCard2>
                </HypeCard>
              );
            })
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                width: "100%",
                gridColumn: "1 / span 4",
              }}
            >
              No data to display
            </div>
          )}
        </ViewHypesInnerContainer>
        <HypesNavigation>
          {currentPage > 1 && (
            <IoIosArrowBack
              onClick={() => handlePageChange(currentPage - 1)}
              size={30}
              color="#FFB328"
            />
          )}
          {hypesList.length > 0 ? `${currentPage} of ${totalPages}` : ""}
          {currentPage < totalPages && (
            <IoIosArrowForward
              onClick={() => handlePageChange(currentPage + 1)}
              size={30}
              color="#FFB328"
            />
          )}
        </HypesNavigation>
      </RecievedHypesContainer>

      {isOpenDeleteHype && (
        <Modal handleClose={handleDeleteCloseModal}>
          <FluidTitle>Delete Hype</FluidTitle>
          <br />
          <p>
            On this Valentine's Day, I just wanted to let you know how much you
            mean to me On this Valentine's Day, I just wanted to let you know
            how much you mean to me On this Valentine's Day, I just wanted to
            let you know how much you mean to me
          </p>
          <br />
          <p>Are you sure you want to delete this hype?</p>
          <br />
          <ButtonDeleteContainer>
            <Button style={{ backgroundColor: "#ff0000" }}>Delete</Button>
          </ButtonDeleteContainer>
        </Modal>
      )}
    </>
  );
};

export default RecievedHypes;

const RecievedHypesContainer = styled.div`
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
  border-radius: 4px;
  color: #000;
  box-shadow: 0px 10px 13px rgba(17, 38, 146, 0.05);
  border-radius: 8px;
`;

const InfoCard1 = styled.div`
  display: flex;
  flex-direction: column;
  color: #009891;
  gap: 4px;
  svg {
    cursor: pointer;
  }
`;

const InfoCard2 = styled.div`
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

const ViewHypeContainer = styled.div`
  display: flex;
  gap: 15px;
  color: #393939;
`;

const ButtonDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  svg {
    cursor: default;
  }
`;
