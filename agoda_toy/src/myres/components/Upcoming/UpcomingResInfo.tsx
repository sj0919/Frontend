import styled from 'styled-components';

interface UpcomingResInfoProps {
  resNum: number;
  stayName: string;
  stayLocation: string;
  checkinDate: string;
  checkoutDate: string;
}

export default function UpcomingResInfo({
  resNum,
  stayName,
  checkinDate,
  checkoutDate,
  stayLocation,
}: UpcomingResInfoProps) {
  return (
    <Container>
      <TitleWrapper>
        <Title>곧 시작될 예약</Title>
        <SemiTitle>{resNum}(예약 번호)</SemiTitle>
        <SemiTitle>{stayName}</SemiTitle>
      </TitleWrapper>
      <TableWrapper>
        <InfoFrame>
          <InfoHead>숙소</InfoHead>
          <InfoBody>{stayLocation}</InfoBody>
        </InfoFrame>
        <InfoFrame>
          <InfoHead>체크인</InfoHead>
          <InfoBody>{checkinDate}</InfoBody>
        </InfoFrame>
        <InfoFrame>
          <InfoHead>체크 아웃</InfoHead>
          <InfoBody>{checkoutDate}</InfoBody>
        </InfoFrame>
      </TableWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.69rem;

  box-sizing: border-box;
  width: 46.25rem;
  height: 16.5rem;
  padding-inline-start: 2.5rem;

  border-radius: 1.25rem;
  border: 1px solid #acacac;
  background: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem;
`;

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.title.lg};
`;

const SemiTitle = styled.p`
  font: ${({ theme }) => theme.fonts.title.md};
`;

const TableWrapper = styled.div`
  display: flex;
  gap: 12.69rem;
`;

const InfoFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.69rem;
`;

const InfoHead = styled.p`
  font: ${({ theme }) => theme.fonts.caption.md};
`;
const InfoBody = styled.p`
  font: ${({ theme }) => theme.fonts.caption.md};
`;
