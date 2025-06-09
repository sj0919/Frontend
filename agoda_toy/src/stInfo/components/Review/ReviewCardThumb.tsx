import ThumbIcon from '@stInfo/assets/svgs/Thumbs up.svg?react';
import styled from 'styled-components';

export default function ReviewCardThumb() {
  return (
    <Container>
      <Thumb />
      <ThumbText>10 개</ThumbText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: auto;
`;

const Thumb = styled(ThumbIcon)`
  width: 1.875rem;
  height: 1.875rem;
  aspect-ratio: 1/1;
`;

const ThumbText = styled.p`
  ${({ theme }) => theme.fonts.headline.md};
  color: ${({ theme }) => theme.colors.gray600};
`;
