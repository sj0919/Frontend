import { client } from './api';

// 전체 숙박 리스트
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


// 숙박 상세 페이지
export interface Room {
    id: number;
    name: string;
    bed: string;
    roomPrice: number;
    roomSalePrice: number;
    roomImgUrl: string;
}

export interface ReviewSummary {
    rating: number;
    reviewCnt: number;
    addrRating: number;
    saniRating: number;
    servRating: number;
}

export interface StayDetail {
    id: number;
    name: string;
    detail: string;
    address: string;
    salePrice: number;
    tags: string[];
    stayImgUrls: string[];
    rooms: Room[];
    review: ReviewSummary;
}

export const getStayDetail = async (stayId: number): Promise<StayDetail> => {
    try {
        const response = await client.get<StayDetail>(`/stays/${stayId}`);
        return response.data;
    } catch (error) {
        console.error(`상세 조회 실패 (ID: ${stayId})`, error);
        throw error;
    }
};