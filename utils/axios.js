import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Axios 인스턴스 설정
const instance = axios.create({
  baseURL: apiUrl,  // 기본 URL 설정
  timeout: 10000,   // 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
    // 여기에 공통 헤더나 토큰 설정 가능
  },
});

// 요청 인터셉터 설정 (필요 시)
instance.interceptors.request.use(
  (config) => {
    // 예: 인증 토큰을 요청 헤더에 추가
    const token = localStorage.getItem('token'); // 브라우저에서 가져오는 예시
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (필요 시)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response && error.response.status === 401) {
      // 예: 인증 오류 발생 시 처리
    }
    return Promise.reject(error);
  }
);

export default instance;