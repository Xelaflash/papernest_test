import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { filterOffers, getAllOffers } from '@/lib/offers';

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const result = filterOffers(getAllOffers(), params);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}` },
      { status: 500 }
    );
  }
}
