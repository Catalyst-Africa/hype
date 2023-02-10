import React from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ children, handleClose }) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          {children}{" "}
          <AiFillCloseCircle
            onClick={handleClose}
            color="#FFB328"
            size={30}
            cursor="pointer"
            style={{ position: "absolute", right: "10px", top: "10px" }}
          />
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  p {
    max-width: 700px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 0px 25px;
  }
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
`;
