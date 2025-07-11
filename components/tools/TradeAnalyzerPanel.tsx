'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { analyzeTrade } from '@/lib/ai/tradeAnalyzer';

export function TradeAnalyzerPanel() {
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [result, setResult] = useState<{ score: string; analysis: string } | null>(null)

  async function handleAnalyzeTrade() {
    try {
      const result = await analyzeTrade(teamA.split(','), teamB.split(','));
      setResult(result);
    } catch (error) {
      console.error('Error analyzing trade:', error);
      setResult({ score: 'ERROR', analysis: 'Failed to analyze trade.' });
    }
  }

  return (
    <Card className='p-6 space-y-4'>
      <textarea value={teamA} onChange={e => setTeamA(e.target.value)} placeholder='Team A Players' />
      <textarea value={teamB} onChange={e => setTeamB(e.target.value)} placeholder='Team B Players' />
      <button onClick={handleAnalyzeTrade}>Analyze Trade</button>
      {result && (
        <div>
          <h4>Score: {result.score}</h4>
          <p>{result.analysis}</p>
        </div>
      )}
    </Card>
  )
} 