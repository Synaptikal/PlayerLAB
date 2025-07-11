import { apiClient } from '../api-client';
import { API_CONFIG } from '../config';

export async function analyzeTrade(teamA: string[], teamB: string[]): Promise<{ score: string; analysis: string }> {
  const prompt = `Evaluate this fantasy trade: Team A gives ${teamA.join(', ')}, Team B gives ${teamB.join(', ')}. Who wins and why?`;

  try {
    const result = await apiClient.post(API_CONFIG.AI.HUGGINGFACE_URL, {
      inputs: prompt,
    });

    return {
      score: 'BETA', // Could be improved with more precise logic or GPT
      analysis: result[0]?.summary_text ?? 'No analysis.',
    };
  } catch (error) {
    console.error('Error analyzing trade:', error);
    return {
      score: 'ERROR',
      analysis: 'Failed to analyze trade.',
    };
  }
} 