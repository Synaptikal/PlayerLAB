import { NextRequest } from 'next/server';
import { getDraftSuggestions } from '@/lib/ai/draftKit';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { roster, leagueType } = body;

  try {
    const suggestions = await getDraftSuggestions(roster, leagueType);
    return new Response(JSON.stringify({ suggestions }), { status: 200 });
  } catch (e) {
    return new Response('Draft analysis failed', { status: 500 });
  }
} 