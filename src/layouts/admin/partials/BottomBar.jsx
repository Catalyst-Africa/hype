import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiFillPieChart } from "react-icons/ai";
import { BiCategoryAlt, BiMessageAltDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

const BottomBar = () => {
  return (
    <BottomBarElement>
      <ul>
        <li>
          <NavLink to="/admin/dashboard">
            <AiFillPieChart />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/hypes">
            <BiMessageAltDetail />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <FiUsers />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories">
            <BiCategoryAlt />
          </NavLink>
        </li>
      </ul>
    </BottomBarElement>
  );
};

export default BottomBar;

const BottomBarElement = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 16px 24px;
  background: #fff;
  z-index: 999;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }

  > ul {
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    max-width: 720px;
    width: 100%;
    margin: auto;

    li {
      a {
        svg {
          color: rgba(136, 136, 136, 0.55);
          width: 50px;
        }
      }

      .active {
        svg {
          color: ${({ theme }) => theme.color.main.default};
        }
      }
    }
  }
`;
