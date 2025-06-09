import styled from 'styled-components';

interface ReviewContentProps {
  text: string;
}

export default function ReviewCardContent({ text }: ReviewContentProps) {
  return (
    <Container>
      <Script>{text}</Script>
      {/* <More>더보기</More> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const Script = styled.p`
  ${({ theme }) => theme.fonts.body.md};
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black};
`;
const More = styled.p`
  ${({ theme }) => theme.fonts.headline.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;
