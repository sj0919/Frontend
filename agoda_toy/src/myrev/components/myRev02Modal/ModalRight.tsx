import ModalRate from './ModalRate';
import styled from 'styled-components';
import ModalReview from './ModalReview';
import { useEffect, useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { postReview } from '@src/api/rev';
import { useReservStore } from '@src/store/useReviewStore';
import type { ModalClose } from '@src/stInfo/types/modalClose';

export default function ModalRight({ handleModalClose }: ModalClose) {
  const stay = useReservStore((state) => state.stay);

  const [addr_rating, setAddr] = useState<number>(0);
  const [sani_rating, setSani] = useState<number>(0);
  const [serv_rating, setServ] = useState<number>(0);

  const [review_text, setReviewText] = useState<string>('');

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [isActive, setIsActive] = useState<boolean>(false);

  const RATE_QUESTIONS = [
    {
      question: '숙소의 위치가 만족스러우셨나요?',
      value: addr_rating,
      setter: setAddr,
    },
    {
      question: '숙소의 위생상태가 만족스러우셨나요?',
      value: sani_rating,
      setter: setSani,
    },
    {
      question: '직원의 서비스가 만족스러우셨나요?',
      value: serv_rating,
      setter: setServ,
    },
  ];

  useEffect(() => {
    if (
      addr_rating > 0 &&
      sani_rating > 0 &&
      serv_rating > 0 &&
      review_text.trim().length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [addr_rating, sani_rating, serv_rating, review_text, imageFiles]);

  const handleReviewPost = async () => {
    try {
      if (isActive && stay) {
        const data = {
          res_id: stay?.res_id,
          addr_rating: addr_rating,
          sani_rating: sani_rating,
          serv_rating: serv_rating,
          review_txt: review_text,
        };
        const res = await postReview(data, imageFiles);

        if (res.status === 200) {
          handleModalClose();
        } else {
          alert('리뷰 등록에 실패했습니다.');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <QuestionsContainer>
        {RATE_QUESTIONS.map(({ question, value, setter }) => (
          <ModalRate
            key={question}
            question={question}
            rating={value}
            setRating={setter}
          />
        ))}
      </QuestionsContainer>
      <ModalReview review_text={review_text} setText={setReviewText} />
      <ImageUpload
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        previews={previews}
        setPreviews={setPreviews}
      />
      <PostButton
        $isActive={isActive}
        disabled={!isActive}
        onClick={handleReviewPost}
      >
        리뷰 등록하기
      </PostButton>
    </Container>
  );
}

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  min-height: 0;

  overflow-y: auto;
`;

const PostButton = styled.button`
  display: flex;
  width: 9.5rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  background-color: ${({ $isActive }) => ($isActive ? '#006A71' : '#55A3B5')};

  margin-left: auto;
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.fonts.title.md};
  color: ${({ theme }) => theme.colors.white};
`;
