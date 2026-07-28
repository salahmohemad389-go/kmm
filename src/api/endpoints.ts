/**
 * API endpoint definitions.
 * Central place for all API paths — changes to routes only require edits here.
 */

import { env } from '../lib/env';

const BASE = env.API_BASE_URL;

export const endpoints = {
  health: `${BASE}/health`,

  auth: {
    login: `${BASE}/auth/login`,
    register: `${BASE}/auth/register`,
    refresh: `${BASE}/auth/refresh`,
    logout: `${BASE}/auth/logout`,
  },

  ai: {
    alternativeExercise: `${BASE}/ai-alternative-exercise`,
    quizRecommendation: `${BASE}/ai-quiz-recommendation`,
  },

  users: {
    me: `${BASE}/users/me`,
    update: `${BASE}/users/me`,
  },

  store: {
    categories: `${BASE}/store/categories`,
    category: (id: string) => `${BASE}/store/categories/${id}`,
    items: `${BASE}/store/items`,
    item: (id: string) => `${BASE}/store/items/${id}`,
  },

  foods: {
    list: `${BASE}/foods`,
    item: (id: string) => `${BASE}/foods/${id}`,
  },

  progress: {
    logs: `${BASE}/progress/logs`,
    log: (id: string) => `${BASE}/progress/logs/${id}`,
  },

  programs: {
    list: `${BASE}/programs`,
    item: (id: string) => `${BASE}/programs/${id}`,
  },

  subscriptions: {
    plans: `${BASE}/subscriptions/plans`,
    plan: (id: string) => `${BASE}/subscriptions/plans/${id}`,
  },

  stories: {
    list: `${BASE}/stories`,
    item: (id: string) => `${BASE}/stories/${id}`,
  },

  clients: {
    list: `${BASE}/clients`,
    item: (id: string) => `${BASE}/clients/${id}`,
  },

  intake: {
    submit: `${BASE}/intake`,
  },

  settings: {
    get: `${BASE}/settings`,
    update: `${BASE}/settings`,
  },

  points: {
    add: `${BASE}/points`,
  },
} as const;
