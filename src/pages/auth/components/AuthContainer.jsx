import PropTypes from "prop-types";
import styled from "styled-components";

const AuthContainer = ({ children }) => {
  return <FormContainer>{children}</FormContainer>;
};

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContainer;

const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 32px 24px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  ${({ theme }) => theme.breakpoints.up("xs")} {
    padding: 32px 40px;
  }
`;
