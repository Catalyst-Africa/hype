import React from "react";
import styled from "styled-components";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import { useGetUserDataQuery } from "@/setup/redux/slices/api/nestedApis/userApi";

const ProfileHero = () => {
  const { data: user } = useGetUserDataQuery();
  return (
    <>
      <ProfileHeroContainer>
        <ProfileImage src={user?.photoUrl} alt={user?.name} />
        <TitleContainer>
          <FluidTitle color="#fff">{user?.name}</FluidTitle>
          <span>{user?.username}</span>
        </TitleContainer>
        <FluidTitle color="#fff">Gems & Polls</FluidTitle>
      </ProfileHeroContainer>
    </>
  );
};

export default ProfileHero;

const ProfileHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: -300px;
`;

const ProfileImage = styled.img`
  width: 98.37px;
  height: 98.37px;
  border-radius: 50%;
  background: transparent;
  border: 4px solid #ffffff;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.25);
`;

const TitleContainer = styled.div`
  text-align: center;
  color: #fff;
`;
