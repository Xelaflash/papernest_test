import { type NextRequest, NextResponse } from 'next/server';

import offers from '@/data/energy_offers.json';
import providers from '@/data/energy_providers.json';
import type { Offer, Provider } from '@/types/energy';

interface OfferWithProvider extends Offer {
  provider: Provider | undefined;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<OfferWithProvider[]>> {
  const { searchParams } = request.nextUrl;
  const country = searchParams.get('country');

  let result: OfferWithProvider[] = offers.energy_offers.map((offer: Offer) => {
    const provider = providers.energy_providers.find(
      (provider: Provider) => provider.id === offer.provider_id
    );

    return {
      ...offer,
      provider,
    };
  });

  // Filter by country
  if (country) {
    result = result.filter(
      (offer: OfferWithProvider) =>
        offer.provider &&
        offer.provider.country.toLowerCase() === country.toLowerCase()
    );
  }

  return NextResponse.json(result);
}
