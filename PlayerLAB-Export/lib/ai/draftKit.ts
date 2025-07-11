export async function getDraftSuggestions(roster: string[], leagueType: string): Promise<string[]> {
  const prompt = `Given this roster: ${roster.join(', ')}, suggest top 5 draft picks for a ${leagueType} league.`;

  const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const result = await response.json();
  const summary = result[0]?.summary_text ?? 'No suggestions.';
  return summary.split(/\d+\.\s/).filter(Boolean);
} 