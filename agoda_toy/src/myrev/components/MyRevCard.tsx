import MyRevCardText from './MyRevCardText';
import styled from 'styled-components';
import type { ReviewModalHandlers } from '../types/modalFnTypes';
import type { Reservation } from '@src/store/useReviewStore';

type MyRevCardProps = Reservation & ReviewModalHandlers;

export default function MyRevCard(props: MyRevCardProps) {
  return (
    <Container>
      <MyRevCardText {...props} />
      <MyRevCardImg src={props.st_img as string} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const MyRevCardImg = styled.img`
  width: 18.25rem;
  height: 16.5rem;
  flex-shrink: 0;

  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.gray300};
`;
