import { SubTitle, Title } from "@/styles/reusable/elements.styled";
import { Button } from "@/styles/reusable/elements.styled";
import { FluidTitle } from "@/styles/reusable/elements.styled";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName.split(" ")[0];
  return (
    <>
      <ProfileContainer>
        <ProfileInfo>
          <TopDivider />
          <ProfileImage src={user.photoURL} alt={user.displayName} />
          <TitleContainer>
            <FluidTitle>{firstname}</FluidTitle>
            <span>@{firstname}</span>
          </TitleContainer>
          <Link to="/send-hype">
            <Button>Send Hypes</Button>
          </Link>

          <InfoContainer>
            <InfoCard>
              <SubTitle style={{ color: "#BABABA", fontSize: "14px" }}>
                Email Address
              </SubTitle>
              <SubTitle style={{ color: "#6C6C6C", fontSize: "16px" }}>
                {user?.email}
              </SubTitle>
            </InfoCard>
            <InfoCard>
              <SubTitle style={{ color: "#BABABA", fontSize: "14px" }}>
                Phone Number
              </SubTitle>
              <SubTitle style={{ color: "#6C6C6C", fontSize: "16px" }}>
                {user.phoneNumber ? user.phoneNumber : "N/A"}
              </SubTitle>
            </InfoCard>
          </InfoContainer>
        </ProfileInfo>
        <ProfileEdit>
          <Link to="/settings">
            <EditCard>
              <FaEdit color="#F69D00" />
              <SubTitle>Edit Profile</SubTitle>
            </EditCard>
          </Link>

          <EditCard>
            <IoMdNotifications color="#F69D00" />
            <SubTitle>Notification</SubTitle>
          </EditCard>
        </ProfileEdit>
      </ProfileContainer>
    </>
  );
};

export default ProfileCard;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -150px;
  margin-bottom: 150px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    margin-top: -180px;
    margin-bottom: 50px;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 32px 2px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  gap: 30px;
  padding: 34px 0px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }
`;
const ProfileEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0px;
  padding-left: 42px;
  margin-top: -80px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 24px;
    padding: 0px 20px;
    gap: 8px;
  }
`;

const TopDivider = styled.div`
  width: 43px;
  height: 8px;
  background: #f0f0f0;
  border-radius: 6.5px;
`;

const ProfileImage = styled.img`
  background: #ffffff;
  box-shadow: 0px 0px 32px 2px rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  width: 130px;
  height: 130px;
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 61px;
  gap: 30px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    gap: 16px;
    padding: 0 20px;
  }
`;

const InfoCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  padding: 20px 14px;
  width: 100%;
  min-height: 80px;
`;

const EditCard = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 36px 5px rgba(0, 0, 0, 0.05);
  border-radius: 11px;
  padding: 20px 24px;
  gap: 6.5px;
  cursor: pointer;
`;
