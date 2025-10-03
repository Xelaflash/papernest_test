'use server';

import type { OfferWithProvider } from '@/types/energy';

export const getOffers = async (): Promise<OfferWithProvider[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/offers`, {
    method: 'GET',
    cache: 'no-store', // always fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch offers: ${response.statusText}`);
  }

  return response.json();
};
