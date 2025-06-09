import ModalLeft from './ModalLeft';
import ModalRight from './ModalRight';
import ModalLayout from '../../../common/layout/ModalLayout';
import type { handleModalCloseType } from '@src/myrev/types/modalFnTypes';
interface MyRevModalProps {
  handleModalClose: handleModalCloseType;
}

export default function MyRevModal({ handleModalClose }: MyRevModalProps) {
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <ModalLeft />
      <ModalRight handleModalClose={handleModalClose} />
    </ModalLayout>
  );
}
