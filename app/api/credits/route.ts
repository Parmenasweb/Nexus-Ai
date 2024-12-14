import { NextResponse } from 'next/server';
import { getUserCredits } from '@/lib/api/history';

export async function GET() {
  try {
    const credits = await getUserCredits();
    return NextResponse.json({ credits });
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}