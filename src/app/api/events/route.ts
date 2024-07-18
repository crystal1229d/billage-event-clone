import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = searchParams.get('size') || '5';
  const page = searchParams.get('page') || '0';
  const visibility = searchParams.get('visibility') || 'true';

  try {
    const response = await fetch(`https://frontapi.bbillage.com:3232/eventApi/event?size=${size}&page=${page}&visibility=${visibility}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const events = await response.json();
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
