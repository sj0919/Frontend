import styled from 'styled-components';

interface ReviewImgProps {
  images: string[];
}

export default function ReviewCardImg({ images }: ReviewImgProps) {
  return (
    <Container>
      {images.map((url, index) => (
        <ImgFrame key={`reviewImage-${index}`} src={url} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1.63rem;
  width: 33.5rem;
  height: 9.9375rem;

  margin-top: auto;
`;

const ImgFrame = styled.img`
  width: 10.125rem;
  height: 9.9375rem;
  flex-shrink: 0;

  border-radius: 0.5rem;
  background: var(--AGODA-Gray100, #f3f4f6);
  object-fit: cover;
`;
