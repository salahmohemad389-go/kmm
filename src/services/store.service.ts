import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { StoreCategory, StoreItem } from '../types';
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateStoreItemRequest,
  UpdateStoreItemRequest,
} from '../api/dto';

export const storeService = {
  // ─── Categories ───────────────────────────────────────────────────────────
  async getCategories(): Promise<StoreCategory[]> {
    return api.get<StoreCategory[]>(endpoints.store.categories, { cacheTtl: 60_000 });
  },

  async createCategory(data: CreateCategoryRequest): Promise<StoreCategory> {
    return api.post<StoreCategory>(endpoints.store.categories, data);
  },

  async updateCategory(id: string, data: UpdateCategoryRequest): Promise<StoreCategory> {
    return api.put<StoreCategory>(endpoints.store.category(id), data);
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(endpoints.store.category(id));
  },

  // ─── Items ────────────────────────────────────────────────────────────────
  async getItems(): Promise<StoreItem[]> {
    return api.get<StoreItem[]>(endpoints.store.items, { cacheTtl: 60_000 });
  },

  async createItem(data: CreateStoreItemRequest): Promise<StoreItem> {
    return api.post<StoreItem>(endpoints.store.items, data);
  },

  async updateItem(id: string, data: UpdateStoreItemRequest): Promise<StoreItem> {
    return api.put<StoreItem>(endpoints.store.item(id), data);
  },

  async deleteItem(id: string): Promise<void> {
    await api.delete(endpoints.store.item(id));
  },
};
