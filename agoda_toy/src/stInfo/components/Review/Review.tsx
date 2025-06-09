import styled from 'styled-components';
import ReviewHeader from './ReviewHeader';
import ReviewCard from './ReviewCard';
import IconMore from '@stInfo/assets/svgs/Chevron right.svg?react';
import { useEffect, useState } from 'react';
import { getReviewList } from '@src/api/rev';

const dummyData = {
  reviewCnt: 3,
  stayRating: 4.3,

  reviews: [
    {
      reviewer: '이화연',
      reviewerImg:
        'https://i.pinimg.com/736x/d3/73/e8/d373e8ea0793dec9c931bd60aec415db.jpg',
      score: 5,
      reviewText: '숙소가 정말 깔끔하고 위치도 좋아요!',
      createdAt: '2025-05-20',
      reviewImgUrls: [
        'https://i.pinimg.com/736x/47/0b/4a/470b4a260d577d32b197596d5d5f9a9c.jpg',
        'https://i.pinimg.com/736x/8a/ac/11/8aac114ca8e1d809189025696840ad5f.jpg',
        'https://i.pinimg.com/736x/e3/0d/aa/e30daa94ad4a25fdeb458a130c7cd684.jpg',
      ],
    },
    {
      reviewer: '김화연',
      reviewerImg:
        'https://i.pinimg.com/736x/f5/e5/f4/f5e5f40839b44dcb949cfa5cd020ab65.jpg',
      score: 4,
      reviewText: '침대가 편하고 조용했어요.',
      createdAt: '2025-05-18',
      reviewImgUrls: [
        'https://i.pinimg.com/736x/1b/3f/0b/1b3f0be32832faebd591c6343ea64e52.jpg',
        'https://i.pinimg.com/736x/cb/75/66/cb75668c137c82d99fcaff62db09773b.jpg',
      ],
    },
  ],
};

export interface ReviewItem {
  reviewer: string;
  reviewerImg: string;
  score: number;
  reviewText: string;
  createdAt: string;
  reviewImgUrls: string[];
}

export default function Review() {
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [reviewRate, setReviewRate] = useState<number>(0);
  const [reviewList, setReivewList] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await getReviewList(1); //추후 수정
        setReivewList(res.reviews);
        setReviewCount(res.reviewCnt);
        setReviewRate(res.stayRating);
      } catch (e) {
        console.error(e);
      }
    };

    //getReviews();
    setReviewCount(dummyData.reviewCnt);
    setReviewRate(dummyData.stayRating);
    setReivewList(dummyData.reviews);
  }, []);

  return (
    <Container>
      <ReviewHeader rate={reviewRate} count={reviewCount} />
      <ContentContainer>
        <CardContainer>
          {reviewList.map((item, index) => (
            <ReviewCard key={`review-${index}`} data={item} />
          ))}
        </CardContainer>
        <MoreContainer>
          <MoreReview>리뷰 전체보기</MoreReview>
          <MoreIcon />
        </MoreContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 87.5rem;
  height: 78.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.75rem;
  flex-shrink: 0;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 2.6875rem 1.875rem;
  align-self: stretch;
  flex-wrap: wrap;

  width: 88rem;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 87.625rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.625rem;
`;

const MoreReview = styled.p`
  ${({ theme }) => theme.fonts.headline.sm};
  color: ${({ theme }) => theme.colors.gray300};
`;

const MoreIcon = styled(IconMore)`
  width: 1.875rem;
  height: 1.875rem;
  aspect-ratio: 1/1;
`;

const MoreContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
  align-self: stretch;

  cursor: pointer;
`;
