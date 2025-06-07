import styled from 'styled-components';

interface ModalTextProps {
  review_text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalReview({ review_text, setText }: ModalTextProps) {
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <ReviewQuestion>자세한 후기를 작성해주세요.</ReviewQuestion>
      <ReviewContainer>
        <ReviewFrame
          value={review_text}
          onChange={(e) => onChangeText(e)}
          placeholder="위치/부대시설/직원 태도 등에 대한 경험을 적어주세요."
        />
      </ReviewContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.75rem;
`;

const ReviewQuestion = styled.p`
  ${({ theme }) => theme.fonts.body.lg};
`;

const ReviewContainer = styled.div`
  width: 44.375rem;
  height: 15.375rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 1.25rem;
  border: 0.3px solid var(--AGODA-Gray600, #858c9d);
`;

const ReviewFrame = styled.textarea`
  width: 95%;
  height: 90%;
  flex-shrink: 0;
  border: none;

  ::placeholder {
    ${({ theme }) => theme.fonts.body.md};
    color: #adadad;
  }

  ${({ theme }) => theme.fonts.body.md};
  color: ${({ theme }) => theme.colors.black};

  resize: none;
  outline: none;
  border: none;
`;
