import ModalLayout from '../../../common/layout/ModalLayout';
import type { handleModalCloseType } from '@src/myrev/types/modalFnTypes';
import ModalLeft from '../myRev02Modal/ModalLeft';
import ModifyModalRight from './ModifyModalRight';

interface MyRevModifyModalProps {
  handleModalClose: handleModalCloseType;
}

export default function MyRevModifyModal({
  handleModalClose,
}: MyRevModifyModalProps) {
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <ModalLeft />
      <ModifyModalRight handleModalClose={handleModalClose} />
    </ModalLayout>
  );
}
