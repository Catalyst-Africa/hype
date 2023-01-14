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
  padding: 24px 32px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  > form,
  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    padding: 24px 24px;
    width: calc(100% + 48px);
    box-shadow: none;
    border-radius: 0px;
  }
`;
