'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

export function TradeAnalyzerPanel() {
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [result, setResult] = useState<{ score: string; analysis: string } | null>(null)

  async function analyzeTrade() {
    const res = await fetch('/api/tools/trade-analyzer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamA: teamA.split(','), teamB: teamB.split(',') }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <Card className='p-6 space-y-4'>
      <textarea value={teamA} onChange={e => setTeamA(e.target.value)} placeholder='Team A Players' />
      <textarea value={teamB} onChange={e => setTeamB(e.target.value)} placeholder='Team B Players' />
      <button onClick={analyzeTrade}>Analyze Trade</button>
      {result && (
        <div>
          <h4>Score: {result.score}</h4>
          <p>{result.analysis}</p>
        </div>
      )}
    </Card>
  )
} 