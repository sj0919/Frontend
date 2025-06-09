// HotelList.tsx 또는 StlistPage.tsx
// import Review from '@stInfo/components/Review/Review';

import styled from 'styled-components';
import Pagination from '../../Pagination';
import { useEffect, useMemo, useState } from 'react';
import StayCard from './StayCard';
import { getStayList } from '@src/api/stay';
import type { Stay } from '@src/api/stay';

interface StayCardListProps {
  min: number;
  max: number;
}

export default function StayCardList({ min, max }: StayCardListProps) {
  const [stayList, setStayList] = useState<Stay[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroupStart, setCurrentGroupStart] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    getStayList({
      city: '서울',
      checkIn: '2025-06-10',
      checkOut: '2025-06-12',
    })
      .then((data) => setStayList(data))
      .catch((err) => console.error('숙박 목록 불러오기 실패', err));
  }, []);

  // ✅ useMemo로 필터링 최적화
  const filteredList = useMemo(
    () =>
      stayList.filter((stay) => stay.salePrice >= min && stay.salePrice <= max),
    [stayList, min, max]
  );

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = currentPage * ITEMS_PER_PAGE;
  const currentPageList = filteredList.slice(startIdx, endIdx);

  return (
    <Container>
      {currentPageList.map((stay) => (
        <StayCard
          key={stay.id}
          stayId={stay.id}
          imageUrl={stay.mainImageUrl}
          korname={stay.name}
          engName={''} // 필요시 서버에서 받도록 Stay 타입 수정
          star={Math.round(stay.rating)} // 평균 평점에서 별 개수 추정
          review={stay.rating}
          reviewCount={stay.reviewCnt}
          tags={stay.tags}
          location={stay.address}
          realPrice={stay.price}
          salePrice={stay.salePrice}
          totalPrice={stay.totalPrice}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        currentGroupStart={currentGroupStart}
        onPageChange={setCurrentPage}
        onGroupChange={setCurrentGroupStart}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 61.5778rem; // 필터 후 검색결과 없을 시 width 유지
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
