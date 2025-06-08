import styled from 'styled-components';
import Stars from '@stInfo/assets/svgs/reviewstars.svg?react';

interface HeaderProps {
  username: string;
  date: string;
  score: number;
}

export default function ReivewCardHeader() {
  return (
    <Container>
      <HeaderFrame>
        <UserName>황혜연</UserName>
        <Date>2025.03.15 작성</Date>
      </HeaderFrame>
      <RateFrame>
        <RateStar />
        <Rate>8.2점</Rate>
      </RateFrame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  width: 33.5rem;
  height: 3.19rem;
`;

const UserName = styled.h1`
  ${({ theme }) => theme.fonts.headline.sm};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const HeaderFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const RateFrame = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const RateStar = styled(Stars)`
  width: 6.1875rem;
  height: 1.0625rem;
`;

const Rate = styled.p`
  ${({ theme }) => theme.fonts.caption.lg};
`;

const Date = styled.p`
  ${({ theme }) => theme.fonts.caption.lg};
  color: ${({ theme }) => theme.colors.gray300};
`;
