import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type { WorkoutProgram } from '../types';
import type { CreateWorkoutProgramRequest } from '../api/dto';

export const programService = {
  async getAll(): Promise<WorkoutProgram[]> {
    return api.get<WorkoutProgram[]>(endpoints.programs.list, { cacheTtl: 60_000 });
  },

  async create(data: CreateWorkoutProgramRequest): Promise<WorkoutProgram> {
    return api.post<WorkoutProgram>(endpoints.programs.list, data);
  },

  async getById(id: string): Promise<WorkoutProgram> {
    return api.get<WorkoutProgram>(endpoints.programs.item(id));
  },
};
