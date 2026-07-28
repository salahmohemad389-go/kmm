import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { SuccessStory } from '../types';
import type {
  CreateSuccessStoryRequest,
  UpdateSuccessStoryRequest,
} from '../api/dto';

export const storyService = {
  async getAll(): Promise<SuccessStory[]> {
    return api.get<SuccessStory[]>(endpoints.stories.list, { cacheTtl: 60_000 });
  },

  async create(data: CreateSuccessStoryRequest): Promise<SuccessStory> {
    return api.post<SuccessStory>(endpoints.stories.list, data);
  },

  async update(id: string, data: UpdateSuccessStoryRequest): Promise<SuccessStory> {
    return api.put<SuccessStory>(endpoints.stories.item(id), data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(endpoints.stories.item(id));
  },
};
