import styled from "styled-components";

import { Logo } from "@/components/ui";
import { AiFillPieChart } from "react-icons/ai";
import { BiGroup, BiCategoryAlt, BiMessageAltDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubTitle } from "@/styles/reusable/elements.styled";
import { useGetUserDataQuery } from "@/setup/redux/slices/api/nestedApis/userApi";

const SideBar = () => {
  const { data: currentUser } = useGetUserDataQuery();
  const creationTime = new Date(
    currentUser.timeStamp?.seconds * 1000,
  ).toDateString();
  const date = [creationTime.split(" ")[1], creationTime.split(" ")[3]];
  return (
    <NavElement>
      <div>
        <Link
          to="#"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Logo />
          <SubTitle>Admin</SubTitle>
        </Link>
      </div>
      <List>
        <li>
          <NavLink to="/admin/dashboard">
            <AiFillPieChart /> Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/hypes">
            <BiMessageAltDetail /> Hypes
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <FiUsers /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories">
            <BiCategoryAlt /> Categories
          </NavLink>
        </li>
      </List>
      <Member>
        <BiGroup />
        <p>Member since {date.join(" ")}</p>
      </Member>
    </NavElement>
  );
};

export default SideBar;

const NavElement = styled.nav`
  flex: 0 0 220px;
  width: 100%;
  background: #009891;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0px 6px -2px rgba(0, 0, 0, 0.16);
  position: relative;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }

  > div:first-of-type {
    padding: 24px 0;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 4px;
  padding-left: 48px;

  li {
    font-size: 16px;
    a {
      display: flex;
      width: 100%;
      gap: 16px;
      color: #fff;
      transition: ease-in-out 0.3s;

      svg {
        color: #f49e3f;
      }

      &:hover {
        color: #f49e3f;

        svg {
          color: ${({ theme }) => theme.color.main.default};
        }

        &::after {
          content: " ";
          margin-left: auto;
          background: ${({ theme }) => theme.color.main.default};
          width: 5px;
          height: 24px;
          border-radius: 5px;
          display: inline-block;
        }
      }
    }

    .active {
      color: #f49e3f;

      svg {
        color: ${({ theme }) => theme.color.main.default};
      }

      &::after {
        content: " ";
        background: ${({ theme }) => theme.color.main.default};
        width: 5px;
        height: 24px;
        border-radius: 5px;
        display: inline-block;
        margin-left: auto;
      }
    }
  }
`;

const Member = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  bottom: 0;
  width: 100%;
  padding: 24px 0;

  svg {
    color: ${({ theme }) => theme.color.main.default};
  }

  p {
    font-size: 12px;
    color: #393939;
    transition: ease-in-out 0.3s;
    font-weight: 600;
  }
`;
