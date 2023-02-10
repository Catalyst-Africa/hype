import { FluidTitle } from "@/styles/reusable/elements.styled";
import React, { useState } from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

const UsersList = [
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
  {
    name: "Beyond Logic",
    email: "BeyondLogic@Localhost.com",
    phone: "12345678910",
  },
];
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(UsersList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsersList = UsersList?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <UserContainer>
        <FluidTitle>Users</FluidTitle>
        <br />
        {currentUsersList
          ? currentUsersList.map((user, index) => {
              return (
                <UserCard key={index}>
                  <span>{user.name}</span>
                  <InfoContainer>
                    <AiOutlineMail />
                    <span>{user.email}</span>
                  </InfoContainer>
                  <InfoContainer>
                    <AiFillPhone />
                    <span>{user.phone}</span>
                  </InfoContainer>
                  <UserCardInner>
                    <RiDeleteBin2Line color="#ff0000" />
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
          {currentPage} of {totalPages}
          {currentPage < totalPages && (
            <IoIosArrowForward
              onClick={() => handlePageChange(currentPage + 1)}
              size={30}
              color="#FFB328"
            />
          )}
        </UsersNavigation>
      </UserContainer>
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
`;

const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 10px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
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
