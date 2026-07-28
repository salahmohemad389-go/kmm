import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { AddPointsRequest } from '../api/dto';

export const pointsService = {
  async add(amount: number, reasonEn?: string, reasonAr?: string): Promise<{ points: number }> {
    return api.post<{ points: number }>(endpoints.points.add, {
      amount,
      reasonEn,
      reasonAr,
    } satisfies AddPointsRequest);
  },
};
