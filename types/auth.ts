export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  rol: {
    id: number;
  };
}

export interface AuthResponse {
  message: string;
  data: {
    token: string;
    role: string;
    idUser: number;
  };
  error: boolean;
  status: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
