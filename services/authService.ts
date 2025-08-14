import { API_CONFIG, getFullUrl } from '../constants/Config';
import { ApiError, AuthResponse, LoginData, RegisterData } from '../types/auth';
import { StorageService } from './storageService';

class AuthService {
  private async makeRequest(
    endpoint: string, 
    method: 'GET' | 'POST', 
    data?: any
  ): Promise<AuthResponse> {
    try {
      const url = getFullUrl(endpoint);
      
      // Crear AbortController para timeout manual
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      // Limpiar el timeout si la request se completó
      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          message: responseData.message || 'Error en la solicitud',
          status: response.status,
        } as ApiError;
      }

      // Verificar si la respuesta tiene la estructura esperada
      if (responseData.error === false && responseData.data) {
        return responseData;
      } else if (responseData.error === true) {
        throw {
          message: responseData.message || 'Error en la respuesta del servidor',
          status: response.status,
        } as ApiError;
      }

      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            message: 'Tiempo de espera agotado. Verifica tu conexión.',
            status: 408,
          } as ApiError;
        }
        throw {
          message: error.message || 'Error de conexión',
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await this.makeRequest(API_CONFIG.ENDPOINTS.LOGIN, 'POST', loginData);
    
    console.log('Login response:', JSON.stringify(response, null, 2));
    
    // Guardar token, rol y userId en almacenamiento seguro
    if (response.data && response.data.token && response.data.idUser) {
      await StorageService.saveToken(response.data.token);
      await StorageService.saveRole(response.data.role);
      await StorageService.saveUserId(response.data.idUser);
      console.log('User data saved successfully');
    } else {
      console.log('Failed to save user data - missing fields:', {
        hasData: !!response.data,
        hasToken: !!(response.data && response.data.token),
        hasIdUser: !!(response.data && response.data.idUser)
      });
    }
    
    return response;
  }

  async register(registerData: RegisterData): Promise<AuthResponse> {
    return this.makeRequest(API_CONFIG.ENDPOINTS.REGISTER, 'POST', registerData);
  }

  async logout(): Promise<void> {
    await StorageService.clearAll();
  }

  async isAuthenticated(): Promise<boolean> {
    const userId = await StorageService.getUserId();
    return userId !== null;
  }

  async getToken(): Promise<string | null> {
    return await StorageService.getToken();
  }

  async getRole(): Promise<string | null> {
    return await StorageService.getRole();
  }

  async getUserId(): Promise<number | null> {
    return await StorageService.getUserId();
  }
}

export const authService = new AuthService();
