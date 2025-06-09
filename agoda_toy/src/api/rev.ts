import { client } from './api';

export const getMyReservation = async () => {
  try {
    const res = await client.get(`/reserv/rev`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

interface ReviewData {
  res_id: number;
  addr_rating: number;
  sani_rating: number;
  serv_rating: number;
  review_txt: string;
}

export const postReview = async (data: ReviewData, images: File[]) => {
  try {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    images.forEach((img) => {
      formData.append('images', img);
    });

    const res = await client.post('rev', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const patchReview = async (data: ReviewData, images: File[]) => {
  try {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    images.forEach((img) => {
      formData.append('images', img);
    });

    const res = await client.patch(`rev/${data.res_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const getReview = async (revId: number) => {
  try {
    const res = await client.get(`/rev/${revId}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getReviewList = async (stayId: number) => {
  try {
    const res = await client.get(`/stays/${stayId}/reviews`);
    return res.data;
  } catch (e) {
    throw e;
  }
};
