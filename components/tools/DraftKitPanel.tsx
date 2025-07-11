'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { getDraftSuggestions } from '@/lib/ai/draftKit';

export function DraftKitPanel() {
  const [roster, setRoster] = useState('')
  const [league, setLeague] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  async function handleGetDraftSuggestions() {
    try {
      const suggestions = await getDraftSuggestions(roster.split(','), league);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching draft suggestions:', error);
      setSuggestions(['Error fetching draft suggestions.']);
    }
  }

  return (
    <Card className='p-6 space-y-4'>
      <textarea value={roster} onChange={e => setRoster(e.target.value)} placeholder='Enter current roster' />
      <select value={league} onChange={e => setLeague(e.target.value)}>
        <option value='Half-PPR'>Half-PPR</option>
        <option value='Standard'>Standard</option>
        <option value='Full-PPR'>Full-PPR</option>
      </select>
      <button onClick={handleGetDraftSuggestions}>Analyze</button>
      <ul>{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </Card>
  )
} 