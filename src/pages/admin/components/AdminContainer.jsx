import PropTypes from "prop-types";
import styled from "styled-components";

const AdminContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

AdminContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
  padding: 22px 51px;
  background-color: #f3f3f3;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 37px 24px;
    margin: 0 auto;
    box-shadow: none;
    border-radius: 0px;
  }
`;
