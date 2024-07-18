import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const size = searchParams.get('size')
  const page = searchParams.get('page')

  try {
    const response = await axios.get(
      'https://frontapi.bbillage.com:3232/eventApi/event',
      {
        params: {
          size,
          page,
          visibility: true,
        },
      },
    )

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    )
  }
}
