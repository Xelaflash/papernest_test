'use server';

import type { OfferWithProvider } from '@/types/energy';

interface GetOffersParams {
  country?: string;
}

export const getOffers = async ({
  country,
}: GetOffersParams): Promise<OfferWithProvider[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/offers?country=${country}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch offers: ${response.statusText}`);
  }

  return response.json();
};
