import React from 'react';
import SaleList from './SaleList';
import ReservationBtn from './ReservationBtn';
import styled from 'styled-components';
import Price from './Price';

interface ModalLeftProps {
  roomId: number;
  stId: number;
  checkinAt: string;
  checkoutAt: string;
  installMonth: number;
}

export default function ModalLeft({
  roomId,
  stId,
  checkinAt,
  checkoutAt,
  installMonth,
}: ModalLeftProps) {
  return (
    <Container>
      <SaleList />
      <Price />
      <ReservationBtn 
        roomId={roomId}
        stId={stId}
        checkinAt={checkinAt}
        checkoutAt={checkoutAt}
        installMonth={installMonth}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
