import styled from 'styled-components';
import Stars from '@stInfo/assets/svgs/reviewstars.svg?react';
import StarFilled from '../../../myrev/assets/star_filled.svg?react';
import StarWhite from '../../../myrev/assets/star_white.svg?react';

interface ReviewHeaderProps {
  name: string;
  createdAt: string;
  rate: number;
}

export default function ReivewCardHeader({
  name,
  createdAt,
  rate,
}: ReviewHeaderProps) {
  return (
    <Container>
      <HeaderFrame>
        <UserName>{name}</UserName>
        <Date>{createdAt} 작성</Date>
      </HeaderFrame>
      <RateFrame>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((num) =>
            num <= rate ? (
              <StarIconFilled key={num} />
            ) : (
              <StarIconWhite key={num} />
            )
          )}
        </StarContainer>
        <Rate>{rate}점</Rate>
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
  align-items: center;
  gap: 0.5rem;
`;

const Rate = styled.p`
  ${({ theme }) => theme.fonts.caption.lg};
`;

const Date = styled.p`
  ${({ theme }) => theme.fonts.caption.lg};
  color: ${({ theme }) => theme.colors.gray300};
`;

const StarContainer = styled.div`
  display: flex;
  width: 6.1875rem;
  height: 1.125rem;
  justify-content: space-between;
  align-items: flex-start;
`;

const StarIconFilled = styled(StarFilled)`
  width: 1.115rem;
  height: 1.115rem;
  cursor: pointer;
`;
const StarIconWhite = styled(StarWhite)`
  width: 1.115rem;
  height: 1.115rem;
  cursor: pointer;
`;
