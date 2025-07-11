export async function analyzeTrade(teamA: string[], teamB: string[]): Promise<{ score: string; analysis: string }> {
  const prompt = `Evaluate this fantasy trade: Team A gives ${teamA.join(', ')}, Team B gives ${teamB.join(', ')}. Who wins and why?`;

  const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const result = await response.json();
  return {
    score: 'BETA', // Could be improved with more precise logic or GPT
    analysis: result[0]?.summary_text ?? 'No analysis.',
  };
} 