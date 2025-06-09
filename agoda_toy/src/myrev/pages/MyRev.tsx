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
import MyRevModifyModal from '../components/myRev06/MyRevModifyModal';

export default function MyRev() {
  const [writeRev, setWriteRev] = useState(false);
  const [modifyRev, setModifyRev] = useState(false);
  const [editRev, setEditRev] = useState(false);
  const setStay = useReservStore((state) => state.selectStay);
  const setReview = useReviewStore((state) => state.selectReview);

  function handleWriteRevOpen(stay: Reservation) {
    //후기 작성 모달 오픈
    setStay(stay);
    setWriteRev(true);
  }

  async function handleModifyRevOpen(stay: Reservation) {
    //후기 조회 모달 오픈
    try {
      console.log(stay);

      const res = await getReview(stay.rev_id as number);
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
          rev_id: res.review.rev_id,
        };
        setStay(stay);
        setModifyRev(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleEditRevOpen() {
    setEditRev(true);
  }

  function handleModalClose() {
    if (writeRev) {
      setWriteRev(false);
    } else if (modifyRev) {
      setModifyRev(false);
    } else if (editRev) {
      setEditRev(false);
    }
  }

  const props = {
    handleWriteRevOpen,
    handleModifyRevOpen,
    handleEditRevOpen,
  };

  return (
    <>
      {writeRev && <MyRevModal handleModalClose={handleModalClose} />}
      {modifyRev && (
        <MyRevSeeModal
          handleModalClose={handleModalClose}
          handleEditRevOpen={handleEditRevOpen}
        />
      )}
      {editRev && <MyRevModifyModal handleModalClose={handleModalClose} />}
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
