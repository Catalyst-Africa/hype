import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Container } from "@/styles/reusable/elements.styled";
import Header from "@/layouts/private/partials/Header";
import SideBar from "@/layouts/private/partials/SideBar";
import BottomBar from "@/layouts/private/partials/BottomBar";
import { SendHypeButton } from "@/components/ui";

const Layout = () => {
  return (
    <>
      <PrivateAreaContainer>
        <Main>
          <SideBar />
          <MainContent>
            <Header />

            <Outlet />
          </MainContent>
          <SendHypeButton />
        </Main>
        <BottomBar />
      </PrivateAreaContainer>
    </>
  );
};

export default Layout;
const PrivateAreaContainer = styled(Container)`
  padding: 0;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: 240px 1fr;
  background: rgba(243, 243, 243, 1);

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  min-height: 100%;
  width: 100%;
  flex: 0 0 calc(100% - 220px);
  /* z-index: 10; */
  overflow: scroll;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;
