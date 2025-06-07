import React from 'react';
import Profile from './Profile';
import ReviewPics from './ReviewPics';
import Review from './Review';
import styled from 'styled-components';
import type { handleModalCloseType } from '@src/myrev/types/modalFnTypes';

interface MyReviewRightProps {
  handleEditRevOpen: () => void;
  handleModalClose: handleModalCloseType;
}

export default function MyReviewRight({
  handleEditRevOpen,
  handleModalClose,
}: MyReviewRightProps) {
  return (
    <Container>
      <Profile
        handleEditRevOpen={handleEditRevOpen}
        handleModalClose={handleModalClose}
      />
      <ReviewPics />
      <Review />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
