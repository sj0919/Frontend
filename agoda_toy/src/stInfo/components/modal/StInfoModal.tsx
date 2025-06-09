import styled from 'styled-components';
import ModalPics from './ModalPics';
import ModalMiddle from './ModalMiddle';
import ModalLeft from './ModalLeft';
import StInfoModalLayout from './StInfoModalLayout';
import type { ModalClose } from '@src/stInfo/types/modalClose';
import type { Room } from '@src/api/stay';

interface StInfoModalProps {
  handleModalClose: () => void;
  selectedRoom: Room;
  stId: number;
  checkinAt: string;
  checkoutAt: string;
  installMonth: number;
}

export default function StInfoModal({
  handleModalClose,
  selectedRoom,
  stId,
  checkinAt,
  checkoutAt,
  installMonth,
}: StInfoModalProps) {
  return (
    <StInfoModalLayout handleModalClose={handleModalClose}>
      <Title>{selectedRoom.name}</Title>
      <ModalPics />
      <ModalMiddle />
      <ModalLeft
        roomId={selectedRoom.id}
        stId={stId}
        checkinAt={checkinAt}
        checkoutAt={checkoutAt}
        installMonth={installMonth}
      />
    </StInfoModalLayout>
  );
}

const Title = styled.h1`
  position: absolute;
  top: 2.56rem;
  left: 4.5rem;
  ${({ theme }) => theme.fonts.display.md};
`;
