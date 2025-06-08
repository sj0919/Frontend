import axios from 'axios';

// 1. 인스턴스 생성 시 Authorization 헤더 제거
const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // ✅ Content-Type만 설정
  },
  withCredentials: true,
});

// 2. 요청 인터셉터 (동적 헤더 설정)
client.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // ✅ 항상 최신 토큰 + Bearer 접두사
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('[인터셉터] 헤더에 토큰 추가:', accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (토큰 갱신 로직)
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status, data } = error.response || {};

    // 4. 토큰 만료 조건 확인
    if (
      status === 401 &&
      data.error === 'Token Expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log('[인터셉터] 토큰 만료 → 재발급 시도');

      try {
        // 5. client 인스턴스로 재발급 요청
        const response = await client.post('/auth/reissue');

        // 6. 새 토큰 저장
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('access_token', newAccessToken);
        console.log('[인터셉터] 새 토큰 발급:', newAccessToken);

        // 7. 헤더 업데이트 (Bearer 포함)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 8. 원본 요청 재시도
        return client(originalRequest);
      } catch (refreshError) {
        console.error('[인터셉터] 토큰 갱신 실패:', refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/main';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { client };
