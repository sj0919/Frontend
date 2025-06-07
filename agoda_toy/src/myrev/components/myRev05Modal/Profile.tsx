import Rate from '@src/stInfo/components/common/Rate';
import styled from 'styled-components';
import ModifyBtn from './ModifyBtn';
import { useReviewStore, type Review } from '@src/store/useReviewStore';

interface ProfileProps {
  handleEditRevOpen: () => void;
  handleModalClose: () => void;
}

export default function Profile({
  handleEditRevOpen,
  handleModalClose,
}: ProfileProps) {
  const storedUser = localStorage.getItem('user');
  const profile = storedUser
    ? JSON.parse(storedUser)
    : { username: null, profile_img: '' };

  const review = useReviewStore((state) => state.review);

  function getAverageRating(review: Review): number {
    const { addrRating, saniRating, servRating } = review;
    const average = (addrRating + saniRating + servRating) / 3;
    return Number(average.toFixed(1)); // 소수점 1자리까지
  }

  const aveRate = getAverageRating(review);

  const handleEditModal = () => {
    handleModalClose();
    handleEditRevOpen();
  };

  return (
    <Container>
      <ImgFrame>
        <Img src={profile.profile_img} />
        <Frame>
          <Name>{profile.username}</Name>
          <WhenWrite>{review?.createdAt.split('T')[0]} 작성</WhenWrite>
        </Frame>
      </ImgFrame>

      <RateFrame>
        <p>평점</p>
        <RateFrame2>
          <Rate /> <p>{aveRate}점</p>
        </RateFrame2>
      </RateFrame>
      <div onClick={handleEditModal}>
        <ModifyBtn />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
`;

const ImgFrame = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const Img = styled.img`
  display: flex;
  width: 4.375rem;
  height: 4.375rem;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 2.1875rem;
  background: var(--AGODA-Primary, #006a71);
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.37rem;
`;

const Name = styled.h1`
  ${({ theme }) => theme.fonts.headline.sm};
`;

const WhenWrite = styled.p`
  ${({ theme }) => theme.fonts.body.md};
`;

const RateFrame = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-left: 0.44rem;
`;

const RateFrame2 = styled.div`
  display: flex;
  gap: 0.5rem;
`;
