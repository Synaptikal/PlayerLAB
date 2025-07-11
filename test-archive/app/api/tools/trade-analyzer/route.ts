import { NextRequest } from 'next/server';
import { analyzeTrade } from '@/lib/ai/tradeAnalyzer';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { teamA, teamB } = body;

  try {
    const result = await analyzeTrade(teamA, teamB);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new Response('Trade analysis failed', { status: 500 });
  }
} 