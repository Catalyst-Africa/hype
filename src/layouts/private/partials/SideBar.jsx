import styled from "styled-components";

import { Logo } from "@/components/ui";
import { AiFillPieChart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { SiRubygems } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <NavElement>
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <List>
        <li>
          <NavLink to="/dashboard">
            <AiFillPieChart /> Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <FaUser /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/gems-polls">
            <SiRubygems /> Gems & Polls
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <IoMdSettings /> Settings
          </NavLink>
        </li>
      </List>
    </NavElement>
  );
};

export default SideBar;

const NavElement = styled.nav`
  flex: 0 0 220px;
  width: 100%;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0px 6px -2px rgba(0, 0, 0, 0.16);

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
      color: rgba(136, 136, 136, 0.55);
      transition: ease-in-out 0.3s;

      svg {
        color: rgba(136, 136, 136, 0.55);
      }

      &:hover {
        color: #393939;

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
      color: #393939;

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
