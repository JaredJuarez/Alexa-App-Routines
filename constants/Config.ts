export const API_CONFIG = {
  BASE_URL: 'https://357h315x-8081.usw3.devtunnels.ms',
  ENDPOINTS: {
    LOGIN: '/api/auth',
    REGISTER: '/api/auth/register',
  },
  TIMEOUT: 10000, // 10 segundos
};

export const getFullUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
