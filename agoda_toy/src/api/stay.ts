import { client } from './api';

export interface Stay {
    id: number;
    name: string;
    address: string;
    rating: number;
    reviewCnt: number;
    price: number;
    salePrice: number;
    totalPrice: number;
    tags: string[];
    mainImageUrl: string;
}

export interface StayListParams {
    city: string;
    checkIn: string;
    checkOut: string;
}

export const getStayList = async (
    params: StayListParams
): Promise<Stay[]> => {
    try {
        const response = await client.get<{ stays: Stay[] }>('/stays', {
        params,
        });
        return response.data.stays;
    } catch (error) {
        console.error('stay list 불러오기 실패', error);
        throw error;
    }
};
