import { client } from './api';
import axios from 'axios';

export const postLogout = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    console.log('accessToken', accessToken);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/logout`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      return true;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    throw err;
  }
};
