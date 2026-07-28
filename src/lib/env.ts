type EnvKey = 'VITE_API_BASE_URL' | 'VITE_APP_NAME' | 'VITE_GEMINI_ENABLED';

interface EnvConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  GEMINI_ENABLED: boolean;
}

function getEnvVar(key: EnvKey): string {
  // Vite exposes env vars on import.meta.env, not process.env
  return (import.meta.env[key] as string | undefined) ?? '';
}

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL') || '/api',
  APP_NAME: getEnvVar('VITE_APP_NAME') || 'ELITE KINETIC',
  GEMINI_ENABLED: getEnvVar('VITE_GEMINI_ENABLED') !== 'false',
};
