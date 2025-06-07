import type { handleModalCloseType } from '@src/myrev/types/modalFnTypes';
import ModalLayout from '../../../common/layout/ModalLayout';
import ModalLeft from '../myRev02Modal/ModalLeft';
import MyReviewRight from './MyReviewRight';

interface MyRevSeeModalProps {
  handleModalClose: handleModalCloseType;
  handleEditRevOpen: () => void;
}

export default function MyRevSeeModal({
  handleModalClose,
  handleEditRevOpen,
}: MyRevSeeModalProps) {
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <ModalLeft />
      <MyReviewRight
        handleEditRevOpen={handleEditRevOpen}
        handleModalClose={handleModalClose}
      />
    </ModalLayout>
  );
}
