import { type NextRequest, NextResponse } from 'next/server';

import offers from '@/data/energy_offers.json';
import providers from '@/data/energy_providers.json';
import type { Offer, Provider } from '@/types/energy';

interface OfferWithProvider extends Offer {
  provider: Provider | undefined;
  annual_price: number;
  monthly_price: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<OfferWithProvider[]>> {
  const { searchParams } = request.nextUrl;
  const country = searchParams.get('country');

  // Average annual consumption: 400 kWh/year
  const ANNUAL_CONSUMPTION_KWH = 400;

  let result: OfferWithProvider[] = offers.energy_offers.map((offer: Offer) => {
    const provider = providers.energy_providers.find(
      (provider: Provider) => provider.id === offer.provider_id
    );

    // subscription_cost is annual, consumption_pricing is per kWh
    const annual_consumption_cost =
      offer.consumption_pricing * ANNUAL_CONSUMPTION_KWH;
    const annual_price = offer.subscription_cost + annual_consumption_cost;
    const monthly_price = annual_price / 12;

    return {
      ...offer,
      provider,
      annual_price,
      monthly_price,
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
