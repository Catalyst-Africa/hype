import styled from "styled-components";

import { Loader } from "@/styles/reusable/elements.styled";
import Logo from "@/components/ui/Logo";

const OverlayLoader = () => {
  return (
    <Overlay>
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
  z-index: 100;
  background-color: #fff;
  ${({ transparent }) =>
    transparent && "background-color: rgba(255,255,255, 0.3)"}
`;
