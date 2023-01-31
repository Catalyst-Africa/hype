import PropTypes from "prop-types";
import styled from "styled-components";

const PrivateInnerContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

PrivateInnerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateInnerContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background: #fcfcfc;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
`;
