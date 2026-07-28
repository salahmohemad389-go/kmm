import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { SubscriptionPlan } from '../types';
import type {
  CreateSubscriptionPlanRequest,
  UpdateSubscriptionPlanRequest,
} from '../api/dto';

export const subscriptionService = {
  async getPlans(): Promise<SubscriptionPlan[]> {
    return api.get<SubscriptionPlan[]>(endpoints.subscriptions.plans, { cacheTtl: 120_000 });
  },

  async createPlan(data: CreateSubscriptionPlanRequest): Promise<SubscriptionPlan> {
    return api.post<SubscriptionPlan>(endpoints.subscriptions.plans, data);
  },

  async updatePlan(id: string, data: UpdateSubscriptionPlanRequest): Promise<SubscriptionPlan> {
    return api.put<SubscriptionPlan>(endpoints.subscriptions.plan(id), data);
  },

  async deletePlan(id: string): Promise<void> {
    await api.delete(endpoints.subscriptions.plan(id));
  },
};
