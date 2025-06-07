import styled from 'styled-components';
import { WrapSvgIcon } from '@stInfo/styles/Svg';
import photoIcon from '../../assets/my_rev_icn_pic.svg?react';
import XButton from '../../assets/my_rev_x.svg?react';
import { useRef } from 'react';

interface ImageUploadProps {
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previews: string[];
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageUpload = ({
  imageFiles,
  setImageFiles,
  previews,
  setPreviews,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 3 - imageFiles.length); // 최대 3개 제한
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = '';
  };

  const handleDelete = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Container>
      <PreviewContainer>
        {previews.map((src, index) => (
          <PreviewWrapper key={index}>
            <Preview src={src} alt={`preview-${index}`} />
            <DeleteButton onClick={() => handleDelete(index)} />
          </PreviewWrapper>
        ))}
      </PreviewContainer>
      {imageFiles.length < 3 && (
        <>
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            ref={inputRef}
            onChange={handleAddImage}
          />
          <AddPhotoBtn onClick={() => inputRef.current?.click()}>
            <PhotoIconBtn />
            <ReviewQuestion>사진 첨부하기</ReviewQuestion>
          </AddPhotoBtn>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const PreviewWrapper = styled.div`
  width: 14.125rem;
  height: 11.4375rem;
  border-radius: 0.9375rem;
  background-color: #f3f4f6;

  position: relative;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  outline: none;
`;

const DeleteButton = styled(XButton)`
  position: absolute;
  top: 0.56rem;
  right: 0.56rem;
`;

const AddPhotoBtn = styled.button`
  all: unset;
  cursor: pointer;

  width: 44.375rem;
  height: 3rem;
  flex-shrink: 0;

  display: flex;
  gap: 0.6rem;

  justify-content: center;
  align-items: center;

  border-radius: 0.625rem;
  border: 0.3px solid #000;
`;

const PhotoIconBtn = WrapSvgIcon(photoIcon);

const ReviewQuestion = styled.p`
  ${({ theme }) => theme.fonts.body.lg};
`;
