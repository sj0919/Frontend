import styled from 'styled-components';
import StarFilled from '../../assets/star_filled.svg?react';
import StarWhite from '../../assets/star_white.svg?react';
import { useState } from 'react';

interface ModalRateProps {
  question: string;
  rating: number;
  setRating: (value: number) => void;
}

export default function ModalRate({
  question,
  rating,
  setRating,
}: ModalRateProps) {
  return (
    <Container>
      <h1>{question}</h1>
      <StarContainer>
        {[1, 2, 3, 4, 5].map((num) =>
          num <= rating ? (
            <StarIconFilled key={num} onClick={() => setRating(num)} />
          ) : (
            <StarIconWhite key={num} onClick={() => setRating(num)} />
          )
        )}
      </StarContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  ${({ theme }) => theme.fonts.body.lg};
`;

const StarContainer = styled.div`
  display: flex;
  width: 6.1875rem;
  height: 1.125rem;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const StarIconFilled = styled(StarFilled)`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;
const StarIconWhite = styled(StarWhite)`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;
