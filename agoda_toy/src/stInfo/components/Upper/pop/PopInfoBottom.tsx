import styled from 'styled-components';
import BarGraph from './BarGraph';

interface PopInfoBottomProps {
  addrRating: number;
  saniRating: number;
  servRating: number;
}

export default function PopInfoBottom({
  addrRating,
  saniRating,
  servRating,
}: PopInfoBottomProps) {
  return (
    <Container>
      <TitleBar>
        <Title>숙소청결도 {saniRating.toFixed(1)}</Title>
        <BarGraph value={saniRating * 10} />
      </TitleBar>
      <TitleBar>
        <Title>서비스 {servRating.toFixed(1)}</Title>
        <BarGraph value={servRating * 10} />
      </TitleBar>
      <TitleBar>
        <Title>위치 {addrRating.toFixed(1)}</Title>
        <BarGraph value={addrRating * 10} />
      </TitleBar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
  width: 17.9rem;
  height: 9.13rem;
`;

const Title = styled.p`
  display: flex;
  padding: 0.5rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  ${({ theme }) => theme.fonts.caption.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
