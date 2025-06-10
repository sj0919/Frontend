import HotelBotton from '@stInfo/components/HotelBotton';
import PopInfoBottom from './PopInfoBottom';
import PopInfoTop from './PopInfoTop';
import styled from 'styled-components';

interface PopProps {
  tags: string[];
  salePrice: number;
  review: {
    addrRating: number;
    saniRating: number;
    servRating: number;
  };
}

export default function Pop({ tags, salePrice, review }: PopProps) {
  return (
    <Container>
      <BottonAndFrame>
        <Frame>
          <PopInfoTop salePrice={salePrice} tags={tags} />
          <PopInfoBottom
            addrRating={review.addrRating}
            saniRating={review.saniRating}
            servRating={review.servRating}
          />
        </Frame>
        <HotelBotton />
      </BottonAndFrame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 21.5rem;
  height: 23.8rem;
  padding: 1.5rem 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(172, 172, 172, 1);
  background: var(--AGODA-White, #fff);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  width: 17.9rem;
  height: 20.8rem;
`;

const BottonAndFrame = styled.div`
  display: flex;
  height: 20.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;
  flex-shrink: 0;
`;
