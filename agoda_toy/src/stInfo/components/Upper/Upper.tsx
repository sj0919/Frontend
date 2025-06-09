import Search from './Search';
import Photo from './Photo';
import Description from './Description/Description';
import Pop from './pop/Pop';
import styled from 'styled-components';
import type { StayDetail } from '@src/api/stay';

interface UpperProps {
  stay: StayDetail;
}

export default function Upper({ stay }: UpperProps) {
  return (
    <>
      <Search />
      <Photo stayImgUrls={stay.stayImgUrls} />
      <DesPopContainer>
        <Description
          name={stay.name}
          address={stay.address}
          rating={stay.review.rating}
          reviewCnt={stay.review.reviewCnt}
          detail={stay.detail}
        />
        <Pop
          tags={stay.tags}
          salePrice={stay.salePrice}
          review={stay.review}
        />
      </DesPopContainer>
    </>
  );
}

const DesPopContainer = styled.div`
  display: flex;
  gap: 1.25rem;
`;
