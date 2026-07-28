import { api } from '../lib/apiClient';
import { storage } from '../lib/storage';
import { endpoints } from '../api/endpoints';
import type { LoginRequest, LoginResponse, HealthCheckResponse } from '../api/dto';
import type { UserAccount } from '../types';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>(endpoints.auth.login, {
      email,
      password,
    } satisfies LoginRequest);
    storage.set(AUTH_TOKEN_KEY, res.token);
    storage.set(AUTH_USER_KEY, res.user);
    return res;
  },

  async logout(): Promise<void> {
    try {
      await api.post(endpoints.auth.logout);
    } catch {
      // proceed with local cleanup even if API call fails
    }
    storage.remove(AUTH_TOKEN_KEY);
    storage.remove(AUTH_USER_KEY);
    storage.remove('sub_status');
  },

  getToken(): string | null {
    return storage.get<string | null>(AUTH_TOKEN_KEY, null);
  },

  getStoredUser(): UserAccount | null {
    return storage.get<UserAccount | null>(AUTH_USER_KEY, null);
  },

  isAuthenticated(): boolean {
    return authService.getToken() !== null;
  },

  async healthCheck(): Promise<HealthCheckResponse> {
    return api.get<HealthCheckResponse>(endpoints.health);
  },
};
