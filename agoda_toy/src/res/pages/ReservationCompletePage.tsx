import React from 'react';
import StepPageLayout from '../components/StepPageLayout';
import ReservationCompleteBox from '../components/ReservationCompleteBox';
import { useParams } from 'react-router-dom';

const ReservationCompletePage = () => {
  const { resId } = useParams<{ resId: string }>();

  return (
    <StepPageLayout currentStep={3}>
      <ReservationCompleteBox />
    </StepPageLayout>
  );
};

export default ReservationCompletePage;
