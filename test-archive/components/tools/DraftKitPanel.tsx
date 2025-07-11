'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

export function DraftKitPanel() {
  const [roster, setRoster] = useState('')
  const [league, setLeague] = useState('Half-PPR')
  const [suggestions, setSuggestions] = useState<string[]>([])

  async function analyze() {
    const res = await fetch('/api/tools/draft-analyzer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roster: roster.split(','), leagueType: league }),
    })
    const data = await res.json()
    setSuggestions(data.suggestions)
  }

  return (
    <Card className='p-6 space-y-4'>
      <textarea value={roster} onChange={e => setRoster(e.target.value)} placeholder='Enter current roster' />
      <select value={league} onChange={e => setLeague(e.target.value)}>
        <option value='Half-PPR'>Half-PPR</option>
        <option value='Standard'>Standard</option>
        <option value='Full-PPR'>Full-PPR</option>
      </select>
      <button onClick={analyze}>Analyze</button>
      <ul>{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </Card>
  )
} 