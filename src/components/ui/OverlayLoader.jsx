import styled from "styled-components";

import { Loader } from "@/styles/reusable/elements.styled";
import Logo from "@/components/ui/Logo";

const OverlayLoader = ({ transparent }) => {
  return (
    <Overlay transparent={transparent}>
      <Logo />
      <Loader />
    </Overlay>
  );
};

export default OverlayLoader;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: ${(props) =>
    props.transparent ? "rgba(0, 0, 0, .65)" : "#fff"};
`;
