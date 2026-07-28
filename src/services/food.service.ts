import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { FoodItem } from '../types';
import type { CreateFoodRequest, UpdateFoodRequest } from '../api/dto';

export const foodService = {
  async getAll(): Promise<FoodItem[]> {
    return api.get<FoodItem[]>(endpoints.foods.list, { cacheTtl: 120_000 });
  },

  async create(data: CreateFoodRequest): Promise<FoodItem> {
    return api.post<FoodItem>(endpoints.foods.list, data);
  },

  async update(id: string, data: UpdateFoodRequest): Promise<FoodItem> {
    return api.put<FoodItem>(endpoints.foods.item(id), data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(endpoints.foods.item(id));
  },
};
