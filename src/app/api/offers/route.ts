import { NextRequest, NextResponse } from 'next/server';

import { filterOffers, getAllOffers } from '@/lib/offers';

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const result = filterOffers(getAllOffers(), params);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in /api/offers', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
