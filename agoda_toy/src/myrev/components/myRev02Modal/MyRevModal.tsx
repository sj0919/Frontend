import ModalLeft from './ModalLeft';
import ModalRight from './ModalRight';
import ModalLayout from '../../../common/layout/ModalLayout';
import type { handleModalCloseType } from '@src/myrev/types/modalFnTypes';

export default function MyRevModal({ handleModalClose }: handleModalCloseType) {
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <ModalLeft />
      <ModalRight handleModalClose={handleModalClose} />
    </ModalLayout>
  );
}
