import styled from 'styled-components';
import RoomCard from './RoomCard';
import type { MiddleProps } from '@src/stInfo/types/middleProps';

export default function RoomSlider({ stay, handleModalOpen }: MiddleProps) {
  return (
    <Container>
      {stay.rooms.map((room, idx) => (
        <RoomCard
          key={idx}
          handleModalOpen={handleModalOpen}
          image={room.roomImgUrl}
          title={room.name}
          description={room.bed}
          realprice={`￦ ${room.roomPrice.toLocaleString()}`}
          saleprice={`￦ ${room.roomSalePrice.toLocaleString()}`}
        />
      ))}
      <RoomSliderBar />
      <RoomSliderBarRectangle />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  align-items: center;
  gap: 0.875rem;
  align-self: stretch;
  overflow-x: hidden;
`;

const RoomSliderBar = styled.div`
  display: flex;
  height: 0.375rem;
  padding-right: 62.5rem;
  align-items: center;
  align-self: stretch;

  border-radius: 6.25rem;
  background: ${({ theme }) => theme.colors.gray100};
`;

const RoomSliderBarRectangle = styled.div`
  width: 25.375rem;
  height: 0.375rem;
  border-radius: 6.25rem;
  background: ${({ theme }) => theme.colors.secondary};
`;
