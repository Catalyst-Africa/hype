import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import lovebg from "../../../assets/hypesbg/lovebg.svg";
import lovebg1 from "../../../assets/hypesbg/lovebg1.svg";

const PublicContainer = ({ children, style }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      style={style}
      // backgroundImage: `url(${width > 1023 ? lovebg : lovebg1})`,
      // width: "100%",
    >
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
  position: relative;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* padding: 22px 51px; */
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;

  ${({ theme }) => theme.breakpoints.down("md")} {
    background-size: contain;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    /* padding: 37px 24px; */
    margin: 0 auto;
    box-shadow: none;
    border-radius: 0px;
  }
`;
