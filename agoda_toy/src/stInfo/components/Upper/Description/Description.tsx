import HotelName from './HotelName';
import Script from './Script';
import Adv from './Adv';
import styled from 'styled-components';

interface DescriptionProps {
  name: string;
  address: string;
  rating: number;
  reviewCnt: number;
  detail: string;
}

export default function Description({
  name,
  address,
  rating,
  reviewCnt,
  detail,
}: DescriptionProps) {
  return (
    <Container>
      <HotelName
        name={name}
        address={address}
        rating={rating}
        reviewCnt={reviewCnt}
      />
      <Script detail={detail}/>
      <Adv />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
