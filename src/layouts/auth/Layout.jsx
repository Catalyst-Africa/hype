import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Container } from "@/styles/reusable/elements.styled";

const Layout = ({ renderChildren, children }) => {
  return (
    <>
      <Container>
        <Main>{renderChildren ? children : <Outlet />}</Main>
      </Container>
    </>
  );
};

Layout.propTypes = {
  renderChildren: PropTypes.bool,
};

export default Layout;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 61px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
