import Upper from '../components/Upper/Upper';
import Middle from '@stInfo/components/Middle/Middle';
import Review from '@stInfo/components/Review/Review';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStayDetail } from '@src/api/stay';
import type { StayDetail, Room } from '@src/api/stay';
import styled from 'styled-components';
import StInfoModal from '../components/modal/StInfoModal';
//import Room from '../components/Middle/Room/Room';

export default function StInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [stay, setStay] = useState<StayDetail | null>(null);
  const { stayId } = useParams<{ stayId: string }>();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  function handleModalOpen(room: Room) {
    setSelectedRoom(room);
    setIsOpen(true);
  }

  function handleModalClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (stayId) {
      getStayDetail(Number(stayId)).then(setStay).catch(console.error);
      console.log (stay);
    }
  }, [stayId]);

  if (!stay) return <div>로딩 중...</div>;

  return (
    <>
      {isOpen && selectedRoom && (
        <StInfoModal
          handleModalClose={handleModalClose}
          selectedRoom={selectedRoom}
          stId={stay.id}
          checkinAt="2025-06-10"
          checkoutAt="2025-06-12"
          installMonth={6}
        />
      )}
      <Container>
        <Upper stay={stay}/>
        <Middle handleModalOpen={handleModalOpen} stay={stay} />
        {/* <Review review={stay.review} /> */}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
