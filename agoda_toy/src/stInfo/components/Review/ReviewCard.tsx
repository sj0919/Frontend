import styled from 'styled-components';
import Profileimg from '@stInfo/assets/svgs/pro_big.svg?react';
import ReivewCardHeader from './ReivewCardHeader';
import ReviewCardContent from './ReviewCardContent';
import ReviewCardImg from './ReviewCardImg';
import ReviewCardThumb from './ReviewCardThumb';
import type { ReviewItem } from './Review';
interface ReviewCardProps {
  data: ReviewItem;
}

export default function ReviewCard({ data }: ReviewCardProps) {
  return (
    <Container>
      <Frame>
        <Profile src={''} />
        <ContentFrame>
          <TextFrame>
            <ReivewCardHeader
              name={data.reviewer}
              createdAt={data.createdAt}
              rate={data.score}
            />
            <ReviewCardContent text={data.reviewText} />
          </TextFrame>
          <ReviewCardImg images={data.reviewImgUrls} />
          <ReviewCardThumb />
        </ContentFrame>
      </Frame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 24.6rem;
  padding: 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  border-radius: 1.25rem;
  border: 1px solid rgba(172, 172, 172, 1);
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
`;

const Frame = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.125rem;
`;

const Profile = styled.img`
  display: flex;
  width: 4.375rem;
  height: 4.375rem;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;

  border-radius: 2.1875rem;
  background: var(--AGODA-Primary, #006a71);
  object-fit: cover;
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

const ContentFrame = styled.div`
  display: flex;
  width: 33.5rem;
  height: 24.6rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
`;
