import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { IntakeQuestionnaire } from '../types';

export const intakeService = {
  async submit(intake: IntakeQuestionnaire): Promise<{ success: boolean }> {
    return api.post<{ success: boolean }>(endpoints.intake.submit, intake);
  },
};
