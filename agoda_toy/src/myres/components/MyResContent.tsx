import styled from 'styled-components';
import { useEffect, useState } from 'react';

import UpcomingResCard from './Upcoming/UpcomingResCard';
import MyResLists from './MyResLists';
import NoUpcomingResCard from './Upcoming/NoUpcomingResCard';
import { getMyResList, type Reservation } from '@src/api/res';

export default function MyResContent() {
  const [upcoming, setUpcoming] = useState<Reservation[]>([]);
  const [completed, setCompleted] = useState<Reservation[]>([]);

  useEffect(() => {
    getMyResList()
      .then(({ upcoming_reservations, completed_reservations }) => {
        setUpcoming(upcoming_reservations);
        setCompleted(completed_reservations);
      })
      .catch(console.error);
  }, []);

  const hasUpcoming = upcoming.length > 0;

  return (
    <Container>
      {hasUpcoming ? (
        <UpcomingResCard reservation={upcoming[0]} />
      ) : (
        <NoUpcomingResCard />
      )}
      <MyResLists showUpcoming={hasUpcoming} upcomingData={upcoming} completedData={completed} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.5rem;
`;
