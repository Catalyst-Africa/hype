import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "@/layouts/auth/partials/Header";
import { Container } from "@/styles/reusable/elements.styled";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 61px);

  ${Container} {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
