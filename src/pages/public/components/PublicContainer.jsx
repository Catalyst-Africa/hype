import PropTypes from "prop-types";
import styled from "styled-components";

const PublicContainer = ({ children, style }) => {
  return <Container style={style}>{children}</Container>;
};

PublicContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicContainer;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
  padding: 22px 51px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    background-size: contain;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0px 24px;
    margin: 0 auto;
    box-shadow: none;
    border-radius: 0px;
  }
`;
