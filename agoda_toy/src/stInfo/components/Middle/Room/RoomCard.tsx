import styled, { css } from 'styled-components';
import ToiletIcon from '../../../assets/svgs/toilet.svg?react';
import BookBtn from '@stInfo/components/BookBtn';
import type { Room } from '@src/api/stay';

interface RoomCardProps {
  room: Room;
  handleModalOpen: (room: Room) => void;
}

export default function RoomCard({
  room,
  handleModalOpen,
}: RoomCardProps) {
  return (
    <Container onClick={() => handleModalOpen(room)}>
      <ImageBox imageUrl={room.roomImgUrl} />
      <Frame>
        <CardContent>
          <CardContentFrame>
            <RoomNameBedFrame>
              <RoomName>{room.name}</RoomName>
              <RoomBed>{room.bed}</RoomBed>
            </RoomNameBedFrame>
            <ToiletIcons />
          </CardContentFrame>
          <PriceFrame>
            <RealPrice>{`￦ ${room.roomPrice.toLocaleString()}`}</RealPrice>
            <RoomPrice>{`￦ ${room.roomSalePrice.toLocaleString()}`}</RoomPrice>
          </PriceFrame>
        </CardContent>
        <BookBtn />
      </Frame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 20.4375rem;
  padding-bottom: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;

  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
`;

const Frame = styled.div`
  display: flex;
  padding: 0rem 0.25rem;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const ImgCard = (imageUrl: string) => css`
  height: 13.6875rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: url(${imageUrl}) lightgray 50% / cover no-repeat;
`;

const ImageBox = styled.div<{ imageUrl: string }>`
  ${({ imageUrl }) => ImgCard(imageUrl)}
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  align-self: stretch;
`;

const CardContentFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  width: 19.9rem;
`;

const PriceFrame = styled.div`
  display: flex;
  padding: 0rem 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;

  width: 10.8rem;
  height: 4.44rem;
`;

const ToiletIcons = styled(ToiletIcon)`
  display: flex;
  width: 2.5rem;
  height: 1.5rem;
  padding: 0.625rem;
  align-items: center;
  gap: 0.5rem;
`;

const RoomNameBedFrame = styled.div`
  display: flex;
  width: 9.375rem;
  flex-direction: column;
  align-items: flex-start;
`;

const RoomName = styled.h1`
  ${({ theme }) => theme.fonts.headline.md};
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const RoomBed = styled.p`
  ${({ theme }) => theme.fonts.body.lg};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  padding: 0rem 0.5rem;
  align-items: center;
  gap: 0.5rem;
`;

const RealPrice = styled.p`
  font-family: SUIT;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  text-decoration-line: line-through;
  ${({ theme }) => theme.fonts.headline.md};
  color: ${({ theme }) => theme.colors.gray600};
`;

const RoomPrice = styled.p`
  ${({ theme }) => theme.fonts.display.sm};
  display: flex;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
