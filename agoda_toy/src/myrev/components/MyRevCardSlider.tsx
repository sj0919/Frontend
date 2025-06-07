import { useEffect, useState } from 'react';
import type { ReviewModalHandlers } from '../types/modalFnTypes';
import MyRevCard from './MyRevCard';
import styled from 'styled-components';
import { getMyReservation } from '@src/api/rev';
import type { Reservation } from '@src/store/useReviewStore';

type MyRevCardSliderProps = ReviewModalHandlers;

export default function MyRevCardSlider(props: MyRevCardSliderProps) {
  const [revList, setRevList] = useState<Reservation[]>([]);

  useEffect(() => {
    const getRevList = async () => {
      try {
        const res = await getMyReservation();
        setRevList(res);
      } catch (e) {
        console.error(e);
      }
    };

    getRevList();
  }, []);

  return (
    <Container>
      {revList.map((rev) => (
        <MyRevCard key={rev.res_id} {...rev} {...props} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.69rem;
`;
