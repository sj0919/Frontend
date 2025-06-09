import type { StayDetail, Room } from '@src/api/stay';

export type MiddleProps = {
  stay: StayDetail;
  handleModalOpen: (room: Room) => void;
};
