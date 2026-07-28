import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { ProgressLog } from '../types';
import type { CreateProgressLogRequest } from '../api/dto';

export const progressService = {
  async getLogs(): Promise<ProgressLog[]> {
    return api.get<ProgressLog[]>(endpoints.progress.logs, { cacheTtl: 30_000 });
  },

  async createLog(data: CreateProgressLogRequest): Promise<ProgressLog> {
    return api.post<ProgressLog>(endpoints.progress.logs, data);
  },

  async deleteLog(id: string): Promise<void> {
    await api.delete(endpoints.progress.log(id));
  },
};
