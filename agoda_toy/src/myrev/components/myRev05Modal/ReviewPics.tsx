import { useReviewStore } from '@src/store/useReviewStore';
import React from 'react';
import styled from 'styled-components';

export default function ReviewPics() {
  const review = useReviewStore((state) => state.review);

  return (
    <Container>
      {review?.revImgUrls.map((url, index) => (
        <Pics key={`image-${index}`} src={url} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const Pics = styled.img`
  width: 13.9375rem;
  height: 11.4375rem;
  border-radius: 0.9375rem;
  background: #f3f4f6;
  object-fit: cover;
`;
