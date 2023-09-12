import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -10px;
  background: none;
  border: none;
  color: black; 
  font-weight: bold;
  font-size: 1.5em;
  cursor: pointer;

  &:hover{
    color: red;
  }
  &:active{
    transform: scaleY(0.8) scaleX(0.8);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;

const AvatarModal = ({ src, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalImage src={src} alt="Avatar" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default AvatarModal;
