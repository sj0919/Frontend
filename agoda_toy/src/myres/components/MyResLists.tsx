import styled from 'styled-components';
import MyResItem from './MyResItem';
import MyResSlider from './MyResSlider';
import type ResItem from '../types/res.types';
import type { Reservation } from '@src/api/res';
import StayFallbackImage from '../assets/imgs/cancelled_stay_1.png';

interface MyResListsProps {
  showUpcoming: boolean;
  upcomingData: Reservation[];
  completedData: Reservation[];
}

export default function MyResLists({
  showUpcoming,
  upcomingData,
  completedData,
}: MyResListsProps) {
  const formatResItem = (
    res: Reservation,
    status: ResItem['status']
  ): ResItem => ({
    reservationId: res.res_id,
    korName: res.st_name,
    accommodationImage: StayFallbackImage,
    location: res.st_city,
    startDate: res.check_in,
    endDate: res.check_out,
    status,
  });

  const upcomingItems = upcomingData.map((r) => formatResItem(r, '예약 완료'));
  const completedItems = completedData.map((r) => formatResItem(r, '체크아웃 완료'));

  return (
    <Container>
      {showUpcoming && upcomingItems.length > 0 && (
        <ListWrapper>
          <ListTitle>다가오는 예약</ListTitle>
          <MyResSlider items={upcomingItems} />
        </ListWrapper>
      )}

      {completedItems.length > 0 && (
        <ListWrapper>
          <ListTitle>완료된 예약</ListTitle>
          <MyResSlider items={completedItems} />
        </ListWrapper>
      )}

      {/* 예약 취소하는 api가 없음 이슈.. */}
      {/* <ListWrapper>
        <ListTitle>취소된 예약</ListTitle>
        <MyResItem
          imageUrl={StayFallbackImage}
          status="취소된 예약"
          location="Itabashi City"
          name="호텔 이름"
          startDate="2025-02-10"
          endDate="2025-02-15"
        />
      </ListWrapper> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.5rem;
  width: 64.5rem;
  padding-inline: 1.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListTitle = styled.h3`
  font: ${({ theme }) => theme.fonts.title.lg};
  margin-left: 0.5rem;
  margin-bottom: 1rem;
`;
