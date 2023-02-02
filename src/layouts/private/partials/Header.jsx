import { useSelector } from "react-redux";
import styled from "styled-components";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";

import { FluidTitle } from "@/styles/reusable/elements.styled";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];

  return (
    <HeaderElement>
      <Greeting>
        <FluidTitle>
          {document.body.clientWidth <= 960
            ? `Hi ${firstname}`
            : `Welcome Back, ${firstname || "User"}`}
          !
        </FluidTitle>
        <span>Here's an overview of your activities</span>
      </Greeting>
      <Options>
        <SearchIcon />
        <BellIcon />
        <div></div>
        <Profile>
          <span>{firstname}</span>
          <div>
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </Profile>
      </Options>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
  background: rgba(252, 250, 255, 0.32);
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;

const Greeting = styled.div`
  ${({ theme }) => theme.breakpoints.down("xs")} {
    span {
      display: none;
    }
  }

  ${FluidTitle} {
    ${({ theme }) => theme.breakpoints.down("md")} {
      font-weight: 400;
    }
  }
`;

const Options = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;

  > div:nth-of-type(1) {
    height: 24px;
    width: 2px;
    background: #e6e6e6;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  width: 20px;
  color: #393939;
`;

const BellIcon = styled(AiFillBell)`
  width: 20px;
  color: #393939;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }

  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.color.main.default};

    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
`;
