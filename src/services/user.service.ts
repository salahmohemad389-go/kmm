import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { UserAccount, SubscriptionStatus } from '../types';

export const userService = {
  async getProfile(): Promise<UserAccount> {
    return api.get<UserAccount>(endpoints.users.me, { cacheTtl: 30_000 });
  },

  async updateProfile(updates: Partial<UserAccount>): Promise<UserAccount> {
    return api.patch<UserAccount>(endpoints.users.update, updates);
  },

  async updateSubscriptionStatus(status: SubscriptionStatus): Promise<UserAccount> {
    return api.patch<UserAccount>(endpoints.users.update, { subscriptionStatus: status });
  },
};
