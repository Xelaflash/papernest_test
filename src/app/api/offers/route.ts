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
  const provider = searchParams.get('provider');
  const energyType = searchParams.get('energyType');
  const contractDuration = searchParams.get('contractDuration');
  const priceGuarantee = searchParams.get('priceGuarantee');
  const sortBy = searchParams.get('sortBy');

  // Average annual consumption: 400 kWh/year
  const ANNUAL_CONSUMPTION_KWH = 400;

  let result: OfferWithProvider[] = offers.energy_offers.map((offer: Offer) => {
    const providerData = providers.energy_providers.find(
      (p: Provider) => p.id === offer.provider_id
    );

    // subscription_cost is annual, consumption_pricing is per kWh
    const annual_consumption_cost =
      offer.consumption_pricing * ANNUAL_CONSUMPTION_KWH;
    const annual_price = offer.subscription_cost + annual_consumption_cost;
    const monthly_price = annual_price / 12;

    return {
      ...offer,
      provider: providerData,
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

  // Filter by provider
  if (provider && provider !== 'all') {
    result = result.filter(
      (offer: OfferWithProvider) =>
        offer.provider && offer.provider.display_name === provider
    );
  }

  // Filter by energy type
  if (energyType && energyType !== 'all') {
    result = result.filter(
      (offer: OfferWithProvider) => offer.metadata.energy_type === energyType
    );
  }

  // Filter by contract duration
  if (contractDuration && contractDuration !== 'all') {
    result = result.filter(
      (offer: OfferWithProvider) =>
        offer.metadata.contract_duration === contractDuration
    );
  }

  // Filter by price guarantee
  if (priceGuarantee && priceGuarantee !== 'all') {
    result = result.filter(
      (offer: OfferWithProvider) =>
        offer.metadata.price_guarantee === priceGuarantee
    );
  }

  // Sort by price
  if (sortBy === 'price-asc') {
    result = result.sort((a, b) => a.annual_price - b.annual_price);
  } else if (sortBy === 'price-desc') {
    result = result.sort((a, b) => b.annual_price - a.annual_price);
  }

  return NextResponse.json(result);
}
