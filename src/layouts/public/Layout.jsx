import { Container } from "@/styles/reusable/elements.styled";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "@/layouts/public/partials/Header";
import Footer from "@/layouts/public/partials/Footer";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <PublicAreaContainer>
        <Main>
          <MainContent>
            {pathname.includes("/hype/message") ? "" : <Header />}
            <Outlet />
            {pathname.includes("/hype/message") ? "" : <Footer />}
          </MainContent>
        </Main>
      </PublicAreaContainer>
    </>
  );
};

export default Layout;

const PublicAreaContainer = styled(Container)`
  padding: 0;
  overflow: auto;
`;
const Main = styled.main`
  width: 100%;
  grid-template-columns: 240px 1fr;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  min-height: 100%;
  width: 100%;
  flex: 0 0 calc(100% - 220px);

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;
