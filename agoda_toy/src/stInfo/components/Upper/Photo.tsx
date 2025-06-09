import styled, { css } from 'styled-components';
import RightImg from '@stInfo/assets/imgs/img_picture_right.png';
import LeftImg1 from '@stInfo/assets/imgs/img_picture_left1.png';
import LeftImg2 from '@stInfo/assets/imgs/img_picture_left2.png';
import LeftImg3 from '@stInfo/assets/imgs/img_picture_left3.png';
import LeftImg4 from '@stInfo/assets/imgs/img_picture_left4.png';

interface PhotoProps {
  stayImgUrls: string[];
}

export default function Photo({ stayImgUrls }: PhotoProps) {
  const bigImage = stayImgUrls[0]; // 첫 번째는 큰 이미지
  const smallImages = stayImgUrls.slice(1, 5); // 그 다음 4개만 작은 이미지

  return (
    <Container>
      {bigImage && <BigImg style={{ backgroundImage: `url(${bigImage})` }} />}
      <LeftContainer>
        {smallImages.map((img, idx) => (
          <ImageBox key={idx} bgurl={img} />
        ))}
      </LeftContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 87.5rem;
  height: 27.8125rem;
  padding: 0.625rem 0.75rem;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-bottom: 1.38rem;
`;

const BigImg = styled.div`
  width: 43.5rem;
  height: 27.8125rem;
  border-radius: 0.5rem;
  background: url(${RightImg}) lightgray 50% / cover no-repeat;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 43.5rem;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.4375rem 0.5rem;
  flex-wrap: wrap;
`;

const SmallImgWrapper = (imageUrl: string) => css`
  width: 21.5rem;
  height: 13.6875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: url(${imageUrl}) lightgray 50% / cover no-repeat;
`;

const ImageBox = styled.div<{ bgurl: string }>`
  ${({ bgurl }) => SmallImgWrapper(bgurl)}
`;
