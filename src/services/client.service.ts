import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { ClientData } from '../types';
import type { UpdateClientRequest } from '../api/dto';

export const clientService = {
  async getAll(): Promise<ClientData[]> {
    return api.get<ClientData[]>(endpoints.clients.list, { cacheTtl: 30_000 });
  },

  async update(id: string, data: UpdateClientRequest): Promise<ClientData> {
    return api.put<ClientData>(endpoints.clients.item(id), data);
  },

  async getById(id: string): Promise<ClientData> {
    return api.get<ClientData>(endpoints.clients.item(id));
  },
};
