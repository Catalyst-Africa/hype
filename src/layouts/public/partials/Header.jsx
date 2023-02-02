import { useSelector } from "react-redux";
import styled from "styled-components";
import { Logo } from "@/components/ui";
import { Button } from "@/styles/reusable/elements.styled";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];

  return (
    <HeaderElement>
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Options>
        <NavMenu>
          <Link to="/">
            <span>Home</span>
          </Link>
          <span>Contact Us</span>
          {firstname ? (
            ""
          ) : (
            <Link to="/signup">
              <Button $type="outlined">Get Started</Button>
            </Link>
          )}
        </NavMenu>
        <Profile>
          <span style={{ fontWeight: "bold" }}>
            {firstname ? firstname : "Guest"}
          </span>
          <div>
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Peanut"
              }
              alt={user.displayName ? user.displayName : "Avatar"}
            />
          </div>
        </Profile>
      </Options>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
  background: transparent;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  margin-left: auto;

  /* > div:nth-of-type(1) {
    height: 24px;
    width: 2px;
    background: #e6e6e6;
  } */
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 55px;

  span {
    cursor: pointer;
  }
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
