import type { StayDetail } from '@src/api/stay';

export type MiddleProps = {
  stay: StayDetail;
  handleModalOpen: () => void;
};
