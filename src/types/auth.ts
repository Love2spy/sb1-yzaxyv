export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  company: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}