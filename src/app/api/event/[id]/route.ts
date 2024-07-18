import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await axios.get(
      `https://frontapi.bbillage.com:3232/eventApi/event/${id}`,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event details' },
      { status: 500 },
    );
  }
}
