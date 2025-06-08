import { client } from './api';

// 나의 예약 조회
export interface Reservation {
    res_id: string;
    st_id: number;
    st_name: string;
    st_city: string;
    check_in: string;   // YYYY-MM-DD
    check_out: string;  // YYYY-MM-DD
}

export interface ReservationResponse {
    upcoming_reservations: Reservation[];
    completed_reservations: Reservation[];
}

export const getMyResList = async (): Promise<ReservationResponse> => {
    try {
        const response = await client.get<ReservationResponse>('/reserv');
        return response.data;
    } catch (error) {
        console.error('내 예약 내역 조회 실패:', error);
        throw error;
    }
};