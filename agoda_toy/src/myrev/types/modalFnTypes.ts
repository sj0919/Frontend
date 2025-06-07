import type { Reservation } from '@src/store/useReviewStore';

export type ModalHandler = (stay: Reservation) => void;

export interface ReviewModalHandlers {
  handleWriteRevOpen: ModalHandler;
  handleModifyRevOpen: ModalHandler;
  handleEditRevOpen: () => void;
}

export type handleWriteRevOpenType = {
  handleWriteRevOpen: () => void;
};

export type handleModifyRevOpenType = {
  handleModifyRevOpen: () => void;
};

export type handleEditRevOpenType = {
  handleModifyRevOpen: () => void;
};

export type MyRevCardText = handleModifyRevOpenType & handleWriteRevOpenType;

export type handleModalCloseType = () => void;
