import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Reservation {
  res_id: number;
  st_id: number;
  st_img: string | null;
  st_name: string;
  st_city: string;
  check_in: string;
  check_out: string;
  rev: boolean | null;
  rev_id: number | null;
}

interface ReservState {
  stay: Reservation | null;
  selectStay: (newStay: Reservation) => void;
}

export const useReservStore = create<ReservState>()(
  persist(
    devtools((set) => ({
      stay: null,
      selectStay: (newStay: Reservation) => set(() => ({ stay: newStay })),
    })),

    {
      name: 'reservStore',
    }
  )
);

export interface ReviewData {
  review: Review;
  reservation: Reservation;
}

export interface Review {
  revId: number;
  resId: number;
  addrRating: number;
  saniRating: number;
  servRating: number;
  createdAt: string;
  updatedAt: string;
  reviewTxt: string;
  revImgUrls: string[];
}

export interface ReviewReserv {
  res_id: number;
  st_id: number;
  st_name: string;
  st_city: string;
  checkIn: string;
  checkOut: string;
}

interface ReviewState {
  review: Review;
  selectReview: (myReivew: Review) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    devtools((set) => ({
      review: null,
      selectReview: (myReivew: Review) => set(() => ({ review: myReivew })),
    })),

    {
      name: 'reviewStore',
    }
  )
);
