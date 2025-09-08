export const REQUIRED_ENV_VARS = [
  { key: 'FANTASY_PROS_API_KEY', description: 'FantasyPros integration' },
  { key: 'NEWS_API_KEY', description: 'NewsAPI integration' },
  { key: 'GNEWS_API_KEY', description: 'GNews integration' },
  { key: 'YOUTUBE_API_KEY', description: 'YouTube integration' },
  { key: 'HUGGINGFACE_API_KEY', description: 'AI features' }
];

export function validateEnvironment() {
  const missing = [];
  for (const { key, description } of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      missing.push(`${key} is required for ${description}`);
    }
  }
  return missing;
}
