import { useState } from 'react';
import MyNavBar from '../../common/components/MyNavBar';
import MyRevCardSlider from '../components/MyRevCardSlider';
import styled from 'styled-components';
import MyRevModal from '../components/myRev02Modal/MyRevModal';
import MyRevSeeModal from '../components/myRev05Modal/MyRevSeeModal';
import {
  useReservStore,
  useReviewStore,
  type Reservation,
} from '@src/store/useReviewStore';
import { getReview } from '@src/api/rev';

export default function MyRev() {
  const [writeRev, setWriteRev] = useState(false);
  const [modifyRev, setModifyRev] = useState(false);
  const setStay = useReservStore((state) => state.selectStay);
  const setReview = useReviewStore((state) => state.selectReview);

  function handleWriteRevOpen(stay: Reservation) {
    //후기 작성 모달 오픈
    setStay(stay);
    setWriteRev(true);
  }

  async function handleModifyRevOpen(stay: Reservation) {
    //후기 수정 모달 오픈
    try {
      const res = await getReview(stay.res_id);
      if (res) {
        setReview(res.review);

        const stay = {
          res_id: res.reservation.resId,
          st_id: res.reservation.resId,
          st_img: null,
          st_name: res.reservation.stName,
          st_city: res.reservation.stCity,
          check_in: res.reservation.checkIn,
          check_out: res.reservation.checkOut,
          rev: null,
        };
        setStay(stay);
        setModifyRev(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleModalClose() {
    if (writeRev) {
      setWriteRev(false);
    } else if (modifyRev) {
      setModifyRev(false);
    }
  }

  const props = {
    handleWriteRevOpen,
    handleModifyRevOpen,
  };

  return (
    <>
      {writeRev && <MyRevModal handleModalClose={handleModalClose} />}
      {modifyRev && <MyRevSeeModal handleModalClose={handleModalClose} />}

      <Containter>
        <MyNavBar />
        <MyRevCardSlider {...props} />
      </Containter>
    </>
  );
}

const Containter = styled.div`
  display: flex;
  width: 120rem;
  justify-content: center;
  gap: 2rem;
`;
