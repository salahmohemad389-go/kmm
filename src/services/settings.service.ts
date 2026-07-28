import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { SystemSettings, TabType } from '../types';
import type { UpdateSettingsRequest } from '../api/dto';

export const settingsService = {
  async get(): Promise<SystemSettings> {
    return api.get<SystemSettings>(endpoints.settings.get, { cacheTtl: 120_000 });
  },

  async update(data: UpdateSettingsRequest): Promise<SystemSettings> {
    return api.put<SystemSettings>(endpoints.settings.update, data);
  },

  async toggleTabVisibility(tab: TabType): Promise<SystemSettings> {
    // Client-side optimistic toggle — persists via update
    const current = await settingsService.get();
    const updated = {
      ...current,
      visibleTabs: {
        ...current.visibleTabs,
        [tab]: !current.visibleTabs[tab],
      },
    };
    return settingsService.update({ visibleTabs: updated.visibleTabs });
  },
};
