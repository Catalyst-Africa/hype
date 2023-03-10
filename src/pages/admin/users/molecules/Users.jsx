import Modal from "@/components/ui/Modal";
import { Button } from "@/styles/reusable/elements.styled";
import { FluidTitle, SubTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineUser, AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "@/setup/redux/slices/api/nestedApis/adminApi";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";

const Users = () => {
  const { data: allUsers = [] } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const usersList = [...allUsers].sort((a, b) => {
    const dateA = a?.timestamp?.seconds;
    const dateB = b?.timestamp?.seconds;

    // Compare the dates in descending order
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  const userRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(usersList?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsersList = usersList?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteShowModal = (user) => {
    userRef.current = user;
    setIsOpenDeleteUser(true);
  };
  const handleDeleteCloseModal = () => {
    setIsOpenDeleteUser(false);
  };

  const handleDeleteUser = async () => {
    try {
      console.log(userRef.current.userId);
      await deleteUser(userRef.current.userId).unwrap();
      handleDeleteCloseModal();
    } catch (err) {
      toast.error(extractErrorMessage(err.message));
    }
  };

  const headers = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
  ];

  const data = allUsers?.map((user) => {
    return {
      name: user.name,
      email: user.email,
    };
  });

  const csvreport = {
    data: data,
    headers: headers,
    filename: "Hype_Users_Report.csv",
  };

  return (
    <>
      <UserContainer>
        <FluidTitle>{`Users [${usersList?.length || 0}]`}</FluidTitle>
        <ButtonContainer>
          <CSVLink {...csvreport}>
            <Button>Export Users</Button>
          </CSVLink>
        </ButtonContainer>
        <br />
        {currentUsersList
          ? currentUsersList?.map((user, index) => {
              return (
                <UserCard key={index}>
                  <InfoContainer>
                    <AiOutlineUser />
                    <span>{user.name}</span>
                  </InfoContainer>
                  <InfoContainer>
                    <AiOutlineMail />
                    <span>{user.email}</span>
                  </InfoContainer>
                  <InfoContainer>
                    <AiFillPhone />
                    <span>{user.phone || "No phone number set yet!"}</span>
                  </InfoContainer>
                  <UserCardInner>
                    {user.email !== "control@catalyst.africa" ? (
                      <RiDeleteBin2Line
                        color="#ff0000"
                        onClick={(e) => {
                          handleDeleteShowModal(user);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </UserCardInner>
                </UserCard>
              );
            })
          : []}
        <br />
        <UsersNavigation>
          {currentPage > 1 && (
            <IoIosArrowBack
              onClick={() => handlePageChange(currentPage - 1)}
              size={30}
              color="#FFB328"
            />
          )}
          {allUsers?.length > 0 ? `${currentPage} of ${totalPages}` : ""}

          {currentPage < totalPages && (
            <IoIosArrowForward
              onClick={() => handlePageChange(currentPage + 1)}
              size={30}
              color="#FFB328"
            />
          )}
        </UsersNavigation>
      </UserContainer>
      {isOpenDeleteUser && (
        <Modal handleClose={handleDeleteCloseModal}>
          <FluidTitle>Delete User</FluidTitle>
          <br />
          <SubTitle>{userRef.current.name}</SubTitle>
          <p>Are you sure you want to delete this User?</p>
          <br />
          <ButtonDeleteContainer>
            <Button
              onClick={handleDeleteUser}
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

export default Users;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
  padding-bottom: 150px;
  position: relative;

  span {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 10px;

  ${({ theme }) => theme.breakpoints.down("touch")} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    padding: 10px 15px;
  }
`;

const UserCardInner = styled.div`
  display: flex;
  gap: 30px;

  svg {
    cursor: pointer;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    position: absolute;
    right: 10px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    gap: 12px;
    svg {
      width: 25px;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  svg {
    color: #ffb328;
  }
`;

const UsersNavigation = styled.div`
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

const ButtonDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
