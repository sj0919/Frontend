import styled from 'styled-components';
import MyRevWriteReviewBtn from './MyRevWriteReviewBtn';
import type { MyRevCardText, ReviewModalHandlers } from '../types/modalFnTypes';
import MyRevModifyReviewBtn from './MyRevModifyReviewBtn';
import type { Reservation } from '@src/store/useReviewStore';

type MyRevCardTextProps = Reservation & ReviewModalHandlers;

export default function MyRevCardText(props: MyRevCardTextProps) {
  const {
    res_id,
    st_id,
    st_img,
    st_name,
    st_city,
    check_in,
    check_out,
    rev,
    handleWriteRevOpen,
    handleModifyRevOpen,
  } = props;

  return (
    <Container>
      <BookNumberFrame>
        <BookNumber>{String(res_id).padStart(7, '0')}(예약번호)</BookNumber>
        <BookNumber>{st_name}</BookNumber>
      </BookNumberFrame>
      <CheckInOutContainer>
        <CheckInOutFrame>
          <Title>체크인</Title>
          <Date>{check_in}</Date>
        </CheckInOutFrame>
        <CheckInOutFrame>
          <Title>체크아웃</Title>
          <Date>{check_out}</Date>
        </CheckInOutFrame>
      </CheckInOutContainer>
      <HotelName>
        <Title>숙소</Title>
        <Date>{st_city}</Date>
      </HotelName>
      {rev ? (
        <MyRevModifyReviewBtn
          handleModifyRevOpen={() =>
            handleModifyRevOpen({
              res_id,
              st_id,
              st_img,
              st_name,
              st_city,
              check_in,
              check_out,
              rev,
            })
          }
        />
      ) : (
        <MyRevWriteReviewBtn
          handleWriteRevOpen={() =>
            handleWriteRevOpen({
              res_id,
              st_id,
              st_img,
              st_name,
              st_city,
              check_in,
              check_out,
              rev,
            })
          }
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 46.25rem;
  height: 16.5rem;
  flex-shrink: 0;

  border-radius: 1.25rem;
  border: 1px solid rgba(172, 172, 172, 1);
  background: var(--AGODA-White, #fff);

  position: relative;
`;

const BookNumberFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  gap: 1.5rem;

  top: 1.5rem;
  left: 2.5rem;

  position: absolute;
`;

const BookNumber = styled.h1`
  ${({ theme }) => theme.fonts.title.lg};
`;

const CheckInOutContainer = styled.div`
  display: flex;
  top: 6.31rem;
  left: 16.62rem;

  gap: 6.37rem;
  position: absolute;
`;

const CheckInOutFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.37rem;
`;

const HotelName = styled(CheckInOutFrame)`
  display: flex;
  flex-direction: column;
  gap: 0.37rem;

  position: absolute;
  top: 12.37rem;
  left: 2.87rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.title.sm};
`;

const Date = styled.p`
  ${({ theme }) => theme.fonts.caption.sm};
`;
