import PropTypes from "prop-types";
import styled from "styled-components";

const NotFoundContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

NotFoundContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotFoundContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 22px 51px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  /* background-color: transparent; */

  ${({ theme }) => theme.breakpoints.down("md")} {
    background-size: contain;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 37px 24px;
    margin: 0 auto;
    box-shadow: none;
    border-radius: 0px;
  }
`;
