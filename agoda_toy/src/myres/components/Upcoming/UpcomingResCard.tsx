import styled from 'styled-components';
import UpcomingResInfo from './UpcomingResInfo';
import UpcomingResThumb from './UpcomingResThumb';
import StayPic1 from '@stList/assets/imgs/img_card1.png';
import type { Reservation } from '@src/api/res';

interface UpcomingResCardProps {
  reservation: Reservation;
}

export default function UpcomingResCard({ reservation }: UpcomingResCardProps) {
  const {
    res_id,
    st_name,
    st_city,
    check_in,
    check_out,
  } = reservation;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${dateStr.replace(/-/g, '.')}(${dayOfWeek})`;
  };

  return (
    <Container>
      <UpcomingResInfo
        resNum={Number(res_id)}
        stayName={st_name}
        stayLocation={st_city}
        checkinDate={formatDate(check_in)}
        checkoutDate={formatDate(check_out)}
      />
      <UpcomingResThumb imageUrl={StayPic1} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
