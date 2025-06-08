import styled from 'styled-components';
import { IconStar } from '@stInfo/components/common/Rate';

interface HotelNameProps {
  name: string;
  address: string;
  rating: number;
  reviewCnt: number;
}

export default function HotelName({
  name,
  address,
  rating,
  reviewCnt,
}: HotelNameProps) {
  return (
    <Container>
      <HotelTopGroup>
        <HotelTopFrame>
          <TypoHotelTopFrameMain>{name}</TypoHotelTopFrameMain>
          <TypoHotelTopFrameSub>{/* 영어 이름 필요시 */}</TypoHotelTopFrameSub>
        </HotelTopFrame>
        <HotelTopAdd>{address}</HotelTopAdd>
      </HotelTopGroup>
      <HotelBottomGroup>
        <HotelBottom>
          <IconStar />
          <HotelBottomReview>{rating}</HotelBottomReview>
        </HotelBottom>
        <HotelBottomReview>리뷰 {reviewCnt}개</HotelBottomReview>
      </HotelBottomGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 29rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 3.75rem;
`;

const TypoHotelTopFrameMain = styled.h1`
  ${({ theme }) => theme.fonts.display.md};
  margin: 0;
`;

const TypoHotelTopFrameSub = styled.h2`
  ${({ theme }) => theme.fonts.title.md};
  color: ${({ theme }) => theme.colors.gray600};
`;

const HotelTopAdd = styled.p`
  ${({ theme }) => theme.fonts.title.sm};
  margin: 0;
`;

const HotelTopFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8125rem;
  width: 25.5rem;
  height: 2.81rem;
`;

const HotelTopGroup = styled.div`
  display: flex;
  padding: 0rem 0.5rem;
  flex-direction: column;
  justify-content: stretch;
  height: 4.31rem;
`;

const HotelBottomGroup = styled.div`
  display: flex;
  padding: 0rem 0.5rem;
  align-items: center;
  gap: 1.25rem;
`;

const HotelBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HotelBottomReview = styled.p`
  margin: 0;
  ${({ theme }) => theme.fonts.headline.md};
`;
