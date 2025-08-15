export const API_CONFIG = {
  BASE_URL: 'https://eager-seas-cheer.loca.lt',
  ENDPOINTS: {
    LOGIN: '/api/auth',
    REGISTER: '/api/auth/register',
  },
  TIMEOUT: 10000, // 10 segundos
  // Headers adicionales para localtunnel
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
};

export const getFullUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Función de utilidad para hacer peticiones con headers apropiados para localtunnel
export const makeTunnelRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  console.log('🌐 Making request to:', url);
  console.log('📤 Request options:', JSON.stringify(options, null, 2));

  const defaultOptions: RequestInit = {
    headers: {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    },
    ...options,
  };

  console.log('📤 Final headers:', JSON.stringify(defaultOptions.headers, null, 2));

  try {
    const response = await fetch(url, defaultOptions);
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);
    
    // Si recibimos un error 403 o página de advertencia, intentar con bypass
    if (!response.ok && response.status === 403) {
      console.warn('⚠️ Tunnel access denied, retrying with bypass...');
      const bypassUrl = url.includes('?') ? `${url}&bypass=true` : `${url}?bypass=true`;
      console.log('🔄 Retry URL:', bypassUrl);
      return await fetch(bypassUrl, defaultOptions);
    }
    
    return response;
  } catch (error) {
    console.error('❌ Tunnel request failed:', error);
    throw error;
  }
};