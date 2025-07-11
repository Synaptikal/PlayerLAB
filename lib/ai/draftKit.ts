import { apiClient } from '../api-client';
import { API_CONFIG } from '../config';

export async function getDraftSuggestions(roster: string[], leagueType: string): Promise<string[]> {
  const prompt = `Given this roster: ${roster.join(', ')}, suggest top 5 draft picks for a ${leagueType} league.`;

  try {
    const result = await apiClient.post(API_CONFIG.AI.HUGGINGFACE_URL, {
      inputs: prompt,
    });
    const summary = result[0]?.summary_text ?? 'No suggestions.';
    return summary.split(/\d+\.\s/).filter(Boolean);
  } catch (error) {
    console.error('Error fetching draft suggestions:', error);
    return ['Error fetching draft suggestions.'];
  }
} 