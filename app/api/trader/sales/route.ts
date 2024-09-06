import { NextResponse } from 'next/server';
import { getQuotes } from '@/lib/actions/traders/sales';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  try {
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const data = await getQuotes(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching quote data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote data' },
      { status: 500 }
    );
  }
}
