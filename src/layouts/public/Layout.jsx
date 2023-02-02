import { Container } from "@/styles/reusable/elements.styled";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "@/layouts/public/partials/Header";

const Layout = () => {
  return (
    <>
      <PublicAreaContainer>
        <Main>
          <MainContent>
            <Header />
            <Outlet />
          </MainContent>
        </Main>
      </PublicAreaContainer>
    </>
  );
};

export default Layout;

const PublicAreaContainer = styled(Container)`
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
const Main = styled.main`
  width: 100%;
  grid-template-columns: 240px 1fr;
  background: #fce9e9;

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
