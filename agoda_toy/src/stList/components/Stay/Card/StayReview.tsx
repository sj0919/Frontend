import styled from 'styled-components';
import StarIc from '@stList/assets/svgs/review_star.svg?react';

interface StayReviewProps {
  review: number;
  reviewCount: number;
}

export default function StayReview({ review, reviewCount }: StayReviewProps) {
  return (
    <Review>
      <StarIcon />
      {review.toFixed(1)} 우수 · {reviewCount.toLocaleString()} 건의 리뷰
    </Review>
  );
}

const Review = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font: ${({ theme }) => theme.fonts.title.lg};
`;

const StarIcon = styled(StarIc)`
  width: 1.2444rem;
  height: 1.2rem;
`;
