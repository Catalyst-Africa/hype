import PropTypes from "prop-types";
import styled from "styled-components";
import lovebg from "../../../assets/hypesbg/lovebg.svg";

const PublicContainer = ({ children }) => {
  return (
    <Container style={{ backgroundImage: `url(${lovebg})` }}>
      {children}
    </Container>
  );
};

PublicContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 22px 51px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  /* background-color: transparent; */

  ${({ theme }) => theme.breakpoints.down("md")} {
    background-size: cover;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 37px 24px;
    margin: 0 auto;
    box-shadow: none;
    border-radius: 0px;
  }
`;
