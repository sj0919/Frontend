import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useResStore } from '@src/stores/resStore';

interface ReservationBtnProps {
  roomId: number;
  stId: number;
  checkinAt: string;
  checkoutAt: string;
  installMonth: number;
}

export default function ReservationBtn({
  roomId,
  stId,
  checkinAt,
  checkoutAt,
  installMonth,
}: ReservationBtnProps) {
  const nav = useNavigate();
  const { setResInfo } = useResStore();

  const handleClick = () => {
    setResInfo({
      room_id: roomId,
      st_id: stId,
      install_month: installMonth,
      checkin_at: checkinAt,
      checkout_at: checkoutAt,
      guest_first: '',
      guest_last: '',
      guest_email: '',
      guest_phone: '',
      guest_request: '',
    });

    nav('/guestinfo');
  };
  return <Button onClick={handleClick}>예약하기</Button>;
}

const Button = styled.button`
  all: unset;
  display: flex;
  width: 17.3rem;
  height: 2.75rem;
  padding: 0.625rem 3.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--AGODA-Primary, #006a71);

  ${({ theme }) => theme.fonts.headline.lg};
  color: ${({ theme }) => theme.colors.white};
`;
