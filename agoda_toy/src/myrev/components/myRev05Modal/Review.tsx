import { useReviewStore } from '@src/store/useReviewStore';
import React from 'react';
import styled from 'styled-components';

export default function Review() {
  const review = useReviewStore((state) => state.review);
  return <Container>{review?.reviewTxt}</Container>;
}

const Container = styled.div`
  display: flex;
  width: 39.375rem;
  height: 12.4375rem;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;

  ${({ theme }) => theme.fonts.body.lg};
`;
