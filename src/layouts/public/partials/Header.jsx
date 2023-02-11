import { useSelector } from "react-redux";
import styled from "styled-components";
import { Logo } from "@/components/ui";
import { Button } from "@/styles/reusable/elements.styled";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];
  const { pathname } = useLocation();

  return (
    <HeaderElement
      // style={{
      //   background: pathname.includes("hype/message/") ? "transparent" : "#fff",
      // }}
    >
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Options>
        <NavMenu>
          <NavItems>
            <NavLink to="/">
              <span>Home</span>
            </NavLink>
            <Link to="/">
              <span>About</span>
            </Link>
            {/* <Link to="/">
              <span>Contact Us</span>
            </Link> */}
          </NavItems>

          {firstname ? (
            <Link to="/dashboard">
              <Button $type="outlined">Dashboard</Button>
            </Link>
          ) : (
            <NavigationButton>
              <Link to="/signup">
                <Button $type="outlined" style={{ border: "none" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>Join Now</Button>
              </Link>
            </NavigationButton>
          )}
        </NavMenu>
      </Options>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
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
  ${({ theme }) => theme.breakpoints.down("md")} {
    span {
      display: none;
    }
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 55px;

  .active {
    font-weight: bold;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;

const NavigationButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
