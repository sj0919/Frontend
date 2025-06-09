import styled from 'styled-components';
import Rate from '@stInfo/components/common/Rate';
import { useReservStore } from '@src/store/useReviewStore';

export default function ModalLeftTop() {
  const stay = useReservStore((state) => state.stay);
  return (
    <Container>
      <HotelName>{stay?.st_name}</HotelName>
      <TextFrame>
        <div>
          <HotelSummaryTitle>후기</HotelSummaryTitle>
          <HotelSummary>89개</HotelSummary>
        </div>
        <div>
          <HotelSummaryTitle>평점</HotelSummaryTitle>
          <HotelSummary>
            <Rate />
            8.2점
          </HotelSummary>
        </div>
      </TextFrame>
    </Container>
  );
}

const Container = styled.div`
  width: 21.5rem;
  height: 9.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 0.3px solid var(--AGODA-Black, #23262c);

  margin-bottom: 3.25rem;

  position: relative;
`;

const HotelName = styled.h1`
  ${({ theme }) => theme.fonts.title.lg};
  position: absolute;
  top: 1.75rem;
  left: 1.75rem;
`;

const HotelSummaryTitle = styled.p`
  ${({ theme }) => theme.fonts.title.lg};
`;

const HotelSummary = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({ theme }) => theme.fonts.caption.lg};
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  gap: 0.75rem;
`;
