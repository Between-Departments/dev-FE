import React from 'react';
import styled from 'styled-components';
import { colors } from '@/constants/colors';

interface MoreActionModalInterface {
  children: React.ReactNode;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreActionModal = ({ children, setModalState }: MoreActionModalInterface) => {
  return (
    <>
      <BackDrop onClick={() => setModalState(false)} />
      <ModalLayout>{children}</ModalLayout>
    </>
  );
};

export default MoreActionModal;

const ModalLayout = styled.div`
  position: absolute;
  width: 12rem;
  height: 9.5rem;
  border-radius: 8px;
  z-index: 1;
  top: 3.5rem;
  right: 0.5rem;
  background-color: ${colors.white};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.6rem 1rem 1.6rem;
  z-index: 10;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 2;
`;
