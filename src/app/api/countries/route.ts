import { NextResponse } from 'next/server';

import providers from '@/data/energy_providers.json';

export async function GET(): Promise<NextResponse<string[]>> {
  const countries = [
    ...new Set(providers.energy_providers.map(provider => provider.country)),
  ];

  return NextResponse.json(countries);
}
