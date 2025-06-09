import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useReviewStore } from '@src/store/useReviewStore';
import ModalReview from '../myRev02Modal/ModalReview';
import { ImageUpload } from '../myRev02Modal/ImageUpload';
import ModalRate from '../myRev02Modal/ModalRate';
import { patchReview } from '@src/api/rev';
import type { ModalClose } from '@src/stInfo/types/modalClose';

export default function ModifyModalRight({ handleModalClose }: ModalClose) {
  const review = useReviewStore((state) => state.review);

  const [addr_rating, setAddr] = useState<number>(review.addrRating);
  const [sani_rating, setSani] = useState<number>(review.saniRating);
  const [serv_rating, setServ] = useState<number>(review.servRating);

  const [review_text, setReviewText] = useState<string>(review.reviewTxt);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(review.revImgUrls);

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

  const handleReviewPatch = async () => {
    try {
      if (isActive && review) {
        const data = {
          res_id: review?.revId,
          addr_rating: addr_rating,
          sani_rating: sani_rating,
          serv_rating: serv_rating,
          review_txt: review_text,
        };
        const res = await patchReview(data, imageFiles);

        if (res.status === 200) {
          alert('리뷰가 수정되었습니다.');
          handleModalClose();
          window.location.reload();
        } else {
          alert('리뷰 수정에 실패했습니다.');
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
        onClick={handleReviewPatch}
      >
        리뷰 수정하기
      </PostButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.88rem;

  overflow-y: scroll;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
