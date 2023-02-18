import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import { FluidTitle } from "@/styles/reusable/elements.styled";
import { Link } from "react-router-dom";
import { logOut } from "@/setup/redux/slices/auth/extraReducers";
import { useGetUserDataQuery } from "@/setup/redux/slices/api/nestedApis/userApi";
import { signOut } from "firebase/auth";

const Header = () => {
  const { data: user } = useGetUserDataQuery();
  const firstname = user?.name?.split(" ")[0];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <HeaderElement>
      <Greeting>
        <FluidTitle>
          {document.body.clientWidth <= 960
            ? `Hello, ${firstname || "Admin"}`
            : `Hello, ${firstname || "Admin"}`}
          !
        </FluidTitle>
      </Greeting>
      <Options>
        {/* <SearchIcon /> */}
        {/* <BellIcon /> */}
        <div></div>
        <Link
          to="/settings"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Profile>
            <span>{firstname}</span>
            <div>
              <img src={user?.photoUrl} alt={user?.name} />
            </div>
          </Profile>
          <BiLogOut color="#ff0000" onClick={handleLogout} />
        </Link>
      </Options>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #cfcfcf;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1;

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
    span {
      display: none;
    }
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
