import { client } from './api';

// 예약 생성
export interface CreateReservationRequest {
    st_id: number;
    room_id: number;
    guest_first: string;
    guest_last: string;
    guest_email: string;
    guest_phone: string;
    guest_request: string;
    install_month: number;
    checkin_at: string; 
    checkout_at: string; 
}

export interface CreateReservationResponse {
    res_id: number;
    st_id: number;
    room_id: number;
    guest_first: string;
    guest_last: string;
    guest_email: string;
    guest_phone: string;
    guest_request: string;
    install_month: number;
    created_at: string;
    checkin_at: string;
    checkout_at: string;
}

export const createReservation = async (
    data: CreateReservationRequest
    ): Promise<CreateReservationResponse> => {
    try {
        const response = await client.post<CreateReservationResponse>('/reserv', data);
        return response.data;
    } catch (error) {
        console.error('예약 생성 실패:', error);
        throw error;
    }
};

// 나의 예약 조회
export interface Reservation {
    res_id: string;
    st_id: number;
    st_name: string;
    st_city: string;
    check_in: string;  
    check_out: string;
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

// export const getResById = async (resId: string | number): Promise<Reservation | null> => {
//     try {
//         const resList = await getMyResList();
//         const allReservations = [
//             ...resList.upcoming_reservations,
//             ...resList.completed_reservations,
//         ];
//         return allReservations.find((res) => res.res_id === String(resId)) || null;
//     } catch (error) {
//         console.error('단일 예약 조회 실패:', error);
//         throw error;
//     }
// };
